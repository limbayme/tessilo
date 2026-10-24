# Tessilo

> 最新素材与定价：见 [`product-assets/`](product-assets)（按 SKU 存放商品图）与 [`PRICING.md`](PRICING.md)（按 SKU 的价格表）。更新日期 **2026-10-24**。

Tessilo is a responsive B2B furniture independent site built from the Figma design system. It targets Cloudflare Workers deployment through Vinext and Wrangler.

## What is included

- Responsive landing page based on the Figma desktop, tablet, and mobile layouts
- Mobile navigation overlay with slide-in motion and animated hamburger state
- Product listing with interactive category/product-type filters; B2B prices are hidden from the public UI
- Product detail section with gallery thumbnails, finish selector, product tabs, and related products
- B2B inquiry flow with product selection, quantity, project notes, server-side email submission to `leo@digitauro.com`, and direct WhatsApp quote links
- Excel-backed product catalog update: 9 Tessilo products, negotiable notes, and social media contact channels
- EN / 中文 / DE / FR language switching for core site content
- Special Negotiatable badge styling for products marked negotiable in the Excel source
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
product-assets/         Product photo assets by SKU (source images, 2026-10-24 update)
contents/               Source documents: pricing Excel and product catalog
PRICING.md              Price, channel and promotion table synced from the pricing Excel
```

## Notes

Figma MCP asset URLs expire, so product and brand imagery used by the site is stored locally in `public/assets`.

The current product and social media content was updated from `Tessilo产品+社媒完整表.xlsx`. Public pricing is intentionally hidden for B2B inquiry-based quoting. If the Excel changes later, refresh the exported images in `public/assets/excel/` and update the product/social arrays in `app/TessiloClient.tsx`.

Inquiry email delivery uses the Worker `/api/inquiry` endpoint. Configure these Cloudflare environment variables before production deployment:

```text
RESEND_API_KEY=<your Resend API key>
INQUIRY_FROM=Tessilo <quotes@your-verified-domain.com>
```

## Product assets & pricing（最新更新）

**更新日期：2026-10-24**

| 项目 | 位置 | 说明 |
|---|---|---|
| 最新商品素材 | [`product-assets/`](product-assets) | 按 SKU 分目录，本次 10 个 SKU、共 67 张图片（含主图、细节图、尺寸图） |
| 定价源文件 | [`contents/Tessilo_沙发定价表_实际成本版.xlsx`](contents/Tessilo_沙发定价表_实际成本版.xlsx) | 实际成本版，8 个工作表、84 个 SKU |
| 定价文档 | [`PRICING.md`](PRICING.md) | 按 SKU 同步价格、渠道、促销策略与备注 |
| 素材来源 | 本地 `商品素材.zip`（156 MB，已解压为单图入库；压缩包超过 GitHub 单文件 100 MB 限制，未整包上传） | 原始文件夹名含中文描述（如 `W3975P437949豆袋驼`），入库后统一改为纯 SKU 目录名 |

### 本次素材清单（10 个 SKU / 67 张图片）

| SKU | 图片数 | 面料+颜色（Excel 原值） | MSRP($) | 素材目录 |
|---|---|---|---|---|
| `W3975P437949` | 7 | 灯芯绒驼色 camel | 198.99 | [`product-assets/W3975P437949`](product-assets/W3975P437949) |
| `W3975P440925` | 6 | 灯芯绒粉色 Pink | 191.99 | [`product-assets/W3975P440925`](product-assets/W3975P440925) |
| `W3975P501411` | 8 | 棉麻黑色L | 591.99 | [`product-assets/W3975P501411`](product-assets/W3975P501411) |
| `W3975P510434` | 7 | 长毛绒灰色（目录名标注"黑"，冲突待确认） | 181.99 | [`product-assets/W3975P510434`](product-assets/W3975P510434) |
| `W3975P519736` | 7 | 灯芯绒咖啡色L | 583.99 | [`product-assets/W3975P519736`](product-assets/W3975P519736) |
| `W3975P530974` | 6 | 灯芯绒橙色 orange | 340.99 | [`product-assets/W3975P530974`](product-assets/W3975P530974) |
| `W3975S00042` | 5 | 灯芯绒米白色 WHITE | 924.99 | [`product-assets/W3975S00042`](product-assets/W3975S00042) |
| `W3975S00121` | 6 | 细灯芯绒棕色 | 584.99 | [`product-assets/W3975S00121`](product-assets/W3975S00121) |
| `W3975S00183` | 7 | 灯芯绒驼色 CAMEL | 1330.99 | [`product-assets/W3975S00183`](product-assets/W3975S00183) |
| `W5885P517229` | 8 | 长毛绒白色 WHITE 带杯托 | 424.99 | [`product-assets/W5885P517229`](product-assets/W5885P517229) |

### 本次新增 / 替换内容

- **新增**：`product-assets/`（10 个 SKU 目录、67 张商品图，按 SKU 命名）。
- **新增**：`contents/Tessilo_沙发定价表_实际成本版.xlsx`（定价源文件，约 90 MB，作为 `PRICING.md` 的唯一来源）。
- **新增**：`PRICING.md`（首次建立，按 SKU 同步价格与成本，并列出全部待确认项）。
- **扩充（替换说明）**：`W3975S00042` 此前仅有 `public/assets/launch/W3975S00042.jpg` 一张主图，本次补充 5 张完整素材；原有图片**保留未删除**。
- **未改动**：`public/assets/`、`public/assets/launch/`（含 `W3975P437947`、`W3975P484393`、`W3975P502469`、`W3975P519663`、`W5885P548263`）、`public/assets/excel/` 下既有图片均保持原样，未覆盖他人素材。
- **价格状态**：本次为**首次导入价格**（此前仓库无 `PRICING.md`），价格按 Excel 原值全量同步，未沿用或推算任何旧值。

### 待确认（详见 [`PRICING.md`](PRICING.md)）

1. 渠道与促销策略：Excel 无对应字段，全部 SKU 标记「待确认」，未推算。
2. `W3975P510434` 素材目录名标注「脚踏黑」，Excel 记录为「长毛绒灰色」，素材与 SKU 是否错配待确认。
3. 库存空白与重复库存列（`小L型沙发97一包裹` D/F 列、`新款-双扶手贵妃` E/F 列）、`新款-双扶手贵妃` 无材质列、多 SKU 合并行与「小抱枕」附加标注，均待确认。
4. 素材覆盖 10 / 84 个 SKU，其余 74 个 SKU 暂无素材。

### 后续维护要求

1. 价格以 Excel 为唯一来源；调价先改 Excel，再同步 `PRICING.md` 并更新「价格版本日期」与「文档核对日期」。若某次仅更新素材，则保留现有价格并注明「价格未变」，只更新素材链接与核对日期。
2. 缺失、冲突或空白数据一律保留「待确认」标记，由业务方在 Excel 中确认后回填，禁止自行推算或覆盖。
3. 新增素材按 `product-assets/<SKU>/` 存放（目录名用纯 SKU），同步更新本文档的 SKU 与图片数量，以及 `PRICING.md` 的素材链接。
4. 每次更新后核验 SKU 数量、价格数值、素材链接三项一致再提交。
5. 站点前台保持 B2B 询价模式，不公开 MSRP 与成本。
