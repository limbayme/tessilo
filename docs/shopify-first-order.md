# Tessilo: Cloudflare + Shopify, first-order rollout

Updated 2026-09-06. Store: `tessilo-erkcvxa8.myshopify.com`.

## Architecture

Keep React/Vinext and the existing Cloudflare Worker build. Shopify hosts commerce,
not this frontend. No Liquid theme upload, Hydrogen migration or supplier API is
needed. Keep tessilo.com and its DNS unchanged until a separately approved cutover.

Shopify is the merchandising and order system. Staff manually confirm supply,
shipping, procurement and tracking. First orders use a reviewed Shopify draft
order and an invoice checkout link, sent manually by staff after confirming costs.
Do not mark an order paid until payment has actually been received.

## Access and configuration

The installed Shopify CLI was checked against the target store on 2026-09-06.
`shopify theme list --store tessilo-erkcvxa8.myshopify.com --json` returned an access
denied error for the current identity. This is a theme-access diagnostic, not proof
of Storefront API access. An authorized collaborator must complete authentication
and have access to the Headless channel. Do not log out another account or replace
the customer's theme to work around permissions.

Use an existing Tessilo storefront in the official Headless channel, or create one
if absent. Obtain its private Storefront token and enable product, inventory and
cart permissions required by the queries. Publish reviewed products to Headless.
Keep tokens in local `.dev.vars` and the preview Worker secret configuration, never
in the browser, Git, terminal output or chat. `.env.example` documents the keys;
Cloudflare local bindings use `.dev.vars`. No real token is currently configured.

- `SHOPIFY_STORE_DOMAIN`: the store above.
- `SHOPIFY_STOREFRONT_PRIVATE_TOKEN`: Headless private token, not CLI session token.
- `SHOPIFY_STOREFRONT_API_VERSION`: `2026-07`.
- `SHOPIFY_CHECKOUT_VARIANT_IDS`: empty by default. Only explicitly approved variant
  GIDs can create a storefront cart. Approve after checking actual selling price,
  available stock, shipping regions/rates, tax treatment and return policy.
- `RESEND_API_KEY`, `INQUIRY_FROM`: required for real inquiry email delivery.

No automatic supplier inventory is promised. Headless availability is the stock
staff maintains in Shopify and may lag the supplier. Recheck before invoicing.

## Catalog migration boundary

`GET /api/shopify/catalog` returns 12 products per page, flattened to SKU variants,
with `pageInfo`; pass `after` for the next product page. Optional `skus` selects
featured SKUs. The backend no longer discards everything except six hardcoded SKUs.
The current home/PDP editorial content and RFQ validation still use six local
records. They are not yet a complete arbitrary-SKU storefront.

Next expansion: a paginated collection/search view, handle-based Shopify detail
routes and dynamic inquiry validation. Migrate dimensions/materials to metafields;
do not fabricate those fields from supplier names. Products with over 250 variants
are reported via `truncatedVariantProducts` and require dedicated variant pagination
before displaying their entire selection. Concept 3D is not a measured digital twin.

## Acceptance before first order

1. Real Storefront query returns the intended shop's published products, prices,
   currency, SKU and availability; no token appears in responses or client bundles.
2. Unapproved variants remain inquiry-only, including direct cart API requests.
3. A real inquiry reaches the sales inbox, with SKU, quantity and destination.
4. Staff confirms supply, creates/reviews a draft order and its shipping amount.
5. With business approval, test the payment flow using the shop's supported test
   setup. Do not change live payment settings or send invoices without approval.
6. A real customer pays the reviewed invoice, staff confirms the Shopify order,
   procures the items, records tracking and handles delivery/support.

Current verification is local automated tests/build only. Live catalog, checkout,
inquiry delivery and deployment remain unverified pending credentials/permissions.
The existing Sites project previously returned NOT_FOUND; do not create a replacement
project or change the domain to bypass it. Independent Cloudflare deployment remains
technically possible once its account and preview target are confirmed.

References:
- https://shopify.dev/docs/storefronts/headless/bring-your-own-stack
- https://shopify.dev/docs/storefronts/headless/building-with-the-storefront-api/manage-headless-channels
- https://help.shopify.com/en/manual/fulfillment/managing-orders/create-orders
