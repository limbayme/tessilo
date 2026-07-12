"use client";

import { useMemo, useState } from "react";

const A = "/assets/";
const WHATSAPP_URL = "https://wa.me/18296874119?text=Hello%20Tessilo%2C%20I%20would%20like%20to%20request%20a%20B2B%20furniture%20quote.";
const INQUIRY_EMAIL = "leo@digitauro.com";

type Lang = "en" | "zh" | "de" | "fr";

const languages: { code: Lang; label: string }[] = [
  { code: "en", label: "EN" },
  { code: "zh", label: "中文" },
  { code: "de", label: "DE" },
  { code: "fr", label: "FR" },
];

type Product = {
  name: string;
  spec: string;
  image: string;
  category: string;
  unitPrice: number;
  price: string;
  logistics: string;
  note?: string;
};

const navItems = [
  ["products", "#products"],
  ["solutions", "#solutions"],
  ["about", "#about"],
  ["contact", "#contact"],
] as const;

const ui = {
  en: {
    nav: { products: "Products", solutions: "Solutions", about: "About", contact: "Contact" },
    aboutUs: "About Us",
    requestQuote: "Request Quote",
    heroEyebrow: "Tessilo Global Home",
    heroTitle: "Furniture Solutions for Visionary Spaces",
    heroCopy: "Specializing in premium contract manufacturing for the hospitality, commercial, and executive sectors worldwide.",
    browseCatalog: "Browse Catalog",
    ourSolutions: "Our Solutions",
    collectionsEyebrow: "Our Collections",
    collectionsTitle: "Crafted for performance and refined aesthetics.",
    viewAll: "View all categories →",
    advantageEyebrow: "The Tessilo Advantage",
    advantageTitle: "Global Reach, Local Craftsmanship.",
    advantageCopy: "We bridge the gap between grand architectural vision and functional, durable furniture delivery.",
    signatureEyebrow: "Signature Pieces",
    signatureTitle: "Engineered for Comfort & Style",
    workflowEyebrow: "Our Workflow",
    workflowTitle: "The Journey from Vision to Reality",
    testimonials: "Client Testimonials",
    worldwide: "Worldwide Logistics",
    reachTitle: "Connecting the World of Design",
    reachCopy: "Tessilo's global B2B presence bridges continents with precision logistics, trusted partnerships, and a commitment to timeless quality.",
    exploreReach: "Explore global reach →",
    breadcrumbHome: "Home",
    collections: "Collections",
    visible: "Excel items visible",
    filters: "Filters",
    categories: "Categories",
    productType: "Product Type",
    priceRange: "Price Range",
    logistics: "Logistics",
    negotiable: "Negotiatable",
    detailCollection: "Living Room Collection",
    detailTitle: "Nested Round Coffee Tables",
    sceneRender: "Scene Render",
    specs: "Specifications",
    source: "SOURCE: TESSILO PRODUCT EXCEL",
    requestPricing: "Request Pricing Quote",
    downloadImage: "Download Product Image",
    tabs: ["Description", "Specifications", "Shipping & Logistics"],
    detailPanelTitle: "Compact tables for premium living and hospitality spaces",
    detailDescription: "A nested coffee table set designed for flexible lounge styling, hotel suites, apartment living rooms, and small-space merchandising. The Excel source lists this item as 大小圆茶几 with a €40 unit price and €12.59 logistics fee.",
    detailSpecs: "Two round tables, white stone-look surface, slim black circular metal base, suitable for coordinated living-room and hospitality packages.",
    detailShipping: "Listed logistics fee is €12.59. For combined orders, Tessilo can quote consolidated shipping and B2B quantity pricing.",
    related: "Complementary Pieces",
    faqEyebrow: "B2B Support",
    faqTitle: "Frequently Asked Questions",
    ctaTitle: "Ready to Furnish Your Space?",
    ctaCopy: "Join our waitlist for the 2026 contract collection or request a consultation today.",
    emailPlaceholder: "Enter your business email...",
    productPlaceholder: "Select product interest",
    quantityPlaceholder: "Estimated quantity",
    messagePlaceholder: "Project notes, destination country, target delivery time...",
    whatsappQuote: "Chat on WhatsApp",
    inquirySteps: ["Choose a product", "Share quantity & destination", "Confirm by WhatsApp"],
    submitted: "Submitted",
    getStarted: "Get Started",
    formNote: "Thanks — our contract team will follow up shortly.",
    footerCopy: "The Home of Comfort & Style. Global B2B leaders in premium contract furniture and architectural solutions.",
    company: "Company",
    socialContact: "Social & Contact",
    privacy: "Privacy Policy · Terms of Service · Cookie Settings",
  },
  zh: {
    nav: { products: "产品", solutions: "解决方案", about: "关于", contact: "联系" },
    aboutUs: "关于我们",
    requestQuote: "获取报价",
    heroEyebrow: "Tessilo 环球家居",
    heroTitle: "面向前瞻空间的家具解决方案",
    heroCopy: "专注于酒店、商业与高端办公领域的优质 B2B 合同家具制造与供应。",
    browseCatalog: "浏览产品",
    ourSolutions: "解决方案",
    collectionsEyebrow: "产品系列",
    collectionsTitle: "兼具性能、舒适与精致美学。",
    viewAll: "查看全部分类 →",
    advantageEyebrow: "Tessilo 优势",
    advantageTitle: "全球供应，本地化品质。",
    advantageCopy: "我们连接空间设计愿景与稳定、耐用、可落地的家具交付。",
    signatureEyebrow: "精选产品",
    signatureTitle: "为舒适与风格而设计",
    workflowEyebrow: "合作流程",
    workflowTitle: "从需求到交付的完整路径",
    testimonials: "客户反馈",
    worldwide: "全球物流",
    reachTitle: "连接全球设计与采购",
    reachCopy: "Tessilo 通过精准物流、可靠合作伙伴和稳定品质，服务全球 B2B 家具项目。",
    exploreReach: "了解全球交付 →",
    breadcrumbHome: "首页",
    collections: "系列",
    visible: "个 Excel 产品可见",
    filters: "筛选",
    categories: "分类",
    productType: "产品类型",
    priceRange: "价格区间",
    logistics: "物流费",
    negotiable: "可议价",
    detailCollection: "客厅系列",
    detailTitle: "大小圆茶几",
    sceneRender: "场景渲染",
    specs: "规格",
    source: "来源：TESSILO 产品 Excel",
    requestPricing: "获取价格报价",
    downloadImage: "下载产品图",
    tabs: ["描述", "规格", "物流与运输"],
    detailPanelTitle: "适合高端客厅与酒店空间的灵活茶几组合",
    detailDescription: "大小圆茶几适合客厅、酒店套房、公寓与小空间陈列。Excel 源数据标注单价 €40，物流费 €12.59。",
    detailSpecs: "双圆桌组合，白色石纹台面，黑色金属圆形框架，适合整体客厅与酒店家具配套。",
    detailShipping: "该产品表内物流费为 €12.59。组合采购可按数量与合并运输重新报价。",
    related: "搭配产品",
    faqEyebrow: "B2B 支持",
    faqTitle: "常见问题",
    ctaTitle: "准备开始你的家具项目？",
    ctaCopy: "加入 2026 合同家具系列候补名单，或立即咨询采购方案。",
    emailPlaceholder: "请输入企业邮箱...",
    productPlaceholder: "选择意向产品",
    quantityPlaceholder: "预计采购数量",
    messagePlaceholder: "项目备注、目的国家、期望交付时间...",
    whatsappQuote: "WhatsApp 直接咨询",
    inquirySteps: ["选择产品", "填写数量与目的地", "通过 WhatsApp 确认"],
    submitted: "已提交",
    getStarted: "开始咨询",
    formNote: "谢谢，我们的合同家具团队会尽快联系你。",
    footerCopy: "舒适与风格之家。面向全球 B2B 的高端合同家具与空间解决方案供应商。",
    company: "公司",
    socialContact: "社媒与联系",
    privacy: "隐私政策 · 服务条款 · Cookie 设置",
  },
  de: {
    nav: { products: "Produkte", solutions: "Lösungen", about: "Über uns", contact: "Kontakt" },
    aboutUs: "Über uns",
    requestQuote: "Angebot anfragen",
    heroEyebrow: "Tessilo Global Home",
    heroTitle: "Möbellösungen für visionäre Räume",
    heroCopy: "Premium-Vertragsfertigung für Hospitality, Gewerbe und Executive-Bereiche weltweit.",
    browseCatalog: "Katalog ansehen",
    ourSolutions: "Unsere Lösungen",
    collectionsEyebrow: "Kollektionen",
    collectionsTitle: "Für Leistung und elegante Ästhetik gefertigt.",
    viewAll: "Alle Kategorien ansehen →",
    advantageEyebrow: "Der Tessilo Vorteil",
    advantageTitle: "Globale Reichweite, lokale Handwerksqualität.",
    advantageCopy: "Wir verbinden architektonische Visionen mit funktionaler, langlebiger Möbellieferung.",
    signatureEyebrow: "Ausgewählte Stücke",
    signatureTitle: "Für Komfort & Stil entwickelt",
    workflowEyebrow: "Unser Ablauf",
    workflowTitle: "Von der Vision bis zur Umsetzung",
    testimonials: "Kundenstimmen",
    worldwide: "Weltweite Logistik",
    reachTitle: "Die Welt des Designs verbinden",
    reachCopy: "Tessilo verbindet Kontinente mit präziser Logistik, verlässlichen Partnern und zeitloser Qualität.",
    exploreReach: "Globale Reichweite entdecken →",
    breadcrumbHome: "Startseite",
    collections: "Kollektionen",
    visible: "Excel-Artikel sichtbar",
    filters: "Filter",
    categories: "Kategorien",
    productType: "Produkttyp",
    priceRange: "Preisspanne",
    logistics: "Logistik",
    negotiable: "Verhandelbar",
    detailCollection: "Wohnzimmerkollektion",
    detailTitle: "Runde Satztische",
    sceneRender: "Szenen-Rendering",
    specs: "Spezifikationen",
    source: "QUELLE: TESSILO PRODUKT-EXCEL",
    requestPricing: "Preisangebot anfragen",
    downloadImage: "Produktbild herunterladen",
    tabs: ["Beschreibung", "Spezifikationen", "Versand & Logistik"],
    detailPanelTitle: "Kompakte Tische für hochwertige Wohn- und Hospitality-Bereiche",
    detailDescription: "Ein Satztisch-Set für flexible Lounge-Gestaltung, Hotelsuiten, Apartments und kompakte Verkaufsflächen. Laut Excel: €40 Stückpreis und €12,59 Logistikkosten.",
    detailSpecs: "Zwei runde Tische, weiße Steinoptik, schlankes schwarzes Metallgestell, geeignet für Wohn- und Hospitality-Pakete.",
    detailShipping: "Die gelistete Logistikgebühr beträgt €12,59. Für Sammelbestellungen bietet Tessilo konsolidierte Versand- und Mengenpreise.",
    related: "Passende Stücke",
    faqEyebrow: "B2B Support",
    faqTitle: "Häufige Fragen",
    ctaTitle: "Bereit, Ihren Raum einzurichten?",
    ctaCopy: "Treten Sie der Warteliste für die Vertragskollektion 2026 bei oder fragen Sie eine Beratung an.",
    emailPlaceholder: "Geschäftliche E-Mail eingeben...",
    productPlaceholder: "Produktinteresse auswählen",
    quantityPlaceholder: "Geschätzte Menge",
    messagePlaceholder: "Projektinfo, Zielland, gewünschter Liefertermin...",
    whatsappQuote: "Per WhatsApp chatten",
    inquirySteps: ["Produkt wählen", "Menge & Zielort teilen", "Per WhatsApp bestätigen"],
    submitted: "Gesendet",
    getStarted: "Starten",
    formNote: "Danke — unser Vertragsteam meldet sich in Kürze.",
    footerCopy: "The Home of Comfort & Style. Globale B2B-Experten für Premium-Vertragsmöbel und architektonische Lösungen.",
    company: "Unternehmen",
    socialContact: "Social & Kontakt",
    privacy: "Datenschutz · Nutzungsbedingungen · Cookie-Einstellungen",
  },
  fr: {
    nav: { products: "Produits", solutions: "Solutions", about: "À propos", contact: "Contact" },
    aboutUs: "À propos",
    requestQuote: "Demander un devis",
    heroEyebrow: "Tessilo Global Home",
    heroTitle: "Solutions mobilier pour espaces visionnaires",
    heroCopy: "Fabrication contractuelle premium pour l'hôtellerie, les espaces commerciaux et les bureaux de direction.",
    browseCatalog: "Voir le catalogue",
    ourSolutions: "Nos solutions",
    collectionsEyebrow: "Collections",
    collectionsTitle: "Conçu pour la performance et une esthétique raffinée.",
    viewAll: "Voir toutes les catégories →",
    advantageEyebrow: "L'avantage Tessilo",
    advantageTitle: "Portée mondiale, savoir-faire local.",
    advantageCopy: "Nous relions la vision architecturale à une livraison mobilier fonctionnelle et durable.",
    signatureEyebrow: "Pièces signature",
    signatureTitle: "Conçu pour le confort et le style",
    workflowEyebrow: "Notre processus",
    workflowTitle: "Du concept à la réalisation",
    testimonials: "Témoignages clients",
    worldwide: "Logistique mondiale",
    reachTitle: "Connecter le monde du design",
    reachCopy: "La présence B2B mondiale de Tessilo relie les continents avec précision logistique, partenaires fiables et qualité durable.",
    exploreReach: "Explorer la portée mondiale →",
    breadcrumbHome: "Accueil",
    collections: "Collections",
    visible: "articles Excel visibles",
    filters: "Filtres",
    categories: "Catégories",
    productType: "Type de produit",
    priceRange: "Fourchette de prix",
    logistics: "Logistique",
    negotiable: "Négociable",
    detailCollection: "Collection salon",
    detailTitle: "Tables basses rondes gigognes",
    sceneRender: "Rendu de scène",
    specs: "Spécifications",
    source: "SOURCE : EXCEL PRODUITS TESSILO",
    requestPricing: "Demander un prix",
    downloadImage: "Télécharger l'image produit",
    tabs: ["Description", "Spécifications", "Expédition & logistique"],
    detailPanelTitle: "Tables compactes pour espaces résidentiels et hôteliers premium",
    detailDescription: "Un ensemble de tables gigognes pour salons, suites hôtelières, appartements et petits espaces. La source Excel indique un prix unitaire de €40 et €12,59 de logistique.",
    detailSpecs: "Deux tables rondes, plateau effet pierre blanche, structure circulaire en métal noir, adaptées aux projets résidentiels et hôteliers.",
    detailShipping: "Les frais logistiques listés sont de €12,59. Pour les commandes groupées, Tessilo peut proposer transport consolidé et prix B2B.",
    related: "Pièces complémentaires",
    faqEyebrow: "Support B2B",
    faqTitle: "Questions fréquentes",
    ctaTitle: "Prêt à meubler votre espace ?",
    ctaCopy: "Rejoignez la liste d'attente de la collection contract 2026 ou demandez une consultation.",
    emailPlaceholder: "Entrez votre e-mail professionnel...",
    productPlaceholder: "Sélectionner un produit",
    quantityPlaceholder: "Quantité estimée",
    messagePlaceholder: "Notes projet, pays de destination, délai souhaité...",
    whatsappQuote: "Discuter sur WhatsApp",
    inquirySteps: ["Choisir un produit", "Partager quantité & destination", "Confirmer par WhatsApp"],
    submitted: "Envoyé",
    getStarted: "Commencer",
    formNote: "Merci — notre équipe contract vous contactera rapidement.",
    footerCopy: "The Home of Comfort & Style. Expert B2B mondial du mobilier contract premium et des solutions architecturales.",
    company: "Entreprise",
    socialContact: "Réseaux & contact",
    privacy: "Confidentialité · Conditions d'utilisation · Paramètres des cookies",
  },
} satisfies Record<Lang, Record<string, any>>;

const categories = [
  {
    title: "Office Furniture",
    copy: "Bespoke excellence for executive suites and collaborative workspaces.",
    image: "category-office.png",
  },
  {
    title: "Hospitality Furniture",
    copy: "Contract-grade comfort for hotels, restaurants, lounges and clubs.",
    image: "category-hospitality.png",
  },
  {
    title: "Residential Collections",
    copy: "Refined silhouettes for premium developments and private villas.",
    image: "category-residential.png",
  },
  {
    title: "Custom Solutions",
    copy: "Made-to-spec programs for architects, developers and procurement teams.",
    image: "category-custom.png",
  },
];

const featured: Product[] = [
  {
    name: "Storage Corner Sofa",
    spec: "2.45m corner sofa with storage",
    image: "excel/row-02-col-02.png",
    category: "Living Room",
    unitPrice: 299.05,
    price: "€299.05 / unit",
    logistics: "Logistics €57",
  },
  {
    name: "Nested Round Coffee Tables",
    spec: "Large + small round coffee table set",
    image: "excel/coffee-table-scene-living.jpg",
    category: "Living Room",
    unitPrice: 40,
    price: "€40 / set",
    logistics: "Logistics €12.59",
    note: "Negotiable",
  },
  {
    name: "L-Shaped Office Desk",
    spec: "Corner workstation desk",
    image: "excel/row-09-col-02.png",
    category: "Office",
    unitPrice: 72,
    price: "€72 / unit",
    logistics: "Logistics €19.21",
  },
];

const listing: Product[] = [
  ...featured,
  {
    name: "Low TV Cabinet",
    spec: "1.7m TV cabinet",
    image: "excel/row-04-col-02.png",
    category: "Living Room",
    unitPrice: 50,
    price: "€50 / unit",
    logistics: "Logistics €23.70",
    note: "Negotiable",
  },
  {
    name: "Leather Dining Chairs",
    spec: "Two leather dining chairs",
    image: "excel/row-05-col-02.png",
    category: "Dining",
    unitPrice: 65,
    price: "€65 / 2 pcs",
    logistics: "Logistics €11.44",
  },
  {
    name: "Swivel Office Chair",
    spec: "Rotating office chair",
    image: "excel/row-06-col-02.png",
    category: "Office",
    unitPrice: 49.35,
    price: "€49.35 / unit",
    logistics: "Logistics €9.81",
  },
  {
    name: "One-Drawer Nightstand",
    spec: "Compact bedside cabinet",
    image: "excel/row-07-col-02.png",
    category: "Bedroom",
    unitPrice: 35,
    price: "€35 / unit",
    logistics: "Logistics €8.24",
  },
  {
    name: "Solid Wood Chest",
    spec: "Full solid wood drawer cabinet",
    image: "excel/row-08-col-02.png",
    category: "Storage",
    unitPrice: 135,
    price: "€135 / unit",
    logistics: "Logistics €26.59",
  },
  {
    name: "Fabric Sofa Bed",
    spec: "1.6m fabric sofa bed",
    image: "excel/row-10-col-02.png",
    category: "Living Room",
    unitPrice: 161,
    price: "€161 / unit",
    logistics: "Logistics €11",
  },
];

const productCopy: Record<string, Record<Lang, { name: string; spec: string; category: string }>> = {
  "Storage Corner Sofa": {
    en: { name: "Storage Corner Sofa", spec: "2.45m corner sofa with storage", category: "Living Room" },
    zh: { name: "储物转角沙发", spec: "2.45 米带储物转角沙发", category: "客厅" },
    de: { name: "Ecksofa mit Stauraum", spec: "2,45 m Ecksofa mit Stauraum", category: "Wohnzimmer" },
    fr: { name: "Canapé d'angle avec rangement", spec: "Canapé d'angle 2,45 m avec rangement", category: "Salon" },
  },
  "Nested Round Coffee Tables": {
    en: { name: "Nested Round Coffee Tables", spec: "Large + small round coffee table set", category: "Living Room" },
    zh: { name: "大小圆茶几", spec: "大小圆茶几组合", category: "客厅" },
    de: { name: "Runde Satztische", spec: "Großes + kleines rundes Couchtisch-Set", category: "Wohnzimmer" },
    fr: { name: "Tables basses rondes gigognes", spec: "Ensemble grande + petite table basse ronde", category: "Salon" },
  },
  "L-Shaped Office Desk": {
    en: { name: "L-Shaped Office Desk", spec: "Corner workstation desk", category: "Office" },
    zh: { name: "转角办公桌", spec: "L 型转角办公桌", category: "办公" },
    de: { name: "L-förmiger Schreibtisch", spec: "Eck-Arbeitsplatz", category: "Büro" },
    fr: { name: "Bureau d'angle", spec: "Bureau de travail en L", category: "Bureau" },
  },
  "Low TV Cabinet": {
    en: { name: "Low TV Cabinet", spec: "1.7m TV cabinet", category: "Living Room" },
    zh: { name: "电视柜", spec: "1.7 米电视柜", category: "客厅" },
    de: { name: "Lowboard TV-Schrank", spec: "1,7 m TV-Schrank", category: "Wohnzimmer" },
    fr: { name: "Meuble TV bas", spec: "Meuble TV 1,7 m", category: "Salon" },
  },
  "Leather Dining Chairs": {
    en: { name: "Leather Dining Chairs", spec: "Two leather dining chairs", category: "Dining" },
    zh: { name: "皮质餐椅", spec: "两把皮质座椅", category: "餐厅" },
    de: { name: "Leder-Esszimmerstühle", spec: "Zwei Lederstühle", category: "Esszimmer" },
    fr: { name: "Chaises de salle à manger en cuir", spec: "Deux chaises en cuir", category: "Salle à manger" },
  },
  "Swivel Office Chair": {
    en: { name: "Swivel Office Chair", spec: "Rotating office chair", category: "Office" },
    zh: { name: "旋转办公椅", spec: "旋转办公椅", category: "办公" },
    de: { name: "Drehbarer Bürostuhl", spec: "Drehstuhl fürs Büro", category: "Büro" },
    fr: { name: "Chaise de bureau pivotante", spec: "Chaise de bureau rotative", category: "Bureau" },
  },
  "One-Drawer Nightstand": {
    en: { name: "One-Drawer Nightstand", spec: "Compact bedside cabinet", category: "Bedroom" },
    zh: { name: "一抽床头柜", spec: "一抽床头柜", category: "卧室" },
    de: { name: "Nachttisch mit Schublade", spec: "Kompakter Nachtschrank", category: "Schlafzimmer" },
    fr: { name: "Table de chevet à un tiroir", spec: "Chevet compact", category: "Chambre" },
  },
  "Solid Wood Chest": {
    en: { name: "Solid Wood Chest", spec: "Full solid wood drawer cabinet", category: "Storage" },
    zh: { name: "全实木斗柜", spec: "全实木斗柜", category: "收纳" },
    de: { name: "Massivholz-Kommode", spec: "Schubladenschrank aus Massivholz", category: "Stauraum" },
    fr: { name: "Commode en bois massif", spec: "Commode à tiroirs en bois massif", category: "Rangement" },
  },
  "Fabric Sofa Bed": {
    en: { name: "Fabric Sofa Bed", spec: "1.6m fabric sofa bed", category: "Living Room" },
    zh: { name: "布艺沙发床", spec: "1.6 米布艺沙发床", category: "客厅" },
    de: { name: "Stoff-Schlafsofa", spec: "1,6 m Schlafsofa aus Stoff", category: "Wohnzimmer" },
    fr: { name: "Canapé-lit en tissu", spec: "Canapé-lit tissu 1,6 m", category: "Salon" },
  },
};

const categoryCopy: Record<string, Record<Lang, string>> = {
  "Living Room": { en: "Living Room", zh: "客厅", de: "Wohnzimmer", fr: "Salon" },
  Office: { en: "Office", zh: "办公", de: "Büro", fr: "Bureau" },
  Dining: { en: "Dining", zh: "餐厅", de: "Esszimmer", fr: "Salle à manger" },
  Bedroom: { en: "Bedroom", zh: "卧室", de: "Schlafzimmer", fr: "Chambre" },
  Storage: { en: "Storage", zh: "收纳", de: "Stauraum", fr: "Rangement" },
};

const productTypeCopy: Record<string, Record<Lang, string>> = {
  Sofa: { en: "Sofa", zh: "沙发", de: "Sofa", fr: "Canapé" },
  Coffee: { en: "Coffee", zh: "茶几", de: "Couchtisch", fr: "Table basse" },
  Chair: { en: "Chair", zh: "椅子", de: "Stuhl", fr: "Chaise" },
  Desk: { en: "Desk", zh: "桌", de: "Schreibtisch", fr: "Bureau" },
  Cabinet: { en: "Cabinet", zh: "柜", de: "Schrank", fr: "Meuble" },
  Bed: { en: "Bed", zh: "床", de: "Bett", fr: "Lit" },
};

const productSearchTerms: Record<string, string[]> = {
  Sofa: ["sofa", "沙发", "canapé", "schlafsofa"],
  Coffee: ["coffee", "茶几", "couchtisch", "table basse"],
  Chair: ["chair", "椅", "stuhl", "chaise"],
  Desk: ["desk", "办公桌", "schreibtisch", "bureau"],
  Cabinet: ["cabinet", "柜", "schrank", "meuble", "commode"],
  Bed: ["bed", "床", "bett", "lit"],
};

const stats = [
  ["50+", "Countries", "Global shipping & logistics network."],
  ["15+", "Years", "Of industry-leading furniture expertise."],
  ["10k+", "Products", "Extensive catalog of ready designs."],
  ["500+", "Partners", "Active B2B global partnerships."],
];

const steps = [
  ["01", "Consultation", "Understanding your spatial requirements and project scope."],
  ["02", "Custom Design", "Bespoke engineering and aesthetic selection by our studio."],
  ["03", "Manufacturing", "Precision fabrication at our global facility hubs."],
  ["04", "Global Delivery", "Seamless logistics to any continent with white-glove service."],
];

const detailImages = [
  "excel/coffee-table-scene-living.jpg",
  "excel/row-03-col-02.png",
  "excel/coffee-table-scene-hotel.jpg",
  "excel/coffee-table-scene-reception.jpg",
];

const finishOptions = [
  { name: "Living Room", color: "#c9a96e" },
  { name: "Original Product", color: "#f7f7f2" },
  { name: "Hotel Suite", color: "#6b5746" },
  { name: "Reception Lounge", color: "#1b2a4a" },
];

const faqs = [
  {
    q: "What is the MOQ for B2B projects?",
    a: "Standard MOQ is 20 units for stock items. Custom collections usually require a minimum order value of $25,000.",
  },
  {
    q: "Do you offer worldwide white-glove shipping?",
    a: "Yes. Tessilo coordinates global freight, customs documentation, consolidation, and optional white-glove delivery.",
  },
  {
    q: "Can pieces be customized for hospitality standards?",
    a: "Yes. We support finish, upholstery, fire rating, dimensions, packaging, and project-specific specification requirements.",
  },
  {
    q: "What is the average lead time for large orders?",
    a: "Stock programs usually ship in 3–6 weeks. Custom manufacturing typically ranges from 8–14 weeks after final sign-off.",
  },
];

const faqsByLang: Record<Lang, typeof faqs> = {
  en: faqs,
  zh: [
    { q: "B2B 项目的起订量是多少？", a: "常规现货产品通常 20 件起订。定制项目会根据产品、包装和运输方式单独报价。" },
    { q: "是否支持全球运输？", a: "支持。Tessilo 可协助国际货运、清关资料、合并运输和项目交付安排。" },
    { q: "酒店或商业项目可以定制吗？", a: "可以。我们支持尺寸、饰面、面料、包装和项目规格定制。" },
    { q: "大货订单一般交期多久？", a: "现货产品通常 3–6 周发货。定制生产一般在确认后 8–14 周，视项目复杂度而定。" },
  ],
  de: [
    { q: "Wie hoch ist die Mindestbestellmenge für B2B-Projekte?", a: "Für Standardartikel gilt in der Regel eine Mindestmenge von 20 Stück. Sonderanfertigungen werden projektbezogen kalkuliert." },
    { q: "Bieten Sie weltweiten Versand an?", a: "Ja. Tessilo unterstützt internationale Fracht, Zolldokumente, konsolidierten Versand und Projektlieferungen." },
    { q: "Können Produkte für Hospitality-Projekte angepasst werden?", a: "Ja. Maße, Oberflächen, Bezugsstoffe, Verpackung und projektspezifische Spezifikationen können angepasst werden." },
    { q: "Wie lang ist die durchschnittliche Lieferzeit?", a: "Lagerprogramme versenden meist in 3–6 Wochen. Sonderanfertigungen benötigen typischerweise 8–14 Wochen nach Freigabe." },
  ],
  fr: [
    { q: "Quel est le MOQ pour les projets B2B ?", a: "Le MOQ standard est généralement de 20 pièces pour les articles disponibles. Les projets sur mesure sont chiffrés selon les spécifications." },
    { q: "Proposez-vous une livraison internationale ?", a: "Oui. Tessilo accompagne le fret international, les documents douaniers, le transport consolidé et la livraison projet." },
    { q: "Les pièces peuvent-elles être personnalisées pour l'hôtellerie ?", a: "Oui. Dimensions, finitions, tissus, emballage et exigences projet peuvent être adaptés." },
    { q: "Quel est le délai moyen pour les grosses commandes ?", a: "Les produits disponibles expédient souvent en 3–6 semaines. La fabrication sur mesure prend généralement 8–14 semaines après validation." },
  ],
};

const socialLinks = [
  {
    platform: "TikTok",
    handle: "@tessilo10",
    href: "https://www.tiktok.com/@tessilo10",
    note: "Short-form product discovery",
    image: "excel/row-15-col-03.png",
  },
  {
    platform: "Instagram",
    handle: "@tessilo_home",
    href: "https://www.instagram.com/tessilo_home",
    note: "Furniture moodboards and product visuals",
    image: "excel/row-16-col-03.png",
  },
  {
    platform: "Facebook",
    handle: "Tessilo Global Home",
    href: "https://www.facebook.com/profile.php?id=61591637766953",
    note: "B2B wholesale profile",
    image: "excel/row-17-col-03.png",
  },
  {
    platform: "LinkedIn",
    handle: "Tessilo Global Home",
    href: "https://www.linkedin.com/in/%E6%85%A7-%E5%88%98-5375aa410/",
    note: "International B2B development",
  },
  {
    platform: "WhatsApp",
    handle: "18296874119",
    href: "https://wa.me/18296874119",
    note: "Direct product enquiries",
    image: "excel/row-19-col-03.png",
  },
];

export default function TessiloClient() {
  const [lang, setLang] = useState<Lang>("en");

  return (
    <>
      <Header lang={lang} setLang={setLang} />
      <main>
        <Hero lang={lang} />
        <Categories lang={lang} />
        <Advantage lang={lang} />
        <Featured lang={lang} />
        <Process lang={lang} />
        <Testimonials lang={lang} />
        <GlobalReach lang={lang} />
        <ProductListing lang={lang} />
        <ProductDetail lang={lang} />
        <Faq lang={lang} />
        <Cta lang={lang} />
      </main>
      <Footer lang={lang} />
    </>
  );
}

function Header({ lang, setLang }: { lang: Lang; setLang: (lang: Lang) => void }) {
  const [open, setOpen] = useState(false);
  const copy = ui[lang];

  return (
    <>
      <header className="site-header">
        <a className="brand" href="#" aria-label="Tessilo home" onClick={() => setOpen(false)}>
          <img src={`${A}logo.png`} alt="" />
          <span>Tessilo</span>
        </a>
        <nav className="desktop-nav" aria-label="Primary navigation">
          {navItems.map(([key, href]) => (
            <a href={href} key={key}>{copy.nav[key]}</a>
          ))}
          <LanguageSwitcher lang={lang} setLang={setLang} />
          <a className="button gold" href="#quote">{copy.requestQuote}</a>
        </nav>
        <button
          className={`menu ${open ? "is-open" : ""}`}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          type="button"
          onClick={() => setOpen((value) => !value)}
        >
          <span />
          <span />
          <span />
        </button>
      </header>
      <MobileNavOverlay open={open} onClose={() => setOpen(false)} lang={lang} setLang={setLang} />
    </>
  );
}

function LanguageSwitcher({ lang, setLang }: { lang: Lang; setLang: (lang: Lang) => void }) {
  return (
    <div className="lang-switcher" aria-label="Language selector">
      {languages.map((item) => (
        <button
          className={item.code === lang ? "is-active" : ""}
          type="button"
          key={item.code}
          onClick={() => setLang(item.code)}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}

function MobileNavOverlay({ open, onClose, lang, setLang }: { open: boolean; onClose: () => void; lang: Lang; setLang: (lang: Lang) => void }) {
  const copy = ui[lang];

  return (
    <div className={`mobile-overlay ${open ? "is-open" : ""}`} aria-hidden={!open}>
      <div className="mobile-panel" role="dialog" aria-modal="true" aria-label="Mobile navigation">
        <div className="mobile-panel-top">
          <span>Tessilo</span>
          <button type="button" onClick={onClose} aria-label="Close menu">✕</button>
        </div>
        <nav className="mobile-panel-links">
          {navItems.map(([key, href], index) => (
            <a href={href} key={key} onClick={onClose} style={{ transitionDelay: `${index * 45}ms` }}>
              {key === "about" ? copy.aboutUs : copy.nav[key]}
            </a>
          ))}
        </nav>
        <div className="mobile-languages" aria-label="Language options">
          {languages.map((item) => (
            <button
              className={item.code === lang ? "is-active" : ""}
              type="button"
              key={item.code}
              onClick={() => setLang(item.code)}
            >
              {item.label}
            </button>
          ))}
        </div>
        <a className="button gold mobile-quote" href="#quote" onClick={onClose}>{copy.requestQuote}</a>
      </div>
      <button className="mobile-scrim" aria-label="Close menu" type="button" onClick={onClose} />
    </div>
  );
}

function Hero({ lang }: { lang: Lang }) {
  const copy = ui[lang];

  return (
    <section className="hero">
      <div className="hero-content reveal-up">
        <Eyebrow light>{copy.heroEyebrow}</Eyebrow>
        <h1>{copy.heroTitle}</h1>
        <p>{copy.heroCopy}</p>
        <div className="hero-actions">
          <a className="button gold" href="#products">{copy.browseCatalog}</a>
          <a className="button ghost-light" href="#solutions">{copy.ourSolutions}</a>
        </div>
      </div>
    </section>
  );
}

function Categories({ lang }: { lang: Lang }) {
  const copy = ui[lang];

  return (
    <section className="section muted" id="solutions">
      <div className="section-heading split">
        <div>
          <Eyebrow>{copy.collectionsEyebrow}</Eyebrow>
          <h2>{copy.collectionsTitle}</h2>
        </div>
        <a className="text-link" href="#products">{copy.viewAll}</a>
      </div>
      <div className="category-grid">
        {categories.map((item) => (
          <article className="category-card" key={item.title}>
            <img src={`${A}${item.image}`} alt="" />
            <div>
              <h3>{item.title}</h3>
              <p>{item.copy}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function Advantage({ lang }: { lang: Lang }) {
  const copy = ui[lang];

  return (
    <section className="section advantage" id="about">
      <div className="advantage-copy">
        <Eyebrow>{copy.advantageEyebrow}</Eyebrow>
        <h2>{copy.advantageTitle}</h2>
        <p>{copy.advantageCopy}</p>
      </div>
      <div className="stats-grid">
        {stats.map(([number, label, copy]) => (
          <article className="stat-card" key={label}>
            <strong>{number}</strong>
            <h3>{label}</h3>
            <p>{copy}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function Featured({ lang }: { lang: Lang }) {
  const copy = ui[lang];

  return (
    <section className="section" id="products">
      <div className="section-heading centered">
        <Eyebrow>{copy.signatureEyebrow}</Eyebrow>
        <h2>{copy.signatureTitle}</h2>
      </div>
      <div className="product-row">
        {featured.map((product) => (
          <ProductCard product={product} lang={lang} key={product.name} />
        ))}
      </div>
    </section>
  );
}

function productLabel(product: Product, lang: Lang) {
  return productCopy[product.name]?.[lang] ?? { name: product.name, spec: product.spec, category: product.category };
}

function ProductCard({ product, lang }: { product: Product; lang: Lang }) {
  const copy = ui[lang];
  const label = productLabel(product, lang);

  return (
    <article className="product-card">
      <div className="product-image">
        <img src={`${A}${product.image}`} alt={label.name} />
      </div>
      <div className="product-body">
        <span>{label.spec}</span>
        <h3>{label.name}</h3>
        <p className="price-line">{product.price}</p>
        <p>{product.logistics.replace("Logistics", copy.logistics)}</p>
        {product.note ? <strong className="negotiable-badge">{copy.negotiable}</strong> : null}
      </div>
      <div className="product-action">
        <a className="button outline" href="#quote">{copy.requestQuote}</a>
        <a className="whatsapp-mini" href={WHATSAPP_URL} target="_blank" rel="noreferrer">WhatsApp</a>
      </div>
    </article>
  );
}

function Process({ lang }: { lang: Lang }) {
  const copy = ui[lang];

  return (
    <section className="section muted process">
      <div className="section-heading">
        <Eyebrow>{copy.workflowEyebrow}</Eyebrow>
        <h2>{copy.workflowTitle}</h2>
      </div>
      <div className="step-grid">
        {steps.map(([num, title, copy]) => (
          <article className="step" key={num}>
            <div><strong>{num}</strong><span /></div>
            <h3>{title}</h3>
            <p>{copy}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function Testimonials({ lang }: { lang: Lang }) {
  return (
    <section className="section testimonials">
      <Eyebrow>{ui[lang].testimonials}</Eyebrow>
      <div className="testimonial-grid">
        <Quote img="avatar-voss.png" name="Alexander Voss" role="Principal, Voss Architect Studio" />
        <Quote img="avatar-park.png" name="Julianne Park" role="Director of Operations, Grand Hyatt Group" />
      </div>
    </section>
  );
}

function Quote({ img, name, role }: { img: string; name: string; role: string }) {
  return (
    <article className="quote-card">
      <p>
        “Tessilo redefined our executive suites. Their ability to handle massive
        volume without sacrificing the fine details of custom upholstery is
        unmatched in the industry.”
      </p>
      <div className="person">
        <img src={`${A}${img}`} alt="" />
        <div>
          <strong>{name}</strong>
          <span>{role}</span>
        </div>
      </div>
    </article>
  );
}

function GlobalReach({ lang }: { lang: Lang }) {
  const copy = ui[lang];

  return (
    <section className="global-reach">
      <div className="reach-card">
        <Eyebrow>{copy.worldwide}</Eyebrow>
        <h2>{copy.reachTitle}</h2>
        <p>{copy.reachCopy}</p>
        <div className="reach-stats">
          <strong>50+<span>Countries</span></strong>
          <strong>500+<span>Partners</span></strong>
          <strong>15+<span>Years</span></strong>
        </div>
        <div className="regions">
          {["North America", "European Union", "Middle East", "Southeast Asia"].map((region) => (
            <span key={region}>{region}</span>
          ))}
        </div>
        <a className="button pill" href="#contact">{copy.exploreReach}</a>
      </div>
    </section>
  );
}

function ProductListing({ lang }: { lang: Lang }) {
  const [activeCategories, setActiveCategories] = useState<string[]>([]);
  const [activeMaterials, setActiveMaterials] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState(320);
  const copy = ui[lang];

  const visibleProducts = useMemo(() => {
    return listing.filter((product) => {
      const categoryMatch = activeCategories.length === 0 || activeCategories.includes(product.category ?? "");
      const localized = productLabel(product, lang);
      const searchable = `${product.spec} ${product.name} ${localized.spec} ${localized.name}`.toLowerCase();
      const materialMatch = activeMaterials.length === 0 || activeMaterials.some((material) => {
        return productSearchTerms[material].some((term) => searchable.includes(term.toLowerCase()));
      });
      const priceMatch = product.unitPrice <= maxPrice;
      return categoryMatch && materialMatch && priceMatch;
    });
  }, [activeCategories, activeMaterials, maxPrice, lang]);

  return (
    <section className="listing" aria-label="Product listing preview">
      <div className="listing-top">
        <span>{copy.breadcrumbHome} / <b>{copy.collections}</b></span>
        <h2>{copy.collectionsEyebrow}</h2>
        <p>{visibleProducts.length} / {listing.length} {copy.visible}</p>
      </div>
      <div className="listing-layout">
        <aside className="filters" aria-label={copy.filters}>
          <FilterGroup title={copy.categories} items={["Living Room", "Office", "Dining", "Bedroom", "Storage"]} labels={categoryCopy} lang={lang} selected={activeCategories} onChange={setActiveCategories} />
          <FilterGroup title={copy.productType} items={["Sofa", "Coffee", "Chair", "Desk", "Cabinet", "Bed"]} labels={productTypeCopy} lang={lang} selected={activeMaterials} onChange={setActiveMaterials} />
          <div className="filter-group">
            <h3>{copy.priceRange}</h3>
            <label className="range-control">
              <input
                type="range"
                min="30"
                max="320"
                step="5"
                value={maxPrice}
                onChange={(event) => setMaxPrice(Number(event.target.value))}
              />
            </label>
            <div className="range-labels"><span>€30</span><span>€{maxPrice.toLocaleString()}</span></div>
          </div>
        </aside>
        <div className="listing-grid">
          {visibleProducts.map((product) => <ProductCard product={product} lang={lang} key={product.name} />)}
        </div>
      </div>
    </section>
  );
}

function FilterGroup({
  title,
  items,
  labels,
  lang,
  selected,
  onChange,
}: {
  title: string;
  items: string[];
  labels: Record<string, Record<Lang, string>>;
  lang: Lang;
  selected: string[];
  onChange: (items: string[]) => void;
}) {
  return (
    <div className="filter-group">
      <h3>{title}</h3>
      {items.map((item) => (
        <label key={item}>
          <input
            type="checkbox"
            checked={selected.includes(item)}
            onChange={() => {
              onChange(selected.includes(item) ? selected.filter((value) => value !== item) : [...selected, item]);
            }}
          />
          {labels[item]?.[lang] ?? item}
        </label>
      ))}
    </div>
  );
}

function ProductDetail({ lang }: { lang: Lang }) {
  const [activeImage, setActiveImage] = useState(0);
  const [activeFinish, setActiveFinish] = useState(0);
  const [activeTab, setActiveTab] = useState(0);
  const copy = ui[lang];

  return (
    <section className="product-detail" id="detail">
      <div className="breadcrumb">{copy.breadcrumbHome} / {categoryCopy["Living Room"][lang]} / <b>{copy.detailTitle}</b></div>
      <div className="detail-layout">
        <div className="detail-gallery">
          <img className="detail-main-image" src={`${A}${detailImages[activeImage]}`} alt="Nested round coffee tables" />
          <div className="detail-thumbs">
            {detailImages.map((image, index) => (
              <button className={index === activeImage ? "is-active" : ""} type="button" key={image} onClick={() => setActiveImage(index)}>
                <img src={`${A}${image}`} alt="" />
              </button>
            ))}
          </div>
        </div>
        <div className="detail-copy">
          <span>{copy.detailCollection}</span>
          <h2>{copy.detailTitle}</h2>
          <strong>€40 / set · {copy.logistics} €12.59</strong>
          <div className="detail-divider" />
          <div className="finish-picker">
            <p>{copy.sceneRender}: <b>{finishOptions[activeFinish].name}</b></p>
            <div>
              {finishOptions.map((finish, index) => (
                <button
                  aria-label={finish.name}
                  className={index === activeFinish ? "is-active" : ""}
                  key={finish.name}
                  style={{ background: finish.color }}
                  type="button"
                  onClick={() => {
                    setActiveFinish(index);
                    setActiveImage(index);
                  }}
                />
              ))}
            </div>
          </div>
          <div className="specs">
            <h3>{copy.specs}</h3>
            <p>• {productCopy["Nested Round Coffee Tables"][lang].spec}</p>
            <p>• {copy.detailSpecs}</p>
            <p>• {copy.negotiable}</p>
          </div>
          <span className="moq">{copy.source}</span>
          <div className="detail-actions">
            <a className="button gold" href="#quote">{copy.requestPricing}</a>
            <a className="button whatsapp" href={WHATSAPP_URL} target="_blank" rel="noreferrer">{copy.whatsappQuote}</a>
            <a className="button outline" href="/assets/excel/row-03-col-02.png" download>{copy.downloadImage}</a>
          </div>
        </div>
      </div>
      <div className="detail-tabs" role="tablist" aria-label="Product information">
        {copy.tabs.map((tab: string, index: number) => (
          <button className={index === activeTab ? "is-active" : ""} key={tab} role="tab" type="button" onClick={() => setActiveTab(index)}>
            {tab}
          </button>
        ))}
      </div>
      <div className="detail-tab-panel">
        <h3>{activeTab === 0 ? copy.detailPanelTitle : copy.tabs[activeTab]}</h3>
        <p>
          {activeTab === 0 ? copy.detailDescription : activeTab === 1 ? copy.detailSpecs : copy.detailShipping}
        </p>
      </div>
      <div className="related">
        <h2>{copy.related}</h2>
        <div className="product-row">
          {[
            listing[0],
            listing[3],
            listing[8],
          ].map((product) => <ProductCard product={product} lang={lang} key={product.name} />)}
        </div>
      </div>
    </section>
  );
}

function Faq({ lang }: { lang: Lang }) {
  const [open, setOpen] = useState(0);
  const copy = ui[lang];

  return (
    <section className="section faq">
      <div className="section-heading centered">
        <Eyebrow>{copy.faqEyebrow}</Eyebrow>
        <h2>{copy.faqTitle}</h2>
      </div>
      <div className="faq-list">
        {faqsByLang[lang].map((item, index) => (
          <div className={`faq-item ${open === index ? "is-open" : ""}`} key={item.q}>
            <button type="button" onClick={() => setOpen(open === index ? -1 : index)} aria-expanded={open === index}>
              <span>{item.q}</span>
              <b>+</b>
            </button>
            <p>{item.a}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Cta({ lang }: { lang: Lang }) {
  const [submitted, setSubmitted] = useState(false);
  const copy = ui[lang];

  return (
    <section className="cta" id="quote">
      <h2>{copy.ctaTitle}</h2>
      <p>{copy.ctaCopy}</p>
      <div className="inquiry-flow" aria-label="Inquiry flow">
        {copy.inquirySteps.map((step: string, index: number) => (
          <span key={step}><b>{index + 1}</b>{step}</span>
        ))}
      </div>
      <form
        className="quote-form"
        onSubmit={(event) => {
          event.preventDefault();
          const form = event.currentTarget;
          const data = new FormData(form);
          const body = [
            "Tessilo B2B inquiry",
            "",
            `Product: ${data.get("product") ?? ""}`,
            `Quantity: ${data.get("quantity") ?? ""}`,
            `Business email: ${data.get("email") ?? ""}`,
            "",
            `Project notes: ${data.get("message") ?? ""}`,
          ].join("\n");
          window.location.href = `mailto:${INQUIRY_EMAIL}?subject=${encodeURIComponent("Tessilo B2B Inquiry")}&body=${encodeURIComponent(body)}`;
          setSubmitted(true);
        }}
      >
        <select name="product" required defaultValue="" aria-label={copy.productPlaceholder}>
          <option value="" disabled>{copy.productPlaceholder}</option>
          {listing.map((product) => (
            <option value={product.name} key={product.name}>{productLabel(product, lang).name} · {product.price}</option>
          ))}
        </select>
        <input name="quantity" type="number" min="1" placeholder={copy.quantityPlaceholder} aria-label={copy.quantityPlaceholder} />
        <input name="email" type="email" required placeholder={copy.emailPlaceholder} aria-label="Business email" />
        <textarea name="message" placeholder={copy.messagePlaceholder} aria-label={copy.messagePlaceholder} rows={3} />
        <div className="quote-actions">
          <button className="button gold" type="submit">{submitted ? copy.submitted : copy.getStarted}</button>
          <a className="button whatsapp" href={WHATSAPP_URL} target="_blank" rel="noreferrer">{copy.whatsappQuote}</a>
        </div>
      </form>
      {submitted ? <p className="form-note">{copy.formNote}</p> : null}
    </section>
  );
}

function Footer({ lang }: { lang: Lang }) {
  const copy = ui[lang];

  return (
    <footer className="footer" id="contact">
      <div className="footer-main">
        <div className="footer-brand">
          <a className="brand" href="#">
            <img src={`${A}logo.png`} alt="" />
            <span>Tessilo</span>
          </a>
          <p>{copy.footerCopy}</p>
          <div className="socials" aria-label="Tessilo social media">
            {socialLinks.map((item) => (
              <a href={item.href} key={item.platform} target="_blank" rel="noreferrer" aria-label={item.platform}>
                {item.platform === "Instagram" ? "ig" : item.platform.slice(0, 2)}
              </a>
            ))}
          </div>
        </div>
        <FooterColumn title={copy.nav.products} items={["Sofa", "Coffee", "Chair", "Desk", "Cabinet"].map((item) => productTypeCopy[item][lang])} />
        <FooterColumn title={copy.company} items={[copy.aboutUs, copy.workflowTitle, "B2B Wholesale", copy.worldwide]} />
        <div className="footer-col social-column">
          <h3>{copy.socialContact}</h3>
          {socialLinks.map((item) => (
            <a href={item.href} key={item.platform} target="_blank" rel="noreferrer">
              <strong>{item.platform}</strong>
              <span>{item.handle}</span>
            </a>
          ))}
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2026 Tessilo Global Home. All rights reserved.</span>
        <span>{copy.privacy}</span>
      </div>
    </footer>
  );
}

function FooterColumn({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="footer-col">
      <h3>{title}</h3>
      {items.map((item) => <a href="#" key={item}>{item}</a>)}
    </div>
  );
}

function Eyebrow({ children, light = false }: { children: string; light?: boolean }) {
  return <p className={`eyebrow ${light ? "light" : ""}`}><span />{children}</p>;
}
