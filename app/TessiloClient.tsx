"use client";

import { useEffect, useMemo, useState } from "react";

const A = "/assets/";
const WHATSAPP_URL = "https://wa.me/18296874119?text=Hello%20Tessilo%2C%20I%20would%20like%20to%20request%20a%20B2B%20furniture%20quote.";

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
  note?: string;
};

type ProductDetailInfo = {
  images?: string[];
  scenes?: string[];
  description: Record<Lang, string>;
  specs: Record<Lang, string[]>;
  shipping: Record<Lang, string>;
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
    negotiable: "Negotiatable",
    viewDetails: "View Details",
    detailCollection: "Living Room Collection",
    detailTitle: "Nested Round Coffee Tables",
    sceneRender: "Scene Render",
    specs: "Specifications",
    source: "SOURCE: TESSILO PRODUCT EXCEL",
    requestPricing: "Request Pricing Quote",
    downloadImage: "Download Product Image",
    tabs: ["Description", "Specifications", "Shipping & Logistics"],
    detailPanelTitle: "Compact tables for premium living and hospitality spaces",
    detailDescription: "A nested coffee table set designed for flexible lounge styling, hotel suites, apartment living rooms, and small-space merchandising. Submit an inquiry and our team will provide B2B pricing based on quantity and destination.",
    detailSpecs: "Two round tables, white stone-look surface, slim black circular metal base, suitable for coordinated living-room and hospitality packages.",
    detailShipping: "Tessilo can quote consolidated shipping, destination-based logistics, and B2B quantity pricing after receiving your inquiry.",
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
    whatsappShort: "WhatsApp",
    inquirySteps: ["Choose a product", "Share quantity & destination", "Confirm by WhatsApp"],
    mailTitle: "Tessilo B2B inquiry",
    mailSubject: "Tessilo B2B Inquiry",
    mailProduct: "Product",
    mailQuantity: "Quantity",
    mailEmail: "Business email",
    mailNotes: "Project notes",
    b2bWholesale: "B2B Wholesale",
    reachStats: ["Countries", "Partners", "Years"],
    regions: ["North America", "European Union", "Middle East", "Southeast Asia"],
    submitted: "Submitted",
    getStarted: "Get Started",
    formNote: "Thanks — our contract team will follow up shortly.",
    formError: "Sorry, the inquiry could not be sent. Please try WhatsApp or contact us directly.",
    formErrorMissingFrom: "Email sender is not configured. Please add INQUIRY_FROM in Cloudflare.",
    formErrorResend: "Resend rejected the email. Please verify the sending domain and INQUIRY_FROM.",
    quoteOnly: "Request custom quote",
    footerCopy: "The Home of Comfort & Style. Global B2B leaders in premium contract furniture and architectural solutions.",
    company: "Company",
    socialContact: "Social & Contact",
    privacy: "Privacy Policy · Terms of Service · Cookie Settings",
    rights: "All rights reserved.",
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
    negotiable: "可议价",
    viewDetails: "查看详情",
    detailCollection: "客厅系列",
    detailTitle: "大小圆茶几",
    sceneRender: "场景渲染",
    specs: "规格",
    source: "来源：TESSILO 产品 Excel",
    requestPricing: "获取价格报价",
    downloadImage: "下载产品图",
    tabs: ["描述", "规格", "物流与运输"],
    detailPanelTitle: "适合高端客厅与酒店空间的灵活茶几组合",
    detailDescription: "大小圆茶几适合客厅、酒店套房、公寓与小空间陈列。提交询盘后，我们会根据数量和目的地提供 B2B 报价。",
    detailSpecs: "双圆桌组合，白色石纹台面，黑色金属圆形框架，适合整体客厅与酒店家具配套。",
    detailShipping: "Tessilo 可根据目的地、采购数量和合并运输方式提供物流与批发报价。",
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
    whatsappShort: "WhatsApp",
    inquirySteps: ["选择产品", "填写数量与目的地", "通过 WhatsApp 确认"],
    mailTitle: "Tessilo B2B 询盘",
    mailSubject: "Tessilo B2B 询盘",
    mailProduct: "产品",
    mailQuantity: "数量",
    mailEmail: "企业邮箱",
    mailNotes: "项目备注",
    b2bWholesale: "B2B 批发",
    reachStats: ["国家/地区", "合作伙伴", "行业经验"],
    regions: ["北美", "欧盟", "中东", "东南亚"],
    submitted: "已提交",
    getStarted: "开始咨询",
    formNote: "谢谢，我们的合同家具团队会尽快联系你。",
    formError: "抱歉，询盘暂时发送失败。请尝试 WhatsApp 或直接联系我们。",
    formErrorMissingFrom: "发件人未配置。请在 Cloudflare 添加 INQUIRY_FROM。",
    formErrorResend: "Resend 拒绝发送。请确认发件域名已验证，并且 INQUIRY_FROM 正确。",
    quoteOnly: "获取定制报价",
    footerCopy: "舒适与风格之家。面向全球 B2B 的高端合同家具与空间解决方案供应商。",
    company: "公司",
    socialContact: "社媒与联系",
    privacy: "隐私政策 · 服务条款 · Cookie 设置",
    rights: "保留所有权利。",
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
    negotiable: "Verhandelbar",
    viewDetails: "Details ansehen",
    detailCollection: "Wohnzimmerkollektion",
    detailTitle: "Runde Satztische",
    sceneRender: "Szenen-Rendering",
    specs: "Spezifikationen",
    source: "QUELLE: TESSILO PRODUKT-EXCEL",
    requestPricing: "Preisangebot anfragen",
    downloadImage: "Produktbild herunterladen",
    tabs: ["Beschreibung", "Spezifikationen", "Versand & Logistik"],
    detailPanelTitle: "Kompakte Tische für hochwertige Wohn- und Hospitality-Bereiche",
    detailDescription: "Ein Satztisch-Set für flexible Lounge-Gestaltung, Hotelsuiten, Apartments und kompakte Verkaufsflächen. Senden Sie eine Anfrage und unser Team erstellt ein B2B-Angebot nach Menge und Zielort.",
    detailSpecs: "Zwei runde Tische, weiße Steinoptik, schlankes schwarzes Metallgestell, geeignet für Wohn- und Hospitality-Pakete.",
    detailShipping: "Tessilo bietet nach Anfrage konsolidierten Versand, zielortbezogene Logistik und Mengenpreise.",
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
    whatsappShort: "WhatsApp",
    inquirySteps: ["Produkt wählen", "Menge & Zielort teilen", "Per WhatsApp bestätigen"],
    mailTitle: "Tessilo B2B-Anfrage",
    mailSubject: "Tessilo B2B-Anfrage",
    mailProduct: "Produkt",
    mailQuantity: "Menge",
    mailEmail: "Geschäftliche E-Mail",
    mailNotes: "Projektinfo",
    b2bWholesale: "B2B-Großhandel",
    reachStats: ["Länder", "Partner", "Jahre"],
    regions: ["Nordamerika", "Europäische Union", "Naher Osten", "Südostasien"],
    submitted: "Gesendet",
    getStarted: "Starten",
    formNote: "Danke — unser Vertragsteam meldet sich in Kürze.",
    formError: "Die Anfrage konnte nicht gesendet werden. Bitte versuchen Sie WhatsApp oder kontaktieren Sie uns direkt.",
    formErrorMissingFrom: "Absender ist nicht konfiguriert. Bitte INQUIRY_FROM in Cloudflare hinzufügen.",
    formErrorResend: "Resend hat die E-Mail abgelehnt. Bitte Domain und INQUIRY_FROM prüfen.",
    quoteOnly: "Individuelles Angebot anfragen",
    footerCopy: "Zuhause für Komfort und Stil. Globale B2B-Experten für Premium-Vertragsmöbel und architektonische Lösungen.",
    company: "Unternehmen",
    socialContact: "Social & Kontakt",
    privacy: "Datenschutz · Nutzungsbedingungen · Cookie-Einstellungen",
    rights: "Alle Rechte vorbehalten.",
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
    negotiable: "Négociable",
    viewDetails: "Voir les détails",
    detailCollection: "Collection salon",
    detailTitle: "Tables basses rondes gigognes",
    sceneRender: "Rendu de scène",
    specs: "Spécifications",
    source: "SOURCE : EXCEL PRODUITS TESSILO",
    requestPricing: "Demander un prix",
    downloadImage: "Télécharger l'image produit",
    tabs: ["Description", "Spécifications", "Expédition & logistique"],
    detailPanelTitle: "Tables compactes pour espaces résidentiels et hôteliers premium",
    detailDescription: "Un ensemble de tables gigognes pour salons, suites hôtelières, appartements et petits espaces. Envoyez une demande et notre équipe fournira un devis B2B selon la quantité et la destination.",
    detailSpecs: "Deux tables rondes, plateau effet pierre blanche, structure circulaire en métal noir, adaptées aux projets résidentiels et hôteliers.",
    detailShipping: "Tessilo peut proposer transport consolidé, logistique selon destination et prix B2B après réception de votre demande.",
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
    whatsappShort: "WhatsApp",
    inquirySteps: ["Choisir un produit", "Partager quantité & destination", "Confirmer par WhatsApp"],
    mailTitle: "Demande B2B Tessilo",
    mailSubject: "Demande B2B Tessilo",
    mailProduct: "Produit",
    mailQuantity: "Quantité",
    mailEmail: "E-mail professionnel",
    mailNotes: "Notes projet",
    b2bWholesale: "Vente B2B",
    reachStats: ["Pays", "Partenaires", "Années"],
    regions: ["Amérique du Nord", "Union européenne", "Moyen-Orient", "Asie du Sud-Est"],
    submitted: "Envoyé",
    getStarted: "Commencer",
    formNote: "Merci — notre équipe contract vous contactera rapidement.",
    formError: "La demande n'a pas pu être envoyée. Essayez WhatsApp ou contactez-nous directement.",
    formErrorMissingFrom: "L'expéditeur n'est pas configuré. Ajoutez INQUIRY_FROM dans Cloudflare.",
    formErrorResend: "Resend a refusé l'e-mail. Vérifiez le domaine d'envoi et INQUIRY_FROM.",
    quoteOnly: "Demander un devis personnalisé",
    footerCopy: "La maison du confort et du style. Expert B2B mondial du mobilier contract premium et des solutions architecturales.",
    company: "Entreprise",
    socialContact: "Réseaux & contact",
    privacy: "Confidentialité · Conditions d'utilisation · Paramètres des cookies",
    rights: "Tous droits réservés.",
  },
} satisfies Record<Lang, Record<string, any>>;

const categories = [
  {
    key: "office",
    image: "category-office.png",
  },
  {
    key: "hospitality",
    image: "category-hospitality.png",
  },
  {
    key: "residential",
    image: "category-residential.png",
  },
  {
    key: "custom",
    image: "category-custom.png",
  },
];

const categoryCards: Record<string, Record<Lang, { title: string; copy: string }>> = {
  office: {
    en: { title: "Office Furniture", copy: "Bespoke excellence for executive suites and collaborative workspaces." },
    zh: { title: "办公家具", copy: "服务高管办公室与协作空间的定制化家具方案。" },
    de: { title: "Büromöbel", copy: "Maßgeschneiderte Qualität für Executive Suites und kollaborative Arbeitsbereiche." },
    fr: { title: "Mobilier de bureau", copy: "Excellence sur mesure pour bureaux de direction et espaces collaboratifs." },
  },
  hospitality: {
    en: { title: "Hospitality Furniture", copy: "Contract-grade comfort for hotels, restaurants, lounges and clubs." },
    zh: { title: "酒店与商业家具", copy: "适用于酒店、餐厅、休闲区与会所的合同级舒适体验。" },
    de: { title: "Hospitality-Möbel", copy: "Vertragsqualität für Hotels, Restaurants, Lounges und Clubs." },
    fr: { title: "Mobilier hospitality", copy: "Confort contractuel pour hôtels, restaurants, lounges et clubs." },
  },
  residential: {
    en: { title: "Residential Collections", copy: "Refined silhouettes for premium developments and private villas." },
    zh: { title: "住宅系列", copy: "为高端住宅项目与私人别墅打造精致轮廓。" },
    de: { title: "Wohnkollektionen", copy: "Raffinierte Silhouetten für Premium-Entwicklungen und private Villen." },
    fr: { title: "Collections résidentielles", copy: "Silhouettes raffinées pour programmes premium et villas privées." },
  },
  custom: {
    en: { title: "Custom Solutions", copy: "Made-to-spec programs for architects, developers and procurement teams." },
    zh: { title: "定制方案", copy: "面向建筑师、开发商与采购团队的按需定制项目。" },
    de: { title: "Individuelle Lösungen", copy: "Spezifikationsgenaue Programme für Architekten, Entwickler und Einkaufsteams." },
    fr: { title: "Solutions sur mesure", copy: "Programmes personnalisés pour architectes, promoteurs et équipes achats." },
  },
};

const featured: Product[] = [
  {
    name: "Storage Corner Sofa",
    spec: "2.45m corner sofa with storage",
    image: "excel/row-02-col-02.png",
    category: "Living Room",
  },
  {
    name: "Nested Round Coffee Tables",
    spec: "Large + small round coffee table set",
    image: "excel/coffee-table-scene-living.jpg",
    category: "Living Room",
    note: "Negotiable",
  },
  {
    name: "L-Shaped Office Desk",
    spec: "Corner workstation desk",
    image: "excel/row-09-col-02.png",
    category: "Office",
  },
];

const listing: Product[] = [
  ...featured,
  {
    name: "Low TV Cabinet",
    spec: "1.7m TV cabinet",
    image: "excel/row-04-col-02.png",
    category: "Living Room",
    note: "Negotiable",
  },
  {
    name: "Leather Dining Chairs",
    spec: "Two leather dining chairs",
    image: "excel/row-05-col-02.png",
    category: "Dining",
  },
  {
    name: "Swivel Office Chair",
    spec: "Rotating office chair",
    image: "excel/row-06-col-02.png",
    category: "Office",
  },
  {
    name: "One-Drawer Nightstand",
    spec: "Compact bedside cabinet",
    image: "excel/row-07-col-02.png",
    category: "Bedroom",
  },
  {
    name: "Solid Wood Chest",
    spec: "Full solid wood drawer cabinet",
    image: "excel/row-08-col-02.png",
    category: "Storage",
  },
  {
    name: "Fabric Sofa Bed",
    spec: "1.6m fabric sofa bed",
    image: "excel/row-10-col-02.png",
    category: "Living Room",
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
  ["50+", "countries"],
  ["15+", "years"],
  ["10k+", "products"],
  ["500+", "partners"],
];

const statsCopy: Record<string, Record<Lang, { label: string; copy: string }>> = {
  countries: {
    en: { label: "Countries", copy: "Global shipping & logistics network." },
    zh: { label: "国家/地区", copy: "覆盖全球的运输与物流网络。" },
    de: { label: "Länder", copy: "Globales Versand- und Logistiknetzwerk." },
    fr: { label: "Pays", copy: "Réseau mondial d'expédition et de logistique." },
  },
  years: {
    en: { label: "Years", copy: "Of industry-leading furniture expertise." },
    zh: { label: "年经验", copy: "深耕家具供应与项目交付。" },
    de: { label: "Jahre", copy: "Branchenerfahrung im Möbelbereich." },
    fr: { label: "Années", copy: "D'expertise dans le mobilier professionnel." },
  },
  products: {
    en: { label: "Products", copy: "Extensive catalog of ready designs." },
    zh: { label: "产品", copy: "丰富的现货与可选设计目录。" },
    de: { label: "Produkte", copy: "Umfangreicher Katalog fertiger Designs." },
    fr: { label: "Produits", copy: "Large catalogue de modèles disponibles." },
  },
  partners: {
    en: { label: "Partners", copy: "Active B2B global partnerships." },
    zh: { label: "合作伙伴", copy: "持续服务全球 B2B 合作网络。" },
    de: { label: "Partner", copy: "Aktive globale B2B-Partnerschaften." },
    fr: { label: "Partenaires", copy: "Partenariats B2B actifs à l'international." },
  },
};

const steps = [
  ["01", "consultation"],
  ["02", "design"],
  ["03", "manufacturing"],
  ["04", "delivery"],
];

const stepsCopy: Record<string, Record<Lang, { title: string; copy: string }>> = {
  consultation: {
    en: { title: "Consultation", copy: "Understanding your spatial requirements and project scope." },
    zh: { title: "需求沟通", copy: "了解空间需求、采购数量与项目范围。" },
    de: { title: "Beratung", copy: "Wir verstehen Raumanforderungen und Projektumfang." },
    fr: { title: "Consultation", copy: "Comprendre vos besoins d'espace et le périmètre du projet." },
  },
  design: {
    en: { title: "Custom Design", copy: "Bespoke engineering and aesthetic selection by our studio." },
    zh: { title: "定制设计", copy: "提供结构、饰面与风格建议。" },
    de: { title: "Individuelles Design", copy: "Maßgeschneiderte Technik und ästhetische Auswahl durch unser Studio." },
    fr: { title: "Design sur mesure", copy: "Ingénierie personnalisée et sélection esthétique par notre studio." },
  },
  manufacturing: {
    en: { title: "Manufacturing", copy: "Precision fabrication at our global facility hubs." },
    zh: { title: "生产制造", copy: "按项目规格完成生产、质检与包装。" },
    de: { title: "Fertigung", copy: "Präzise Herstellung in unseren Produktionszentren." },
    fr: { title: "Fabrication", copy: "Production précise dans nos pôles de fabrication." },
  },
  delivery: {
    en: { title: "Global Delivery", copy: "Seamless logistics to any continent with white-glove service." },
    zh: { title: "全球交付", copy: "支持合并运输、清关资料与项目交付安排。" },
    de: { title: "Globale Lieferung", copy: "Reibungslose Logistik auf jeden Kontinent." },
    fr: { title: "Livraison mondiale", copy: "Logistique fluide vers tous les continents." },
  },
};

const detailImages = [
  "excel/coffee-table-scene-living.jpg",
  "excel/row-03-col-02.png",
  "excel/coffee-table-scene-hotel.jpg",
  "excel/coffee-table-scene-reception.jpg",
];

const finishOptions = [
  { key: "living", color: "#c9a96e" },
  { key: "original", color: "#f7f7f2" },
  { key: "hotel", color: "#6b5746" },
  { key: "reception", color: "#1b2a4a" },
];

const sceneCopy: Record<string, Record<Lang, string>> = {
  living: { en: "Living Room", zh: "客厅场景", de: "Wohnzimmer", fr: "Salon" },
  original: { en: "Original Product", zh: "原始产品图", de: "Originalprodukt", fr: "Produit original" },
  hotel: { en: "Hotel Suite", zh: "酒店套房", de: "Hotelsuite", fr: "Suite hôtelière" },
  reception: { en: "Reception Lounge", zh: "接待休闲区", de: "Empfangslounge", fr: "Salon d'accueil" },
};

const standardShipping: Record<Lang, string> = {
  en: "Tessilo can quote consolidated shipping, destination-based logistics, export packaging, and B2B quantity pricing after receiving your inquiry.",
  zh: "Tessilo 可根据目的地、采购数量、出口包装和合并运输方式提供物流与批发报价。",
  de: "Tessilo bietet nach Ihrer Anfrage konsolidierten Versand, zielortbezogene Logistik, Exportverpackung und Mengenpreise.",
  fr: "Tessilo peut proposer transport consolidé, logistique selon destination, emballage export et prix B2B après réception de votre demande.",
};

const productDetails: Record<string, ProductDetailInfo> = {
  "Storage Corner Sofa": {
    description: {
      en: "A storage corner sofa for apartments, serviced residences, lounges, and show flats where comfort and hidden utility both matter.",
      zh: "适合公寓、服务式住宅、休闲区与样板间的储物转角沙发，兼顾舒适坐感与隐藏收纳。",
      de: "Ein Ecksofa mit Stauraum für Apartments, Serviced Residences, Lounges und Musterwohnungen.",
      fr: "Un canapé d'angle avec rangement pour appartements, résidences hôtelières, lounges et appartements témoins.",
    },
    specs: {
      en: ["2.45m corner format", "Integrated storage function", "Suitable for living-room and hospitality packages"],
      zh: ["2.45 米转角规格", "内置储物功能", "适合客厅与酒店家具配套"],
      de: ["2,45 m Eckformat", "Integrierte Stauraumfunktion", "Geeignet für Wohn- und Hospitality-Pakete"],
      fr: ["Format d'angle 2,45 m", "Rangement intégré", "Adapté aux ensembles salon et hôtellerie"],
    },
    shipping: standardShipping,
  },
  "Nested Round Coffee Tables": {
    images: detailImages,
    scenes: ["living", "original", "hotel", "reception"],
    description: {
      en: "A nested coffee table set designed for flexible lounge styling, hotel suites, apartment living rooms, and small-space merchandising.",
      zh: "大小圆茶几适合客厅、酒店套房、公寓与小空间陈列，可灵活组合陈设。",
      de: "Ein Satztisch-Set für flexible Lounge-Gestaltung, Hotelsuiten, Apartments und kompakte Verkaufsflächen.",
      fr: "Un ensemble de tables gigognes pour salons, suites hôtelières, appartements et petits espaces.",
    },
    specs: {
      en: ["Large + small round coffee table set", "White stone-look surface", "Slim black circular metal base"],
      zh: ["大小圆茶几组合", "白色石纹台面", "黑色金属圆形框架"],
      de: ["Großes + kleines rundes Couchtisch-Set", "Weiße Steinoptik", "Schlankes schwarzes Rundmetallgestell"],
      fr: ["Ensemble grande + petite table basse ronde", "Plateau effet pierre blanche", "Structure circulaire en métal noir"],
    },
    shipping: standardShipping,
  },
  "L-Shaped Office Desk": {
    description: {
      en: "A corner workstation desk for executive offices, procurement-led office fit-outs, and compact team workspaces.",
      zh: "适用于高管办公室、办公空间批量采购与紧凑团队工位的 L 型转角办公桌。",
      de: "Ein Eck-Arbeitstisch für Executive Offices, Büroausstattungen und kompakte Teamarbeitsplätze.",
      fr: "Un bureau d'angle pour bureaux de direction, aménagements professionnels et espaces d'équipe compacts.",
    },
    specs: {
      en: ["L-shaped corner workstation", "Optimized desktop area", "Works for office and commercial projects"],
      zh: ["L 型转角工位", "优化桌面使用面积", "适合办公与商业项目"],
      de: ["L-förmiger Eck-Arbeitsplatz", "Optimierte Arbeitsfläche", "Für Büro- und Gewerbeprojekte"],
      fr: ["Poste de travail d'angle en L", "Surface de travail optimisée", "Pour projets bureau et commerciaux"],
    },
    shipping: standardShipping,
  },
  "Low TV Cabinet": {
    description: {
      en: "A low TV cabinet for residential developments, hotel suites, serviced apartments, and coordinated living-room packages.",
      zh: "适合住宅项目、酒店套房、服务式公寓与客厅整体配套的低位电视柜。",
      de: "Ein Lowboard für Wohnprojekte, Hotelsuiten, Serviced Apartments und abgestimmte Wohnzimmerpakete.",
      fr: "Un meuble TV bas pour programmes résidentiels, suites hôtelières, appart'hôtels et ensembles salon.",
    },
    specs: {
      en: ["1.7m low TV cabinet", "Clean storage silhouette", "Designed for coordinated room packages"],
      zh: ["1.7 米低位电视柜", "简洁收纳轮廓", "适合整体空间配套"],
      de: ["1,7 m Lowboard", "Klare Stauraum-Silhouette", "Für abgestimmte Raumpakete"],
      fr: ["Meuble TV bas 1,7 m", "Silhouette de rangement épurée", "Conçu pour ensembles coordonnés"],
    },
    shipping: standardShipping,
  },
  "Leather Dining Chairs": {
    description: {
      en: "A pair of leather dining chairs for restaurants, apartments, villas, and hospitality dining areas.",
      zh: "适合餐厅、公寓、别墅与酒店用餐区的皮质餐椅组合。",
      de: "Ein Paar Leder-Esszimmerstühle für Restaurants, Apartments, Villen und Hospitality-Essbereiche.",
      fr: "Une paire de chaises en cuir pour restaurants, appartements, villas et espaces repas hôteliers.",
    },
    specs: {
      en: ["Two leather dining chairs", "Contract-friendly seating format", "Suitable for dining and hospitality projects"],
      zh: ["两把皮质餐椅", "适合项目采购的座椅规格", "用于餐厅与酒店项目"],
      de: ["Zwei Leder-Esszimmerstühle", "Projektgeeignetes Sitzformat", "Für Dining- und Hospitality-Projekte"],
      fr: ["Deux chaises de salle à manger en cuir", "Format adapté aux projets", "Pour restauration et hôtellerie"],
    },
    shipping: standardShipping,
  },
  "Swivel Office Chair": {
    description: {
      en: "A rotating office chair for commercial offices, meeting spaces, executive rooms, and project-based procurement.",
      zh: "适合商业办公室、会议空间、高管办公室与项目采购的旋转办公椅。",
      de: "Ein drehbarer Bürostuhl für Gewerbebüros, Meetingräume, Executive Rooms und Projektbeschaffung.",
      fr: "Une chaise de bureau pivotante pour bureaux commerciaux, salles de réunion, directions et achats projet.",
    },
    specs: {
      en: ["Rotating office chair", "Comfortable task seating", "Suitable for office and commercial fit-outs"],
      zh: ["旋转办公椅", "舒适办公坐感", "适合办公与商业空间配套"],
      de: ["Drehbarer Bürostuhl", "Komfortabler Arbeitssitz", "Für Büro- und Gewerbeausstattung"],
      fr: ["Chaise de bureau rotative", "Assise de travail confortable", "Pour aménagements de bureaux et commerces"],
    },
    shipping: standardShipping,
  },
  "One-Drawer Nightstand": {
    description: {
      en: "A compact one-drawer nightstand for bedrooms, hotel rooms, serviced apartments, and residential furniture packages.",
      zh: "适合卧室、酒店客房、服务式公寓与住宅家具配套的一抽床头柜。",
      de: "Ein kompakter Nachttisch mit Schublade für Schlafzimmer, Hotelzimmer, Serviced Apartments und Wohnpakete.",
      fr: "Une table de chevet compacte à un tiroir pour chambres, hôtels, appart'hôtels et ensembles résidentiels.",
    },
    specs: {
      en: ["Compact bedside cabinet", "One-drawer storage", "Ideal for bedrooms and hospitality rooms"],
      zh: ["紧凑床头柜", "一抽收纳", "适合卧室与酒店客房"],
      de: ["Kompakter Nachtschrank", "Eine Schublade", "Ideal für Schlafzimmer und Hotelzimmer"],
      fr: ["Chevet compact", "Rangement à un tiroir", "Idéal pour chambres et hôtels"],
    },
    shipping: standardShipping,
  },
  "Solid Wood Chest": {
    description: {
      en: "A full solid wood drawer chest for premium storage, bedroom projects, villas, and boutique hospitality interiors.",
      zh: "适合高端收纳、卧室项目、别墅与精品酒店空间的全实木斗柜。",
      de: "Eine Massivholz-Kommode für hochwertige Aufbewahrung, Schlafzimmerprojekte, Villen und Boutique-Hospitality.",
      fr: "Une commode en bois massif pour rangement premium, chambres, villas et intérieurs hôteliers boutique.",
    },
    specs: {
      en: ["Full solid wood drawer cabinet", "Durable storage construction", "For bedroom and storage packages"],
      zh: ["全实木抽屉柜", "稳定耐用的收纳结构", "适合卧室与收纳配套"],
      de: ["Schubladenschrank aus Massivholz", "Robuste Stauraumkonstruktion", "Für Schlafzimmer- und Stauraumpakete"],
      fr: ["Commode à tiroirs en bois massif", "Construction de rangement durable", "Pour ensembles chambre et rangement"],
    },
    shipping: standardShipping,
  },
  "Fabric Sofa Bed": {
    description: {
      en: "A fabric sofa bed for flexible residential, apartment, guest-room, and hospitality spaces that need dual-use comfort.",
      zh: "适合住宅、公寓、客房与酒店空间的布艺沙发床，满足坐卧两用需求。",
      de: "Ein Stoff-Schlafsofa für flexible Wohn-, Apartment-, Gästezimmer- und Hospitality-Bereiche.",
      fr: "Un canapé-lit en tissu pour espaces résidentiels, appartements, chambres d'amis et hôtellerie.",
    },
    specs: {
      en: ["1.6m fabric sofa bed", "Dual sofa and sleeping function", "Suitable for compact hospitality and apartment rooms"],
      zh: ["1.6 米布艺沙发床", "坐卧两用功能", "适合紧凑酒店与公寓空间"],
      de: ["1,6 m Stoff-Schlafsofa", "Sofa- und Schlaffunktion", "Für kompakte Hotel- und Apartmentzimmer"],
      fr: ["Canapé-lit tissu 1,6 m", "Fonction canapé et couchage", "Pour chambres compactes hôtelières et appartements"],
    },
    shipping: standardShipping,
  },
};

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

const quoteCopy: Record<Lang, { quote: string; people: { img: string; name: string; role: string }[] }> = {
  en: {
    quote: "Tessilo redefined our executive suites. Their ability to handle massive volume without sacrificing the fine details of custom upholstery is unmatched in the industry.",
    people: [
      { img: "avatar-voss.png", name: "Alexander Voss", role: "Principal, Voss Architect Studio" },
      { img: "avatar-park.png", name: "Julianne Park", role: "Director of Operations, Grand Hyatt Group" },
    ],
  },
  zh: {
    quote: "Tessilo 让我们的高端办公套间焕然一新。他们在大批量交付中依然能保持定制软装细节，这一点非常难得。",
    people: [
      { img: "avatar-voss.png", name: "Alexander Voss", role: "Voss 建筑事务所负责人" },
      { img: "avatar-park.png", name: "Julianne Park", role: "Grand Hyatt 集团运营总监" },
    ],
  },
  de: {
    quote: "Tessilo hat unsere Executive Suites neu definiert. Große Mengen ohne Verlust feiner Polsterdetails zu liefern, ist in der Branche selten.",
    people: [
      { img: "avatar-voss.png", name: "Alexander Voss", role: "Inhaber, Voss Architect Studio" },
      { img: "avatar-park.png", name: "Julianne Park", role: "Operations Director, Grand Hyatt Group" },
    ],
  },
  fr: {
    quote: "Tessilo a transformé nos suites de direction. Leur capacité à livrer de gros volumes sans perdre les détails du sur-mesure est remarquable.",
    people: [
      { img: "avatar-voss.png", name: "Alexander Voss", role: "Fondateur, Voss Architect Studio" },
      { img: "avatar-park.png", name: "Julianne Park", role: "Directrice des opérations, Grand Hyatt Group" },
    ],
  },
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
  const [selectedProductName, setSelectedProductName] = useState(listing[1].name);
  const selectedProduct = listing.find((product) => product.name === selectedProductName) ?? listing[1];

  const selectProduct = (product: Product) => {
    setSelectedProductName(product.name);
  };

  return (
    <>
      <Header lang={lang} setLang={setLang} />
      <main>
        <Hero lang={lang} />
        <Categories lang={lang} />
        <Advantage lang={lang} />
        <Featured lang={lang} onSelectProduct={selectProduct} />
        <Process lang={lang} />
        <Testimonials lang={lang} />
        <GlobalReach lang={lang} />
        <ProductListing lang={lang} onSelectProduct={selectProduct} />
        <ProductDetail lang={lang} product={selectedProduct} onSelectProduct={selectProduct} />
        <Faq lang={lang} />
        <Cta lang={lang} selectedProduct={selectedProduct} />
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
          <article className="category-card" key={item.key}>
            <img src={`${A}${item.image}`} alt="" />
            <div>
              <h3>{categoryCards[item.key][lang].title}</h3>
              <p>{categoryCards[item.key][lang].copy}</p>
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
        {stats.map(([number, key]) => (
          <article className="stat-card" key={key}>
            <strong>{number}</strong>
            <h3>{statsCopy[key][lang].label}</h3>
            <p>{statsCopy[key][lang].copy}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function Featured({ lang, onSelectProduct }: { lang: Lang; onSelectProduct: (product: Product) => void }) {
  const copy = ui[lang];

  return (
    <section className="section" id="products">
      <div className="section-heading centered">
        <Eyebrow>{copy.signatureEyebrow}</Eyebrow>
        <h2>{copy.signatureTitle}</h2>
      </div>
      <div className="product-row">
        {featured.map((product) => (
          <ProductCard product={product} lang={lang} key={product.name} onSelectProduct={onSelectProduct} />
        ))}
      </div>
    </section>
  );
}

function productLabel(product: Product, lang: Lang) {
  return productCopy[product.name]?.[lang] ?? { name: product.name, spec: product.spec, category: product.category };
}

function ProductCard({ product, lang, onSelectProduct }: { product: Product; lang: Lang; onSelectProduct: (product: Product) => void }) {
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
        {product.note ? <strong className="negotiable-badge">{copy.negotiable}</strong> : null}
      </div>
      <div className="product-action">
        <a className="button outline" href="#detail" onClick={() => onSelectProduct(product)}>{copy.viewDetails}</a>
        <a className="button gold" href="#quote" onClick={() => onSelectProduct(product)}>{copy.requestQuote}</a>
        <a className="whatsapp-mini" href={WHATSAPP_URL} target="_blank" rel="noreferrer">{copy.whatsappShort}</a>
      </div>
    </article>
  );
}

function Process({ lang }: { lang: Lang }) {
  const copy = ui[lang];

  return (
    <section className="section muted process" id="process">
      <div className="section-heading">
        <Eyebrow>{copy.workflowEyebrow}</Eyebrow>
        <h2>{copy.workflowTitle}</h2>
      </div>
      <div className="step-grid">
        {steps.map(([num, key]) => (
          <article className="step" key={num}>
            <div><strong>{num}</strong><span /></div>
            <h3>{stepsCopy[key][lang].title}</h3>
            <p>{stepsCopy[key][lang].copy}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function Testimonials({ lang }: { lang: Lang }) {
  const testimonials = quoteCopy[lang];

  return (
    <section className="section testimonials">
      <Eyebrow>{ui[lang].testimonials}</Eyebrow>
      <div className="testimonial-grid">
        {testimonials.people.map((person) => (
          <Quote key={person.name} img={person.img} name={person.name} role={person.role} quote={testimonials.quote} />
        ))}
      </div>
    </section>
  );
}

function Quote({ img, name, role, quote }: { img: string; name: string; role: string; quote: string }) {
  return (
    <article className="quote-card">
      <p>“{quote}”</p>
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
    <section className="global-reach" id="logistics">
      <div className="reach-card">
        <Eyebrow>{copy.worldwide}</Eyebrow>
        <h2>{copy.reachTitle}</h2>
        <p>{copy.reachCopy}</p>
        <div className="reach-stats">
          <strong>50+<span>{copy.reachStats[0]}</span></strong>
          <strong>500+<span>{copy.reachStats[1]}</span></strong>
          <strong>15+<span>{copy.reachStats[2]}</span></strong>
        </div>
        <div className="regions">
          {copy.regions.map((region: string) => (
            <span key={region}>{region}</span>
          ))}
        </div>
        <a className="button pill" href="#contact">{copy.exploreReach}</a>
      </div>
    </section>
  );
}

function ProductListing({ lang, onSelectProduct }: { lang: Lang; onSelectProduct: (product: Product) => void }) {
  const [activeCategories, setActiveCategories] = useState<string[]>([]);
  const [activeMaterials, setActiveMaterials] = useState<string[]>([]);
  const copy = ui[lang];

  const visibleProducts = useMemo(() => {
    return listing.filter((product) => {
      const categoryMatch = activeCategories.length === 0 || activeCategories.includes(product.category ?? "");
      const localized = productLabel(product, lang);
      const searchable = `${product.spec} ${product.name} ${localized.spec} ${localized.name}`.toLowerCase();
      const materialMatch = activeMaterials.length === 0 || activeMaterials.some((material) => {
        return productSearchTerms[material].some((term) => searchable.includes(term.toLowerCase()));
      });
      return categoryMatch && materialMatch;
    });
  }, [activeCategories, activeMaterials, lang]);

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
        </aside>
        <div className="listing-grid">
          {visibleProducts.map((product) => <ProductCard product={product} lang={lang} key={product.name} onSelectProduct={onSelectProduct} />)}
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

function ProductDetail({ lang, product, onSelectProduct }: { lang: Lang; product: Product; onSelectProduct: (product: Product) => void }) {
  const [activeImage, setActiveImage] = useState(0);
  const [activeFinish, setActiveFinish] = useState(0);
  const [activeTab, setActiveTab] = useState(0);
  const copy = ui[lang];
  const label = productLabel(product, lang);
  const detail = productDetails[product.name];
  const galleryImages = detail?.images ?? [product.image];
  const sceneKeys = detail?.scenes ?? ["original"];
  const sceneKey = sceneKeys[Math.min(activeFinish, sceneKeys.length - 1)] ?? "original";
  const categoryLabel = categoryCopy[product.category]?.[lang] ?? product.category;
  const description = detail?.description[lang] ?? copy.detailDescription;
  const specs = detail?.specs[lang] ?? [label.spec, copy.detailSpecs];
  const shipping = detail?.shipping[lang] ?? copy.detailShipping;

  useEffect(() => {
    setActiveImage(0);
    setActiveFinish(0);
    setActiveTab(0);
  }, [product.name]);

  return (
    <section className="product-detail" id="detail">
      <div className="breadcrumb">{copy.breadcrumbHome} / {categoryLabel} / <b>{label.name}</b></div>
      <div className="detail-layout">
        <div className="detail-gallery">
          <img className="detail-main-image" src={`${A}${galleryImages[Math.min(activeImage, galleryImages.length - 1)]}`} alt={label.name} />
          <div className="detail-thumbs">
            {galleryImages.map((image, index) => (
              <button className={index === activeImage ? "is-active" : ""} type="button" key={image} onClick={() => setActiveImage(index)}>
                <img src={`${A}${image}`} alt="" />
              </button>
            ))}
          </div>
        </div>
        <div className="detail-copy">
          <span>{categoryLabel} {copy.collections}</span>
          <h2>{label.name}</h2>
          <strong>{copy.quoteOnly}</strong>
          <div className="detail-divider" />
          <div className="finish-picker">
            <p>{copy.sceneRender}: <b>{sceneCopy[sceneKey][lang]}</b></p>
            <div>
              {sceneKeys.map((key, index) => (
                <button
                  aria-label={sceneCopy[key][lang]}
                  className={index === activeFinish ? "is-active" : ""}
                  key={key}
                  style={{ background: finishOptions.find((finish) => finish.key === key)?.color ?? "#f7f7f2" }}
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
            {specs.map((spec) => <p key={spec}>• {spec}</p>)}
            {product.note ? <p>• {copy.negotiable}</p> : null}
          </div>
          <span className="moq">{copy.source}</span>
          <div className="detail-actions">
            <a className="button gold" href="#quote" onClick={() => onSelectProduct(product)}>{copy.requestPricing}</a>
            <a className="button whatsapp" href={WHATSAPP_URL} target="_blank" rel="noreferrer">{copy.whatsappQuote}</a>
            <a className="button outline" href={`${A}${product.image}`} download>{copy.downloadImage}</a>
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
        <h3>{activeTab === 0 ? label.name : copy.tabs[activeTab]}</h3>
        <p>
          {activeTab === 0 ? description : activeTab === 1 ? specs.join(" · ") : shipping}
        </p>
      </div>
      <div className="related">
        <h2>{copy.related}</h2>
        <div className="product-row">
          {listing
            .filter((item) => item.name !== product.name)
            .slice(0, 3)
            .map((relatedProduct) => <ProductCard product={relatedProduct} lang={lang} key={relatedProduct.name} onSelectProduct={onSelectProduct} />)}
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

function Cta({ lang, selectedProduct }: { lang: Lang; selectedProduct: Product }) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errorCode, setErrorCode] = useState<string>("");
  const [selectedFormProduct, setSelectedFormProduct] = useState(selectedProduct.name);
  const copy = ui[lang];
  const errorMessage = errorCode === "missing_inquiry_from"
    ? copy.formErrorMissingFrom
    : errorCode === "resend_send_failed"
      ? copy.formErrorResend
      : copy.formError;

  useEffect(() => {
    setSelectedFormProduct(selectedProduct.name);
  }, [selectedProduct.name]);

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
        onSubmit={async (event) => {
          event.preventDefault();
          const form = event.currentTarget;
          const data = new FormData(form);
          setStatus("sending");
          setErrorCode("");
          try {
            const response = await fetch("/api/inquiry", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                product: selectedFormProduct,
                quantity: data.get("quantity") ?? "",
                email: data.get("email") ?? "",
                message: data.get("message") ?? "",
                language: lang,
              }),
            });

            if (!response.ok) {
              const result = await response.json().catch(() => null);
              setErrorCode(result?.error ?? "");
              throw new Error("Inquiry request failed");
            }

            setStatus("sent");
            form.reset();
          } catch {
            setStatus("error");
          }
        }}
      >
        <select
          name="product"
          required
          value={selectedFormProduct}
          aria-label={copy.productPlaceholder}
          onChange={(event) => setSelectedFormProduct(event.target.value)}
        >
          <option value="" disabled>{copy.productPlaceholder}</option>
          {listing.map((product) => (
            <option value={product.name} key={product.name}>{productLabel(product, lang).name}</option>
          ))}
        </select>
        <input name="quantity" type="number" min="1" placeholder={copy.quantityPlaceholder} aria-label={copy.quantityPlaceholder} />
        <input name="email" type="email" required placeholder={copy.emailPlaceholder} aria-label={copy.mailEmail} />
        <textarea name="message" placeholder={copy.messagePlaceholder} aria-label={copy.messagePlaceholder} rows={3} />
        <div className="quote-actions">
          <button className="button gold" type="submit" disabled={status === "sending"}>
            {status === "sent" ? copy.submitted : status === "sending" ? "..." : copy.getStarted}
          </button>
          <a className="button whatsapp" href={WHATSAPP_URL} target="_blank" rel="noreferrer">{copy.whatsappQuote}</a>
        </div>
      </form>
      {status === "sent" ? <p className="form-note">{copy.formNote}</p> : null}
      {status === "error" ? <p className="form-note error">{errorMessage}</p> : null}
    </section>
  );
}

function Footer({ lang }: { lang: Lang }) {
  const copy = ui[lang];
  const productFooterLinks = ["Sofa", "Coffee", "Chair", "Desk", "Cabinet"].map((item) => ({
    label: productTypeCopy[item][lang],
    href: "#products",
  }));
  const companyFooterLinks = [
    { label: copy.aboutUs, href: "#about" },
    { label: copy.workflowTitle, href: "#process" },
    { label: copy.b2bWholesale, href: "#quote" },
    { label: copy.worldwide, href: "#logistics" },
  ];

  return (
    <footer className="footer" id="contact">
      <div className="footer-main">
        <div className="footer-brand">
          <a className="brand" href="#">
            <img src={`${A}logo.png`} alt="" />
            <span>Tessilo</span>
          </a>
          <p>{copy.footerCopy}</p>
          <div className="socials" aria-label={copy.socialContact}>
            {socialLinks.map((item) => (
              <a href={item.href} key={item.platform} target="_blank" rel="noreferrer" aria-label={item.platform}>
                {item.platform === "Instagram" ? "ig" : item.platform.slice(0, 2)}
              </a>
            ))}
          </div>
        </div>
        <FooterColumn title={copy.nav.products} items={productFooterLinks} />
        <FooterColumn title={copy.company} items={companyFooterLinks} />
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
        <span>© 2026 Tessilo Global Home. {copy.rights}</span>
        <span>{copy.privacy}</span>
      </div>
    </footer>
  );
}

function FooterColumn({ title, items }: { title: string; items: { label: string; href: string }[] }) {
  return (
    <div className="footer-col">
      <h3>{title}</h3>
      {items.map((item) => <a href={item.href} key={item.label}>{item.label}</a>)}
    </div>
  );
}

function Eyebrow({ children, light = false }: { children: string; light?: boolean }) {
  return <p className={`eyebrow ${light ? "light" : ""}`}><span />{children}</p>;
}
