"use client";

import { useMemo, useState } from "react";

const A = "/assets/";

type Product = {
  name: string;
  material: string;
  image: string;
  category?: string;
  price?: string;
};

const navItems = [
  ["Products", "#products"],
  ["Solutions", "#solutions"],
  ["About", "#about"],
  ["Contact", "#contact"],
] as const;

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
  { name: "Executive Horizon Desk", material: "Walnut & Steel", image: "product-desk.png", price: "From $1,200" },
  { name: "Serenity Lounge Chair", material: "Full-Grain Leather", image: "product-chair.png", price: "From $860" },
  { name: "Atrium Modular Sofa", material: "High-Performance Textile", image: "product-sofa.png", price: "From $2,400" },
];

const listing: Product[] = [
  { name: "Meridian Executive Desk", material: "Walnut & Steel", image: "listing-desk.png", category: "Office Furniture", price: "From $1,200" },
  { name: "Serenity Lounge Chair", material: "Full-Grain Leather", image: "listing-chair.png", category: "Hospitality", price: "From $860" },
  { name: "Atrium Modular Sofa", material: "Performance Textile", image: "listing-sofa.png", category: "Residential", price: "From $2,400" },
  { name: "Vanguard Task Chair", material: "Breathable Mesh", image: "listing-task-chair.png", category: "Office Furniture", price: "From $450" },
  { name: "Oasis Conference Table", material: "Oak Wood", image: "listing-table.png", category: "Office Furniture", price: "From $3,200" },
  { name: "Summit Bar Stool", material: "Leather & Chrome", image: "listing-stool.png", category: "Hospitality", price: "From $540" },
];

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
  "detail-main.png",
  "detail-thumb-1.png",
  "listing-desk.png",
  "product-desk.png",
];

const finishOptions = [
  { name: "Dark Walnut", color: "#3d2b1f" },
  { name: "Smoked Oak", color: "#5d4b3f" },
  { name: "Natural Ash", color: "#a38f7a" },
  { name: "Midnight Steel", color: "#1b2a4a" },
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

export default function TessiloClient() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Categories />
        <Advantage />
        <Featured />
        <Process />
        <Testimonials />
        <GlobalReach />
        <ProductListing />
        <ProductDetail />
        <Faq />
        <Cta />
      </main>
      <Footer />
    </>
  );
}

function Header() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="site-header">
        <a className="brand" href="#" aria-label="Tessilo home" onClick={() => setOpen(false)}>
          <img src={`${A}logo.png`} alt="" />
          <span>Tessilo</span>
        </a>
        <nav className="desktop-nav" aria-label="Primary navigation">
          {navItems.map(([label, href]) => (
            <a href={href} key={label}>{label}</a>
          ))}
          <button className="lang" type="button">EN⌄</button>
          <a className="button gold" href="#quote">Request Quote</a>
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
      <MobileNavOverlay open={open} onClose={() => setOpen(false)} />
    </>
  );
}

function MobileNavOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <div className={`mobile-overlay ${open ? "is-open" : ""}`} aria-hidden={!open}>
      <div className="mobile-panel" role="dialog" aria-modal="true" aria-label="Mobile navigation">
        <div className="mobile-panel-top">
          <span>Tessilo</span>
          <button type="button" onClick={onClose} aria-label="Close menu">✕</button>
        </div>
        <nav className="mobile-panel-links">
          {navItems.map(([label, href], index) => (
            <a href={href} key={label} onClick={onClose} style={{ transitionDelay: `${index * 45}ms` }}>
              {label === "About" ? "About Us" : label}
            </a>
          ))}
        </nav>
        <div className="mobile-languages" aria-label="Language options">
          <strong>EN</strong>
          <span>中文</span>
          <span>DE</span>
        </div>
        <a className="button gold mobile-quote" href="#quote" onClick={onClose}>Request Quote</a>
      </div>
      <button className="mobile-scrim" aria-label="Close menu" type="button" onClick={onClose} />
    </div>
  );
}

function Hero() {
  return (
    <section className="hero">
      <div className="hero-content reveal-up">
        <Eyebrow light>Tessilo Global Home</Eyebrow>
        <h1>Furniture Solutions for Visionary Spaces</h1>
        <p>
          Specializing in premium contract manufacturing for the hospitality,
          commercial, and executive sectors worldwide.
        </p>
        <div className="hero-actions">
          <a className="button gold" href="#products">Browse Catalog</a>
          <a className="button ghost-light" href="#solutions">Our Solutions</a>
        </div>
      </div>
    </section>
  );
}

function Categories() {
  return (
    <section className="section muted" id="solutions">
      <div className="section-heading split">
        <div>
          <Eyebrow>Our Collections</Eyebrow>
          <h2>Crafted for performance and refined aesthetics.</h2>
        </div>
        <a className="text-link" href="#products">View all categories →</a>
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

function Advantage() {
  return (
    <section className="section advantage" id="about">
      <div className="advantage-copy">
        <Eyebrow>The Tessilo Advantage</Eyebrow>
        <h2>Global Reach, Local Craftsmanship.</h2>
        <p>
          We bridge the gap between grand architectural vision and functional,
          durable furniture delivery.
        </p>
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

function Featured() {
  return (
    <section className="section" id="products">
      <div className="section-heading centered">
        <Eyebrow>Signature Pieces</Eyebrow>
        <h2>Engineered for Comfort &amp; Style</h2>
      </div>
      <div className="product-row">
        {featured.map((product) => (
          <ProductCard product={product} key={product.name} />
        ))}
      </div>
    </section>
  );
}

function ProductCard({ product }: { product: Product }) {
  return (
    <article className="product-card">
      <div className="product-image">
        <img src={`${A}${product.image}`} alt={product.name} />
      </div>
      <div className="product-body">
        <span>{product.material}</span>
        <h3>{product.name}</h3>
        {product.price ? <p>{product.price}</p> : null}
      </div>
      <div className="product-action">
        <a className="button outline" href="#quote">Request Quote</a>
      </div>
    </article>
  );
}

function Process() {
  return (
    <section className="section muted process">
      <div className="section-heading">
        <Eyebrow>Our Workflow</Eyebrow>
        <h2>The Journey from Vision to Reality</h2>
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

function Testimonials() {
  return (
    <section className="section testimonials">
      <Eyebrow>Client Testimonials</Eyebrow>
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

function GlobalReach() {
  return (
    <section className="global-reach">
      <div className="reach-card">
        <Eyebrow>Worldwide Logistics</Eyebrow>
        <h2>Connecting the World of Design</h2>
        <p>
          Tessilo&apos;s global B2B presence bridges continents with precision
          logistics, trusted partnerships, and a commitment to timeless quality.
        </p>
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
        <a className="button pill" href="#contact">Explore global reach →</a>
      </div>
    </section>
  );
}

function ProductListing() {
  const [activeCategories, setActiveCategories] = useState<string[]>([]);
  const [activeMaterials, setActiveMaterials] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState(5000);

  const visibleProducts = useMemo(() => {
    return listing.filter((product) => {
      const categoryMatch = activeCategories.length === 0 || activeCategories.includes(product.category ?? "");
      const materialMatch = activeMaterials.length === 0 || activeMaterials.some((material) => product.material.includes(material));
      return categoryMatch && materialMatch;
    });
  }, [activeCategories, activeMaterials]);

  return (
    <section className="listing" aria-label="Product listing preview">
      <div className="listing-top">
        <span>Home / <b>Collections</b></span>
        <h2>Our Collections</h2>
        <p>{visibleProducts.length} of 128 items visible</p>
      </div>
      <div className="listing-layout">
        <aside className="filters" aria-label="Filters">
          <FilterGroup title="Categories" items={["Office Furniture", "Hospitality", "Residential", "Outdoor"]} selected={activeCategories} onChange={setActiveCategories} />
          <FilterGroup title="Material" items={["Walnut", "Leather", "Textile", "Oak"]} selected={activeMaterials} onChange={setActiveMaterials} />
          <div className="filter-group">
            <h3>Price Range</h3>
            <label className="range-control">
              <input
                type="range"
                min="500"
                max="5000"
                step="100"
                value={maxPrice}
                onChange={(event) => setMaxPrice(Number(event.target.value))}
              />
            </label>
            <div className="range-labels"><span>$500</span><span>${maxPrice.toLocaleString()}+</span></div>
          </div>
        </aside>
        <div className="listing-grid">
          {visibleProducts.map((product) => <ProductCard product={product} key={product.name} />)}
        </div>
      </div>
    </section>
  );
}

function FilterGroup({
  title,
  items,
  selected,
  onChange,
}: {
  title: string;
  items: string[];
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
          {item}
        </label>
      ))}
    </div>
  );
}

function ProductDetail() {
  const [activeImage, setActiveImage] = useState(0);
  const [activeFinish, setActiveFinish] = useState(0);
  const [activeTab, setActiveTab] = useState("Description");

  return (
    <section className="product-detail" id="detail">
      <div className="breadcrumb">Home / Office Furniture / <b>Meridian Executive Desk</b></div>
      <div className="detail-layout">
        <div className="detail-gallery">
          <img className="detail-main-image" src={`${A}${detailImages[activeImage]}`} alt="Meridian Executive Desk" />
          <div className="detail-thumbs">
            {detailImages.map((image, index) => (
              <button className={index === activeImage ? "is-active" : ""} type="button" key={image} onClick={() => setActiveImage(index)}>
                <img src={`${A}${image}`} alt="" />
              </button>
            ))}
          </div>
        </div>
        <div className="detail-copy">
          <span>Walnut &amp; Steel Collection</span>
          <h2>Meridian Executive Desk</h2>
          <strong>From $1,200 / unit</strong>
          <div className="detail-divider" />
          <div className="finish-picker">
            <p>Select Finish: <b>{finishOptions[activeFinish].name}</b></p>
            <div>
              {finishOptions.map((finish, index) => (
                <button
                  aria-label={finish.name}
                  className={index === activeFinish ? "is-active" : ""}
                  key={finish.name}
                  style={{ background: finish.color }}
                  type="button"
                  onClick={() => setActiveFinish(index)}
                />
              ))}
            </div>
          </div>
          <div className="specs">
            <h3>Specifications</h3>
            <p>• Dimensions: 200cm x 90cm x 75cm</p>
            <p>• Weight Capacity: 150kg</p>
            <p>• Cable Management: Integrated under-desk tray</p>
          </div>
          <span className="moq">MOQ: 50 UNITS MINIMUM</span>
          <div className="detail-actions">
            <a className="button gold" href="#quote">Request Pricing Quote</a>
            <a className="button outline" href="/assets/detail-main.png" download>Download Spec Sheet</a>
          </div>
        </div>
      </div>
      <div className="detail-tabs" role="tablist" aria-label="Product information">
        {["Description", "Specifications", "Shipping & Logistics"].map((tab) => (
          <button className={tab === activeTab ? "is-active" : ""} key={tab} role="tab" type="button" onClick={() => setActiveTab(tab)}>
            {tab}
          </button>
        ))}
      </div>
      <div className="detail-tab-panel">
        <h3>{activeTab === "Description" ? "The Zenith of Professional Craftsmanship" : activeTab}</h3>
        <p>
          {activeTab === "Description"
            ? "The Meridian Executive Desk is more than a workstation; it is a statement of leadership. Carved from solid American walnut and supported by a precision-engineered steel frame, it balances organic warmth with industrial strength."
            : activeTab === "Specifications"
              ? "Available with bespoke dimensions, multiple veneer finishes, integrated power modules, and project-specific packaging."
              : "Tessilo supports international freight, consolidated project delivery, customs documentation, and optional white-glove installation coordination."}
        </p>
      </div>
      <div className="related">
        <h2>Complementary Pieces</h2>
        <div className="product-row">
          {[
            { name: "Vanguard Task Chair", material: "Breathable Mesh", image: "listing-task-chair.png", price: "From $450" },
            { name: "Nexus Side Cabinet", material: "Walnut Wood", image: "listing-table.png", price: "From $680" },
            { name: "Aura Desk Lamp", material: "Brass & Glass", image: "product-desk.png", price: "From $220" },
          ].map((product) => <ProductCard product={product} key={product.name} />)}
        </div>
      </div>
    </section>
  );
}

function Faq() {
  const [open, setOpen] = useState(0);

  return (
    <section className="section faq">
      <div className="section-heading centered">
        <Eyebrow>B2B Support</Eyebrow>
        <h2>Frequently Asked Questions</h2>
      </div>
      <div className="faq-list">
        {faqs.map((item, index) => (
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

function Cta() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <section className="cta" id="quote">
      <h2>Ready to Furnish Your Space?</h2>
      <p>Join our waitlist for the 2026 contract collection or request a consultation today.</p>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          setSubmitted(true);
        }}
      >
        <input type="email" required placeholder="Enter your business email..." aria-label="Business email" />
        <button className="button gold" type="submit">{submitted ? "Submitted" : "Get Started"}</button>
      </form>
      {submitted ? <p className="form-note">Thanks — our contract team will follow up shortly.</p> : null}
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer" id="contact">
      <div className="footer-main">
        <div className="footer-brand">
          <a className="brand" href="#">
            <img src={`${A}logo.png`} alt="" />
            <span>Tessilo</span>
          </a>
          <p>The Home of Comfort &amp; Style. Global B2B leaders in premium contract furniture and architectural solutions.</p>
          <div className="socials"><span>f</span><span>ig</span><span>in</span><span>x</span></div>
        </div>
        <FooterColumn title="Products" items={["Office", "Hospitality", "Custom", "Collections"]} />
        <FooterColumn title="Company" items={["About Us", "Our Process", "Careers", "Sustainability"]} />
        <FooterColumn title="Support" items={["Request Quote", "Partner Portal", "Catalog Download", "Contact"]} />
      </div>
      <div className="footer-bottom">
        <span>© 2026 Tessilo Global Home. All rights reserved.</span>
        <span>Privacy Policy · Terms of Service · Cookie Settings</span>
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
