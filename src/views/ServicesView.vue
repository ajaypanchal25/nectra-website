<template>
  <Navbar />


  <!-- Services Grid -->
  <section class="section svc-section">
    <div class="container">
      <div class="section-header">
        <span class="section-tag">SERVICES</span>
        <h2 class="section-title">All Fabrication Services</h2>
      </div>
      <div class="svc-list-grid">
        <div
          v-for="(svc, idx) in services"
          :key="svc.name"
          class="svc-item-card"
          :data-aos-delay="idx * 40"
        >
          <div class="svc-icon-box">
            <i :class="svc.icon"></i>
          </div>
          <div class="svc-item-content">
            <h3>{{ svc.name }}</h3>
            <p>{{ svc.desc }}</p>
          </div>
          <a :href="info.whatsappUrl" target="_blank" class="svc-wa-link">
            <i class="fab fa-whatsapp"></i> Enquire
          </a>
        </div>
      </div>
    </div>
  </section>

  <!-- Industries Section -->
  <section class="section ind-section" id="industries">
    <div class="container">
      <div class="section-header">
        <span class="section-tag">INDUSTRIES WE SERVE</span>
        <h2 class="section-title">Industries We Serve</h2>
      </div>
      <div class="ind-grid">
        <div
          v-for="(ind, idx) in industries"
          :key="ind.name"
          class="ind-card"
          :data-aos-delay="idx * 50"
        >
          <i :class="ind.icon"></i>
          <span>{{ ind.name }}</span>
        </div>
      </div>
    </div>
  </section>

  <!-- CTA -->
  <section class="cta-banner">
    <div class="container cta-inner" data-aos="zoom-in">
      <div>
        <h2>Need Custom Fabrication Solutions?</h2>
        <p>Contact NECTRA SERVICES for a free consultation and quotation today.</p>
      </div>
      <div class="cta-btns">
        <RouterLink to="/contact" class="btn btn-light-cta btn-lg">
          Get a Quote <i class="fas fa-arrow-right"></i>
        </RouterLink>
        <a :href="info.whatsappUrl" target="_blank" rel="noopener noreferrer" class="btn btn-whatsapp btn-lg">
          <i class="fab fa-whatsapp"></i> WhatsApp Us
        </a>
      </div>
    </div>
  </section>

  <Footer />
</template>

<script setup>
import Navbar from '../components/common/Navbar.vue'
import Footer from '../components/common/Footer.vue'
import services from '../data/services.js'
import { industries } from '../data/homeData.js'
import businessInfo from '../data/businessInfo.js'

const info = businessInfo
</script>

<style scoped>
.page-header {
  text-align: center;
  background: #f8fafc;
  border-bottom: 1px solid #e2e8f0;
  padding: 60px 0 44px;
}
.section-tag-header {
  letter-spacing: 2px;
  color: var(--primary);
  background: rgba(26,111,196,0.08);
  border-radius: 20px;
  padding: 4px 14px;
  font-size: 12px;
  font-weight: 700;
}
.section-title-header {
  color: #0f172a;
  margin: 10px 0 6px;
  font-family: 'Outfit', sans-serif;
  font-size: clamp(28px, 4vw, 42px);
  font-weight: 800;
}
.section-sub-header { color: #64748b; font-size: 15px; }
.breadcrumb {
  color: #64748b;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-top: 16px;
  font-size: 13.5px;
}
.breadcrumb a { color: var(--primary); font-weight: 600; }

.svc-section { background: #fff; }
.svc-list-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  gap: 20px;
}
.svc-item-card {
  display: flex;
  align-items: center;
  gap: 18px;
  padding: 24px;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: var(--radius);
  transition: var(--transition);
}
.svc-item-card:hover { background: #fff; box-shadow: var(--shadow-sm); border-color: var(--primary-light); transform: translateY(-4px); }
.svc-icon-box {
  width: 52px;
  height: 52px;
  color: var(--primary);
  background: rgba(26,111,196,0.08);
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
  flex-shrink: 0;
}
.svc-item-content { flex: 1; }
.svc-item-content h3 { color: #0f172a; font-size: 16px; font-weight: 700; margin-bottom: 4px; }
.svc-item-content p { color: #64748b; font-size: 13px; line-height: 1.5; }
.svc-wa-link {
  color: #128c7e;
  background: rgba(37,211,102,0.12);
  border: 1px solid rgba(37,211,102,0.30);
  border-radius: 6px;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  font-size: 12px;
  font-weight: 600;
  flex-shrink: 0;
  transition: var(--transition);
}
.svc-wa-link:hover { color: #fff; background: #25d366; }

.ind-section { background: #f8fafc; }
.ind-grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 16px;
}
.ind-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  padding: 24px 16px;
  text-align: center;
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: var(--radius);
  transition: var(--transition);
}
.ind-card:hover { border-color: var(--primary-light); box-shadow: var(--shadow-sm); transform: translateY(-4px); }
.ind-card i { color: var(--primary); font-size: 28px; }
.ind-card span { color: #334155; font-size: 13.5px; font-weight: 600; }

.cta-banner { background: var(--gradient-primary); color: #fff; padding: 50px 0; }
.cta-inner {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: 24px;
}
.cta-inner h2 { margin-bottom: 6px; font-family: 'Outfit', sans-serif; font-size: clamp(22px,3.5vw,30px); font-weight: 800; }
.cta-inner p { opacity: 0.9; font-size: 15px; }
.cta-btns { display: flex; flex-wrap: wrap; gap: 14px; }
.btn-light-cta { color: var(--primary); background: #fff; font-weight: 700; }

@media (max-width: 1200px) { .ind-grid { grid-template-columns: repeat(4, 1fr); } }
@media (max-width: 900px) { .ind-grid { grid-template-columns: repeat(3, 1fr); } }
@media (max-width: 768px) {
  .svc-list-grid { grid-template-columns: 1fr; }
  .svc-item-card { flex-direction: column; align-items: flex-start; }
  .ind-grid { grid-template-columns: repeat(2, 1fr); }
  .cta-inner { text-align: center; flex-direction: column; justify-content: center; }
  .cta-btns { justify-content: center; }
}
</style>
