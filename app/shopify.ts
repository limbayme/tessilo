import { useEffect, useMemo, useState } from "react";

export type ShopifyLaunchProduct = {
  id: string;
  handle: string;
  title: string;
  description: string;
  sku: string;
  variantId: string;
  variantTitle: string;
  availableForSale: boolean;
  quantityAvailable: number | null;
  image?: { url: string; altText?: string; width?: number; height?: number };
  model?: { id?: string; previewImage?: { url: string; altText?: string; width?: number; height?: number }; sources?: Array<{ url: string; mimeType: string; format: string; filesize: number }> } | null;
  price: { amount: string; currencyCode: string };
};

type CatalogPayload = { configured: boolean; products: ShopifyLaunchProduct[] };

export function useShopifyCatalog() {
  const [payload, setPayload] = useState<CatalogPayload>({ configured: false, products: [] });
  const [status, setStatus] = useState<"loading" | "ready" | "unconfigured" | "error">("loading");
  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/shopify/catalog", { signal: controller.signal })
      .then((response) => response.ok ? response.json() : Promise.reject())
      .then((data: CatalogPayload) => { setPayload(data); setStatus(data.configured ? "ready" : "unconfigured"); })
      .catch(() => setStatus("error"));
    return () => controller.abort();
  }, []);
  const bySku = useMemo(() => new Map(payload.products.map((product) => [product.sku, product])), [payload.products]);
  return { ...payload, bySku, status, loading: status === "loading" };
}

export function formatMoney(price?: { amount: string; currencyCode: string }, locale = "en-US") {
  if (!price) return "";
  try {
    return new Intl.NumberFormat(locale, { style: "currency", currency: price.currencyCode, maximumFractionDigits: 2 }).format(Number(price.amount));
  } catch {
    return `${price.currencyCode} ${price.amount}`;
  }
}

export async function startShopifyCheckout(variantId: string, quantity: number) {
  const response = await fetch("/api/shopify/cart", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ lines: [{ merchandiseId: variantId, quantity }] }),
  });
  const result = await response.json() as { cart?: { checkoutUrl?: string }; error?: string };
  if (!response.ok || !result.cart?.checkoutUrl) throw new Error(result.error || "checkout_unavailable");
  window.location.assign(result.cart.checkoutUrl);
}
