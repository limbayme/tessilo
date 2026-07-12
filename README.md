# Tessilo

Tessilo is a responsive B2B furniture independent site built from the Figma design system. It targets Cloudflare Workers deployment through Vinext and Wrangler.

## What is included

- Responsive landing page based on the Figma desktop, tablet, and mobile layouts
- Mobile navigation overlay with slide-in motion and animated hamburger state
- Product listing with interactive category/product-type filters and euro price range control
- Product detail section with gallery thumbnails, finish selector, product tabs, and related products
- Excel-backed product catalog update: 9 Tessilo products with euro prices, logistics fees, notes, and social media contact channels
- AI-rendered coffee table scene images based on the Excel Image2 product reference
- FAQ accordion and quote form interaction
- Figma micro-interactions translated into CSS:
  - primary CTA hover scale, lifted shadow, and pressed inset state
  - outlined button hover fill and active darkened state
  - navigation underline slide-in
  - product card image zoom, top gold bar, and -8px lift
  - mobile menu X-axis slide-in

## Tech stack

- Next/Vinext
- React 19
- TypeScript
- Plain CSS
- Cloudflare Workers / Wrangler

## Local development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

The build outputs Cloudflare Worker-compatible files under `dist/`.

## Cloudflare deployment

The repository includes `wrangler.jsonc`, so Cloudflare can deploy it with:

```bash
npm run build
npx wrangler deploy
```

When creating a Cloudflare Worker from GitHub, use:

```text
Project name: tessilo
Build command: npm run build
Deploy command: npx wrangler deploy
```

Recommended environment:

```text
NODE_VERSION=22
```

## Important files

```text
app/TessiloClient.tsx   Main interactive site implementation
app/globals.css         Design tokens, layout, responsive styles, interactions
app/layout.tsx          Metadata and document shell
wrangler.jsonc          Cloudflare Worker deploy config
public/assets/          Localized Figma imagery
public/assets/excel/    Excel product images, QR/social assets, and generated scene renders
```

## Notes

Figma MCP asset URLs expire, so product and brand imagery used by the site is stored locally in `public/assets`.

The current product, price, logistics, and social media content was updated from `Tessilo产品+社媒完整表.xlsx`. If the Excel changes later, refresh the exported images in `public/assets/excel/` and update the product/social arrays in `app/TessiloClient.tsx`.
