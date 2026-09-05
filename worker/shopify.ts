export interface ShopifyEnv {
  SHOPIFY_STORE_DOMAIN?: string;
  SHOPIFY_STOREFRONT_PRIVATE_TOKEN?: string;
  SHOPIFY_STOREFRONT_API_VERSION?: string;
}

const launchSkus = new Set([
  "W3975S00042",
  "W5885P548263",
  "W3975P502469",
  "W3975P437947",
  "W3975P484393",
  "W3975P519663",
]);

const headers = { "Content-Type": "application/json; charset=utf-8" };

function endpoint(env: ShopifyEnv) {
  const domain = env.SHOPIFY_STORE_DOMAIN?.trim().replace(/^https?:\/\//, "").replace(/\/$/, "");
  if (!domain || !env.SHOPIFY_STOREFRONT_PRIVATE_TOKEN) return null;
  const version = env.SHOPIFY_STOREFRONT_API_VERSION || "2026-07";
  return `https://${domain}/api/${version}/graphql.json`;
}

async function storefront<T>(request: Request, env: ShopifyEnv, query: string, variables: Record<string, unknown>) {
  const url = endpoint(env);
  if (!url) throw new Error("shopify_not_configured");
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Shopify-Storefront-Private-Token": env.SHOPIFY_STOREFRONT_PRIVATE_TOKEN!,
      "Shopify-Storefront-Buyer-IP": request.headers.get("CF-Connecting-IP") || request.headers.get("X-Forwarded-For")?.split(",")[0]?.trim() || "127.0.0.1",
    },
    body: JSON.stringify({ query, variables }),
    signal: AbortSignal.timeout(15000),
  });
  if (!response.ok) throw new Error(`shopify_${response.status}`);
  const payload = (await response.json()) as { data?: T; errors?: Array<{ message: string }> };
  if (!payload.data || payload.errors?.length) throw new Error(payload.errors?.[0]?.message || "shopify_error");
  return payload.data;
}

const catalogQuery = `#graphql
  query TessiloLaunchCatalog($first: Int!) {
    products(first: $first, sortKey: UPDATED_AT, reverse: true) {
      nodes {
        id handle title description availableForSale
        featuredImage { url altText width height }
        media(first: 20) {
          nodes {
            ... on Model3d {
              id
              previewImage { url altText width height }
              sources { url mimeType format filesize }
            }
          }
        }
        variants(first: 30) {
          nodes { id title sku availableForSale quantityAvailable price { amount currencyCode } }
        }
      }
    }
  }
`;

type CatalogData = {
  products: { nodes: Array<{
    id: string; handle: string; title: string; description: string; availableForSale: boolean;
    featuredImage?: { url: string; altText?: string; width?: number; height?: number };
    media: { nodes: Array<{ id?: string; previewImage?: { url: string; altText?: string; width?: number; height?: number }; sources?: Array<{ url: string; mimeType: string; format: string; filesize: number }> }> };
    variants: { nodes: Array<{ id: string; title: string; sku?: string; availableForSale: boolean; quantityAvailable?: number; price: { amount: string; currencyCode: string } }> };
  }> };
};

export async function handleShopifyCatalog(request: Request, env: ShopifyEnv): Promise<Response> {
  if (request.method !== "GET") return Response.json({ error: "method_not_allowed" }, { status: 405, headers: { Allow: "GET" } });
  if (!endpoint(env)) return Response.json({ configured: false, products: [] }, { headers });
  try {
    const data = await storefront<CatalogData>(request, env, catalogQuery, { first: 50 });
    const products = data.products.nodes.flatMap((product) =>
      product.variants.nodes
        .filter((variant) => variant.sku && launchSkus.has(variant.sku))
        .map((variant) => ({
          id: product.id,
          handle: product.handle,
          title: product.title,
          description: product.description,
          image: product.featuredImage,
          model: product.media.nodes.find((item) => item.sources?.length) || null,
          availableForSale: product.availableForSale && variant.availableForSale,
          quantityAvailable: variant.quantityAvailable ?? null,
          variantId: variant.id,
          variantTitle: variant.title,
          sku: variant.sku,
          price: variant.price,
        })),
    );
    return Response.json({ configured: true, products }, {
      headers: { ...headers, "Cache-Control": "public, max-age=60, s-maxage=300, stale-while-revalidate=600" },
    });
  } catch {
    return Response.json({ configured: true, products: [], error: "catalog_unavailable" }, { status: 502, headers });
  }
}

const cartMutation = `#graphql
  mutation TessiloCartCreate($input: CartInput!) {
    cartCreate(input: $input) {
      cart { id checkoutUrl totalQuantity cost { subtotalAmount { amount currencyCode } totalAmount { amount currencyCode } } }
      userErrors { field message code }
      warnings { message code }
    }
  }
`;

type CartData = { cartCreate: { cart?: { id: string; checkoutUrl: string; totalQuantity: number; cost: { subtotalAmount: { amount: string; currencyCode: string }; totalAmount: { amount: string; currencyCode: string } } }; userErrors: Array<{ field?: string[]; message: string; code?: string }>; warnings: Array<{ message: string; code?: string }> } };

export async function handleShopifyCart(request: Request, env: ShopifyEnv): Promise<Response> {
  if (request.method !== "POST") return Response.json({ error: "method_not_allowed" }, { status: 405, headers: { Allow: "POST" } });
  if (!endpoint(env)) return Response.json({ error: "shopify_not_configured" }, { status: 503, headers });
  if (request.headers.get("origin") && request.headers.get("origin") !== new URL(request.url).origin) return Response.json({ error: "forbidden" }, { status: 403, headers });
  try {
    if (Number(request.headers.get("content-length")) > 20000) return Response.json({ error: "invalid_cart" }, { status: 413, headers });
    const body = (await request.json()) as { lines?: Array<{ merchandiseId?: string; quantity?: number }> };
    if (!Array.isArray(body.lines) || body.lines.length < 1 || body.lines.length > 50) throw new Error("invalid");
    const lines = body.lines.map((line) => {
      if (typeof line.merchandiseId !== "string" || !line.merchandiseId.startsWith("gid://shopify/ProductVariant/") || !Number.isInteger(line.quantity) || line.quantity! < 1 || line.quantity! > 100) throw new Error("invalid");
      return { merchandiseId: line.merchandiseId, quantity: line.quantity };
    });
    const data = await storefront<CartData>(request, env, cartMutation, { input: { lines, attributes: [{ key: "source", value: "tessilo-headless" }] } });
    const result = data.cartCreate;
    if (!result.cart || result.userErrors.length) return Response.json({ error: "cart_rejected", details: result.userErrors }, { status: 422, headers });
    return Response.json({ ok: true, cart: result.cart, warnings: result.warnings }, { headers: { ...headers, "Cache-Control": "no-store" } });
  } catch (error) {
    return Response.json({ error: error instanceof Error && error.message === "invalid" ? "invalid_cart" : "cart_unavailable" }, { status: error instanceof Error && error.message === "invalid" ? 400 : 502, headers });
  }
}
