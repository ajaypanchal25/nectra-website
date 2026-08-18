<template>
  <Navbar />

  <!-- Hero Section -->
  <section class="hero-section">
    <div class="hero-bg-img"></div>
    <div class="hero-overlay"></div>
    <div class="hero-wrapper">
      <div class="hero-content">
        <div class="hero-badge">
          <i class="fas fa-award"></i> 15+ Years of Experience | Precision | Quality | Timely Delivery
        </div>
        <h1 class="hero-title">
          <span class="ht-brand">NECTRA SERVICES</span>
        </h1>
        <h2 class="hero-subtitle"> Precision Fabrication &amp; Engineering Solutions </h2>
        <p class="hero-desc">
          We provide high-quality fabrication, stainless steel, mild steel, laser cutting, welding,
          and custom engineering solutions with precision and reliability in Ahmedabad, Gujarat.
        </p>
        <div class="hero-btns">
          <RouterLink to="/contact" class="btn btn-primary btn-lg">
            Get a Quote <i class="fas fa-arrow-right"></i>
          </RouterLink>
          <RouterLink to="/contact" class="btn btn-outline btn-lg">
            <i class="fas fa-envelope"></i> Contact Us
          </RouterLink>
          <a :href="info.whatsappUrl" target="_blank" rel="noopener noreferrer" class="btn btn-whatsapp btn-lg">
            <i class="fab fa-whatsapp"></i> WhatsApp Us
          </a>
        </div>
      </div>
    </div>
  </section>

  <!-- Featured Products Section -->
  <section class="section home-products-section">
    <div class="container">
      <div class="section-header">
        <span class="section-tag">OUR PRODUCTS</span>
        <h2 class="section-title">Featured Products &amp; Machinery</h2>
        <div class="header-line"></div>
      </div>
      <div class="home-products-grid">
        <RouterLink to="/products" class="home-prod-card">
          <div class="home-prod-img-box">
            <img src="/images/prod-canopy-1.jpg" alt="Acoustic Generator Canopy" class="home-prod-img" />
          </div>
          <div class="home-prod-content">
            <h3>Acoustic Generator Canopy</h3>
            <p>Soundproof &amp; weather-resistant MS canopy for diesel generators.</p>
            <span class="home-prod-link"> Learn More <i class="fas fa-chevron-right"></i></span>
          </div>
        </RouterLink>
        <RouterLink to="/products" class="home-prod-card">
          <div class="home-prod-img-box">
            <img src="/images/prod-canopy-2.jpg" alt="Generator Canopy (Silent Power)" class="home-prod-img" />
          </div>
          <div class="home-prod-content">
            <h3>Generator Canopy (Silent Power)</h3>
            <p>Heavy-duty acoustic generator enclosure built to client specs.</p>
            <span class="home-prod-link"> Learn More <i class="fas fa-chevron-right"></i></span>
          </div>
        </RouterLink>
        <RouterLink to="/products" class="home-prod-card">
          <div class="home-prod-img-box">
            <img src="/images/prod-ss-body.jpg" alt="Stainless Steel Machine Body Enclosure" class="home-prod-img" />
          </div>
          <div class="home-prod-content">
            <h3>Stainless Steel Machine Body</h3>
            <p>Precision-welded SS enclosure box &amp; electrical control body.</p>
            <span class="home-prod-link"> Learn More <i class="fas fa-chevron-right"></i></span>
          </div>
        </RouterLink>
      </div>
    </div>
  </section>

  <!-- Services Section -->
  <section class="section services-section" id="services">
    <div class="container">
      <div class="section-header">
        <span class="section-tag">OUR SERVICES</span>
        <h2 class="section-title">What We Offer</h2>
        <div class="header-line"></div>
      </div>
      <div class="services-single-row">
        <div v-for="svc in services.slice(0, 6)" :key="svc.name" class="service-card">
          <div class="service-icon-wrap">
            <i :class="svc.icon"></i>
          </div>
          <h3>{{ svc.name }}</h3>
          <p>{{ svc.desc }}</p>
        </div>
      </div>
      <div class="center-btn-row">
        <RouterLink to="/services" class="btn btn-primary btn-lg">
          View All Services <i class="fas fa-arrow-right"></i>
        </RouterLink>
      </div>
    </div>
  </section>

  <!-- Why Choose Us Section -->
  <section class="section why-section">
    <div class="container">
      <div class="section-header white-header">
        <span class="section-tag-light">WHY CHOOSE US</span>
        <h2 class="section-title-white">Quality. Reliability. Commitment.</h2>
      </div>
      <div class="why-single-row">
        <div v-for="item in whyUs" :key="item.title" class="why-card">
          <div class="why-icon">
            <i :class="item.icon"></i>
          </div>
          <h3>{{ item.title }}</h3>
          <p>{{ item.desc }}</p>
        </div>
      </div>
    </div>
  </section>

  <!-- Industries Section -->
  <section class="section industries-section" id="industries">
    <div class="container">
      <div class="section-header">
        <span class="section-tag">INDUSTRIES WE SERVE</span>
        <h2 class="section-title">Industries We Serve</h2>
      </div>
      <div class="industries-single-row">
        <div v-for="ind in industries" :key="ind.name" class="industry-card">
          <div class="ind-icon">
            <i :class="ind.icon"></i>
          </div>
          <span>{{ ind.name }}</span>
        </div>
      </div>
    </div>
  </section>

  <!-- Stats Banner -->
  <section class="stats-banner">
    <div class="container">
      <div class="stats-header">OUR HIGHLIGHTS</div>
      <div class="stats-grid">
        <div
          v-for="(stat, idx) in stats"
          :key="stat.label"
          :class="['stat-item', { 'has-divider': idx < stats.length - 1 }]"
        >
          <div class="stat-icon"><i :class="stat.icon"></i></div>
          <div class="stat-text-box">
            <div class="stat-number">{{ stat.value }}</div>
            <div class="stat-label">{{ stat.label }}</div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- CTA Banner -->
  <section class="cta-banner">
    <div class="container cta-inner">
      <div class="cta-text">
        <i class="fas fa-hard-hat cta-icon"></i>
        <div>
          <h2>Looking for Professional Fabrication Services?</h2>
          <p>Get in touch with NECTRA SERVICES today for a free consultation and quotation.</p>
        </div>
      </div>
      <div class="cta-btn-wrap">
        <RouterLink to="/contact" class="btn btn-light-cta btn-lg">
          Get a Free Quote <i class="fas fa-arrow-right"></i>
        </RouterLink>
      </div>
    </div>
  </section>

  <Footer />
</template>

<script setup>
import Navbar from '../components/common/Navbar.vue'
import Footer from '../components/common/Footer.vue'
import businessInfo from '../data/businessInfo.js'
import services from '../data/services.js'
import { whyUs, industries, stats } from '../data/homeData.js'

const info = businessInfo
</script>

<style scoped>
/* Hero */
.hero-section {
  position: relative;
  min-height: 90vh;
  display: flex;
  align-items: center;
  color: #fff;
  overflow: hidden;
  background: #0f172a;
}
.hero-bg-img {
  position: absolute;
  inset: 0;
  background-image: url('/images/hero-welder.png');
  background-size: cover;
  background-position: right center;
  z-index: 0;
}
.hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, #0f172a 0%, rgba(15, 23, 42, 0.95) 35%, rgba(15, 23, 42, 0.45) 60%, rgba(15, 23, 42, 0.05) 100%);
  z-index: 1;
}
.hero-wrapper {
  width: 100%;
  padding-left: clamp(24px, 5vw, 70px);
  padding-right: 24px;
  position: relative;
  z-index: 2;
}
.hero-content {
  max-width: 720px;
  padding-top: 80px;
  padding-bottom: 80px;
  text-align: left;
}
.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: rgba(255,255,255,0.10);
  border: 1px solid rgba(255,255,255,0.20);
  border-radius: 20px;
  padding: 7px 18px;
  font-size: 13px;
  font-weight: 600;
  margin-bottom: 24px;
  letter-spacing: 0.5px;
}
.hero-badge i { color: #fbbf24; }
.hero-title {
  font-family: 'Outfit', sans-serif;
  font-size: clamp(24px, 5.2vw, 58px);
  font-weight: 900;
  line-height: 1.1;
  margin-bottom: 14px;
}
.ht-brand {
  color: #fff;
  white-space: nowrap;
  display: inline-block;
}
.hero-subtitle {
  font-family: 'Outfit', sans-serif;
  font-size: clamp(18px, 2.5vw, 24px);
  font-weight: 600;
  color: #38bdf8;
  margin-bottom: 16px;
}
.hero-desc {
  font-size: 16px;
  line-height: 1.75;
  color: rgba(255,255,255,0.85);
  max-width: 580px;
  margin-bottom: 36px;
}
.hero-btns { display: flex; flex-wrap: wrap; gap: 14px; justify-content: flex-start; }

/* Home Products */
.home-products-section { background: #f8fafc; border-bottom: 1px solid #e2e8f0; padding: 44px 0; }
.home-products-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}
.home-prod-card {
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
  background: #fff;
  border: 1px solid #e2e8f0;
  display: flex;
  flex-direction: column;
  text-decoration: none;
  transition: transform 0.3s, box-shadow 0.3s, border-color 0.3s;
  overflow: hidden;
}
.home-prod-card:hover { border-color: var(--primary); transform: translateY(-6px); box-shadow: 0 12px 30px rgba(26,111,196,0.15); }
.home-prod-img-box { background: #0f172a; height: 200px; position: relative; overflow: hidden; }
.home-prod-img { object-fit: cover; object-position: center center; width: 100%; height: 100%; transition: transform 0.5s; }
.home-prod-card:hover .home-prod-img { transform: scale(1.08); }
.home-prod-content { flex: 1; padding: 20px; display: flex; flex-direction: column; }
.home-prod-content h3 { color: #0f172a; margin-bottom: 8px; font-family: 'Outfit', sans-serif; font-size: 17px; font-weight: 800; }
.home-prod-content p { color: #64748b; flex: 1; margin-bottom: 16px; font-size: 13.5px; line-height: 1.5; }
.home-prod-link { color: var(--primary); display: inline-flex; align-items: center; gap: 6px; font-size: 13px; font-weight: 700; transition: gap 0.2s; }
.home-prod-card:hover .home-prod-link { gap: 10px; }

/* Services Section */
.services-section { background: #fff; }
.services-single-row {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-bottom: 30px;
}
.service-card {
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: var(--radius);
  padding: 24px 20px;
  text-align: center;
  transition: var(--transition);
}
.service-card:hover { border-color: var(--primary-light); box-shadow: var(--shadow-sm); transform: translateY(-4px); background: #fff; }
.service-icon-wrap {
  width: 54px;
  height: 54px;
  background: rgba(26,111,196,0.08);
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
  color: var(--primary);
  margin: 0 auto 14px;
}
.service-card h3 { color: #0f172a; font-size: 16px; font-weight: 700; margin-bottom: 8px; }
.service-card p { color: #64748b; font-size: 13.5px; line-height: 1.6; }
.center-btn-row { text-align: center; margin-top: 28px; }

/* Why Section */
.why-section { background: var(--bg-dark); }
.white-header .section-tag-light {
  background: rgba(56, 189, 248, 0.12);
  border: 1px solid rgba(56, 189, 248, 0.25);
  border-radius: 20px;
  padding: 5px 16px;
  font-size: 11.5px;
  font-weight: 700;
  color: #38bdf8;
  letter-spacing: 2px;
  text-transform: uppercase;
  display: inline-block;
  margin-bottom: 12px;
}
.section-title-white { color: #fff; font-family: 'Outfit', sans-serif; font-size: clamp(26px, 4vw, 36px); font-weight: 800; }
.why-single-row { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
.why-card {
  background: #1e293b;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: var(--radius);
  padding: 28px 20px;
  text-align: center;
  transition: var(--transition);
}
.why-card:hover { background: #28364e; border-color: rgba(56, 189, 248, 0.4); transform: translateY(-4px); box-shadow: 0 12px 30px rgba(0, 0, 0, 0.35); }
.why-icon {
  width: 52px;
  height: 52px;
  background: rgba(56, 189, 248, 0.12);
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
  color: #38bdf8;
  margin: 0 auto 14px;
}
.why-card h3 { color: #fff; font-size: 16px; font-weight: 700; margin-bottom: 8px; }
.why-card p { color: #94a3b8; font-size: 13.5px; line-height: 1.6; }

/* Industries */
.industries-section { background: #f8fafc; }
.industries-single-row { display: grid; grid-template-columns: repeat(6, 1fr); gap: 14px; }
.industry-card {
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: var(--radius);
  padding: 20px 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  text-align: center;
  transition: var(--transition);
}
.industry-card:hover { border-color: var(--primary-light); box-shadow: var(--shadow-sm); transform: translateY(-4px); }
.ind-icon { color: var(--primary); font-size: 24px; }
.industry-card span { color: #334155; font-size: 12.5px; font-weight: 600; }

/* Stats Banner */
.stats-banner { background: var(--bg-dark); padding: 40px 0; }
.stats-header { color: #94a3b8; text-align: center; font-size: 12px; font-weight: 700; letter-spacing: 3px; text-transform: uppercase; margin-bottom: 28px; }
.stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); }
.stat-item {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding: 20px 24px;
}
.stat-item.has-divider { border-right: 1px solid rgba(255,255,255,0.18); }
.stat-icon { color: #38bdf8; flex-shrink: 0; font-size: 40px; }
.stat-text-box { display: flex; flex-direction: column; }
.stat-number { color: #fff; font-family: 'Outfit', sans-serif; font-size: 32px; font-weight: 800; line-height: 1.1; }
.stat-label { color: #cbd5e1; font-size: 12.5px; font-weight: 500; }

/* CTA Banner */
.cta-banner {
  color: #fff;
  background-image: url('https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?q=80&w=1920&auto=format&fit=crop');
  background-position: center;
  background-size: cover;
  padding: 60px 0;
  position: relative;
  overflow: hidden;
}
.cta-banner::before {
  content: '';
  position: absolute;
  inset: 0;
  z-index: 1;
  background: linear-gradient(135deg, rgba(26,111,196,0.92) 0%, rgba(2,132,199,0.88) 100%);
}
.cta-inner {
  position: relative;
  z-index: 2;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: 24px;
}
.cta-text { display: flex; align-items: center; gap: 20px; }
.cta-icon { font-size: 48px; }
.cta-text h2 { margin-bottom: 6px; font-family: 'Outfit', sans-serif; font-size: clamp(22px,3.5vw,30px); font-weight: 800; }
.cta-text p { opacity: 0.9; font-size: 15px; }
.btn-light-cta { color: var(--primary); background: #fff; font-weight: 700; box-shadow: 0 4px 14px rgba(0,0,0,0.15); }
.btn-light-cta:hover { background: #f8fafc; transform: translateY(-2px); }

/* Responsive */
@media (max-width: 1100px) {
  .home-products-grid, .services-single-row, .why-single-row { grid-template-columns: repeat(3, 1fr); gap: 16px; }
  .industries-single-row { grid-template-columns: repeat(4, 1fr); gap: 12px; }
}
@media (max-width: 768px) {
  .home-products-grid { grid-template-columns: 1fr; }
  .services-single-row, .why-single-row, .industries-single-row { grid-template-columns: repeat(2, 1fr); }
  .stats-grid { grid-template-columns: repeat(2, 1fr); gap: 24px; }
  .cta-inner { text-align: center; flex-direction: column; justify-content: center; }
  .cta-text { text-align: center; flex-direction: column; }
  .hero-btns { flex-direction: column; align-items: flex-start; }
}
@media (max-width: 480px) {
  .home-products-grid, .services-single-row, .why-single-row { grid-template-columns: 1fr; }
  .industries-single-row { grid-template-columns: repeat(2, 1fr); }
}
</style>
