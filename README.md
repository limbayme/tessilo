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
PRICING.md              Retail price, cost and notes per SKU (channel/promotion not included)
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
| 定价表（在线可看） | [`contents/Tessilo_沙发定价表_精简版_20261024.xlsx`](contents/Tessilo_沙发定价表_精简版_20261024.xlsx) | 18 KB，8 个工作表、84 个 SKU，与原始表数值一致，仅去除内嵌图片 |
| 定价表（CSV） | [`contents/PRICING_20261024.csv`](contents/PRICING_20261024.csv) | 17 KB，84 个 SKU 扁平化，可直接用 Excel／表格工具打开 |
| 定价文档 | [`PRICING.md`](PRICING.md) | 按 SKU 同步零售价、成本、自提与备注 |
| 素材来源 | 本地 `商品素材.zip`（156 MB，已解压为单图入库；压缩包超过 GitHub 单文件 100 MB 限制，未整包上传） | 原始文件夹名含中文描述（如 `W3975P437949豆袋驼`），入库后统一改为纯 SKU 目录名 |

> 定价表原始文件 `Tessilo_沙发定价表_实际成本版.xlsx` 为 90 MB，GitHub 无法在线预览，因此**未入库**，原始文件保留在本地 `~/Desktop/压缩沙发/`。仓库内的精简版 xlsx、CSV 与 `PRICING.md` 三处数值完全一致（84 个 SKU）。

### 本次素材清单（10 个 SKU / 67 张图片）

> 颜色口径：同款产品颜色可互换，**颜色以素材目录为准**。下表「颜色」列取自 `product-assets/<SKU>` 目录名；目录未标颜色的 SKU 沿用 Excel 颜色值。

| SKU | 图片数 | 颜色（以素材目录为准） | Excel 颜色（参考） | MSRP($) | 素材目录 |
|---|---|---|---|---|---|
| `W3975P437949` | 7 | 驼色 | 灯芯绒驼色 camel | 198.99 | [`product-assets/W3975P437949`](product-assets/W3975P437949) |
| `W3975P440925` | 6 | 粉色 | 灯芯绒粉色 Pink | 191.99 | [`product-assets/W3975P440925`](product-assets/W3975P440925) |
| `W3975P501411` | 8 | 黑色 | 棉麻黑色L | 591.99 | [`product-assets/W3975P501411`](product-assets/W3975P501411) |
| `W3975P510434` | 7 | 黑色 | 长毛绒灰色（以目录为准，取黑色） | 181.99 | [`product-assets/W3975P510434`](product-assets/W3975P510434) |
| `W3975P519736` | 7 | 咖啡色 | 灯芯绒咖啡色L | 583.99 | [`product-assets/W3975P519736`](product-assets/W3975P519736) |
| `W3975P530974` | 6 | 橙色 | 灯芯绒橙色 orange | 340.99 | [`product-assets/W3975P530974`](product-assets/W3975P530974) |
| `W3975S00042` | 5 | 白色 | 灯芯绒米白色 WHITE | 924.99 | [`product-assets/W3975S00042`](product-assets/W3975S00042) |
| `W3975S00121` | 6 | 棕色 | 细灯芯绒棕色 | 584.99 | [`product-assets/W3975S00121`](product-assets/W3975S00121) |
| `W3975S00183` | 7 | 驼色（目录未标色，沿用 Excel） | 灯芯绒驼色 CAMEL | 1330.99 | [`product-assets/W3975S00183`](product-assets/W3975S00183) |
| `W5885P517229` | 8 | 白色（目录未标色，沿用 Excel） | 长毛绒白色 WHITE 带杯托 | 424.99 | [`product-assets/W5885P517229`](product-assets/W5885P517229) |

### 本次新增 / 替换内容

- **新增**：`product-assets/`（10 个 SKU 目录、67 张商品图，按 SKU 命名）。
- **新增**：`contents/Tessilo_沙发定价表_精简版_20261024.xlsx`（18 KB）与 `contents/PRICING_20261024.csv`（17 KB），解决 90 MB 原始表在 GitHub 打不开的问题（数值与原始表一致）。
- **移出**：`contents/Tessilo_沙发定价表_实际成本版.xlsx`（90 MB）已从仓库移除，原始文件保留在本地 `~/Desktop/压缩沙发/`；如需入库原文，建议改用 Git LFS。
- **新增**：`PRICING.md`（首次建立，按 SKU 同步零售价、成本与备注，并列出待确认项）。
- **扩充（替换说明）**：`W3975S00042` 此前仅有 `public/assets/launch/W3975S00042.jpg` 一张主图，本次补充 5 张完整素材；原有图片**保留未删除**。
- **未改动**：`public/assets/`、`public/assets/launch/`（含 `W3975P437947`、`W3975P484393`、`W3975P502469`、`W3975P519663`、`W5885P548263`）、`public/assets/excel/` 下既有图片均保持原样，未覆盖他人素材。
- **价格状态**：本次为**首次导入价格**（此前仓库无 `PRICING.md`），价格按 Excel 原值全量同步，未沿用或推算任何旧值。

### 本次口径（2026-10-24 业务确认）

1. 销售渠道／平台、折扣／活动价／促销策略**本次不纳入**，定价以建议零售价 MSRP 为准。
2. 同款产品**颜色可互换，以素材目录为准**（Excel 颜色仅作参考）。
3. 库存无重复：含两列库存的工作表为**组合产品的分件库存**（部件 1／部件 2）。
4. 空白库存**暂不维护**，未补 0、未估算。
5. 小抱枕等附件随产品，**不单独计价**。

### 待确认（详见 [`PRICING.md`](PRICING.md)）

1. `新款-双扶手贵妃` 工作表无「材质」列，该表 SKU 材质待确认。
2. Excel 未标注价格生效日期，「价格版本日期」暂按文件提供日 2026-10-24 记录。
3. 素材覆盖 10 / 84 个 SKU，其余 74 个 SKU 暂无素材。

### 后续维护要求

1. 价格以 Excel 为唯一来源；调价先改 Excel，再同步 `PRICING.md` 并更新「价格版本日期」与「文档核对日期」。若某次仅更新素材，则保留现有价格并注明「价格未变」，只更新素材链接与核对日期。
2. 缺失、冲突或空白数据一律保留「待确认」标记，由业务方在 Excel 中确认后回填，禁止自行推算或覆盖。
3. 新增素材按 `product-assets/<SKU>/` 存放（目录名用纯 SKU），同步更新本文档的 SKU 与图片数量，以及 `PRICING.md` 的素材链接。
4. 定价表更新时同步三处：`PRICING.md`、`contents/PRICING_20261024.csv`、精简版 xlsx，保证数值一致；90 MB 原始文件不建议直接入库（无法在线预览），必要时改用 Git LFS。
5. 每次更新后核验 SKU 数量、价格数值、素材链接三项一致再提交。
6. 站点前台保持 B2B 询价模式，不公开 MSRP 与成本。
