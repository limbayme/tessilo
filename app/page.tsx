const A = "/assets/";

type Product = {
  name: string;
  material: string;
  image: string;
};

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
  { name: "Executive Horizon Desk", material: "Walnut & Steel", image: "product-desk.png" },
  { name: "Serenity Lounge Chair", material: "Full-Grain Leather", image: "product-chair.png" },
  { name: "Atrium Modular Sofa", material: "High-Performance Textile", image: "product-sofa.png" },
];

const listing: Product[] = [
  { name: "Meridian Executive Desk", material: "Walnut & Steel", image: "listing-desk.png" },
  { name: "Serenity Lounge Chair", material: "Full-Grain Leather", image: "listing-chair.png" },
  { name: "Atrium Modular Sofa", material: "Performance Textile", image: "listing-sofa.png" },
  { name: "Vanguard Task Chair", material: "Breathable Mesh", image: "listing-task-chair.png" },
  { name: "Oasis Conference Table", material: "Oak Wood", image: "listing-table.png" },
  { name: "Summit Bar Stool", material: "Leather & Chrome", image: "listing-stool.png" },
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

export default function App() {
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
        <Cta />
      </main>
      <Footer />
    </>
  );
}

function Header() {
  return (
    <header className="site-header">
      <a className="brand" href="#" aria-label="Tessilo home">
        <img src={`${A}logo.png`} alt="" />
        <span>Tessilo</span>
      </a>
      <nav className="desktop-nav" aria-label="Primary navigation">
        <a href="#products">Products</a>
        <a href="#solutions">Solutions</a>
        <a href="#about">About</a>
        <a href="#contact">Contact</a>
        <button className="lang" type="button">EN⌄</button>
        <a className="button gold" href="#quote">Request Quote</a>
      </nav>
      <button className="menu" aria-label="Open menu" type="button">☰</button>
    </header>
  );
}

function Hero() {
  return (
    <section className="hero">
      <div className="hero-content">
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
      <img src={`${A}${product.image}`} alt={product.name} />
      <div className="product-body">
        <span>{product.material}</span>
        <h3>{product.name}</h3>
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
        <Quote
          img="avatar-voss.png"
          name="Alexander Voss"
          role="Principal, Voss Architect Studio"
        />
        <Quote
          img="avatar-park.png"
          name="Julianne Park"
          role="Director of Operations, Grand Hyatt Group"
        />
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
  return (
    <section className="listing" aria-label="Product listing preview">
      <div className="listing-top">
        <span>Home / <b>Collections</b></span>
        <h2>Our Collections</h2>
        <p>128 Items available</p>
      </div>
      <div className="listing-layout">
        <aside className="filters" aria-label="Filters">
          <FilterGroup title="Categories" items={["Office Furniture", "Hospitality", "Residential", "Outdoor"]} />
          <FilterGroup title="Material" items={["Premium Wood", "Brushed Metal", "Sustainable Fabric", "Italian Leather"]} />
          <div className="filter-group">
            <h3>Price Range</h3>
            <div className="range"><span /></div>
            <div className="range-labels"><span>$500</span><span>$5,000+</span></div>
          </div>
        </aside>
        <div className="listing-grid">
          {listing.map((product) => <ProductCard product={product} key={product.name} />)}
        </div>
      </div>
    </section>
  );
}

function FilterGroup({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="filter-group">
      <h3>{title}</h3>
      {items.map((item) => (
        <label key={item}><input type="checkbox" />{item}</label>
      ))}
    </div>
  );
}

function Cta() {
  return (
    <section className="cta" id="quote">
      <h2>Ready to Furnish Your Space?</h2>
      <p>Join our waitlist for the 2026 contract collection or request a consultation today.</p>
      <form>
        <input type="email" placeholder="Enter your business email..." aria-label="Business email" />
        <button className="button gold" type="submit">Get Started</button>
      </form>
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
