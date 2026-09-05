# Tessilo Headless Shopify storefront — September 2026

## Delivered experience

- Editorial comfort-led art direction with deep navy, warm ivory, mist blue and restrained clay accents; one transparent Tessilo wordmark system replaces the conflicting footer artwork.
- Hero primary CTA: build a bulk purchase list. Secondary CTA: explore the collection. Persistent purchase-list count and dealer/agent cooperation navigation.
- Six actual product detail pages at `/products/<SKU>`, each with its own title and description. Product cards, room scenes, bulk table and related products link to these pages. Unknown SKUs return 404.
- Details have original catalog photography, photo/360° toggle, corresponding Three.js concept geometry, drag/touch orbit, wheel/pinch zoom, visible rotate/zoom/reset controls and six-shape navigation. Concept models are labeled as non-scan references. The default photo view avoids loading Three.js until requested. Reduced-motion preference disables damping; unavailable WebGL falls back to catalog photography.
- Filterable six-product collection, linked room scenes, six-row bulk quantity builder, SKU/category/style/piece summaries, editable quantities, removal and downloadable text purchase list.
- Selection stores only SKU and quantity locally and restores on each page; contact data is not persisted. Cross-tab storage updates are synchronized. Device storage failure is reported.
- Trade form includes buyer identity, company, country/market, email, preferred channel and optional notes. Personal purchase inquiries remain supported. WhatsApp opens a complete editable draft with all selected SKUs, quantities and entered contact/project fields.
- English, Chinese, German and French UI and product copy. Existing social links, `leo@digitauro.com` and WhatsApp `18296874119` retained.
- Dual conversion paths: Shopify-backed individual purchase with secure checkout when a SKU is published, plus the existing high-volume trade quote builder. No invented price, stock, MOQ, delivery, certification or agency benefits.
- The homepage includes a six-object Three.js interaction stage. Current procedural forms are accurately labeled as 3D previews; SKU-accurate GLB/PBR files can replace them without changing the commerce architecture.

## Shopify Headless connection

- `GET /api/shopify/catalog` is a same-origin Worker BFF endpoint. It reads published Shopify products, merges variants to the six launch objects by exact SKU, and exposes only the fields needed by the UI.
- `POST /api/shopify/cart` validates a single retail cart line, calls Storefront `cartCreate`, and returns Shopify's checkout URL. The browser never receives the Storefront private token.
- Homepage cards and all six product detail pages prefer Shopify imagery, description, price, currency and availability when present; the editorial catalog remains a resilient fallback when Shopify is unconfigured or unavailable.
- Retail checkout quantities are limited to 100 per action. The separate B2B trade list retains quantities up to 10,000 and never masquerades as a paid order.
- Storefront API is pinned to stable version `2026-07`. Worker requests use `Shopify-Storefront-Private-Token` and forward `Shopify-Storefront-Buyer-IP`.

Required production environment:

```dotenv
SHOPIFY_STORE_DOMAIN=<canonical-store>.myshopify.com
SHOPIFY_STOREFRONT_API_VERSION=2026-07
SHOPIFY_STOREFRONT_PRIVATE_TOKEN=<server-secret>
```

The canonical store domain and private token must be copied from Shopify's Headless sales channel. Never prefix these variables with `NEXT_PUBLIC_`, `VITE_`, or expose them to client code.

## Exact launch routes

| Name | Route |
| --- | --- |
| Form / 100 | `/products/W3975S00042` |
| Moss | `/products/W5885P548263` |
| Ripple | `/products/W3975P502469` |
| Drift | `/products/W3975P437947` |
| Arc / 97 | `/products/W3975P484393` |
| Puff | `/products/W3975P519663` |

`?lang=en|zh|de|fr` preserves the selected language; `&view=3d` opens the interactive view.

## Assets and accuracy

- Original `public/assets/logo.png` remains in the repository as source history but is no longer rendered in the storefront.
- `public/assets/tessilo-wordmark.svg` and `public/assets/tessilo-wordmark-light.svg` are transparent-background navigation/footer marks in the refreshed palette.
- Only the six supplied PDF images in `public/assets/launch/` appear as catalog products. Older asset files were not deleted.
- Moss photograph retains the third-party MONZIA label and is marked as supplier catalog reference / Tessilo photography pending.
- Arc height conflict (60 cm / 31 in), Puff depth conflict (74 cm / 30.4 in), and Form ottoman inclusion are visible as items to confirm.
- The procedural Three.js models communicate different forms, not exact construction, dimensions or upholstery. Manufacturer 3D models and branded product photography remain future asset replacements.

## Validation performed

- `npx tsc --noEmit`: passed.
- `npm run build`: passed. The build emits a Three.js client chunk size advisory; code splitting is the next performance pass.
- HTTP checks: homepage and all six product routes 200, their six JPGs 200; unknown product route 404. Each product response has the matching SKU/name metadata.
- `node --test tests/inquiry.test.mjs`: 7 tests passed. Covers full six-SKU email payload without truncation, invalid and duplicate SKUs, quantity bounds, malformed/missing fields, legacy single-product compatibility, missing configuration, provider/network failure and origin/method validation. Every send was mocked; no sales email was sent.
- Local `/api/inquiry` with valid data returned 503 `inquiry_unavailable`, correctly reflecting absent email configuration. No provider errors or secrets are exposed to the client.
- Shared selection restoration, quantity merging/clamping, complete WhatsApp/download draft, responsive breakpoints, Three.js input/zoom/reset/fallback and cleanup paths were reviewed in code. Browser clicking, screenshots, DOM/visual QA and actual WebGL rendering were not performed (not requested). Do not describe these interactions as browser-tested.

## External blockers / configuration

- Existing Sites project lookup still returns `Sites project not found` for the unchanged `.openai/hosting.json` ID. No replacement Site was created and `tessilo.com` was not touched. Restore access/association before publishing a new private preview.
- Headless channel installation/storefront creation and private token creation are Shopify admin actions that require explicit approval at the moment they are performed. Until the token is installed in the hosted runtime, the storefront intentionally stays in catalog + trade inquiry fallback mode.
- Configure `RESEND_API_KEY` and a verified sender in `INQUIRY_FROM` in the hosted runtime before live email can work. `.env.example` lists names without secrets.
- Confirm supplier specification discrepancies and commercial terms before an order is accepted.
- Existing localhost:3000 preview was reused and left running; this independently delegated owner did not open a new browser tab.
