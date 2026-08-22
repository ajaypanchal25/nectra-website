<template>
  <Navbar />

  <!-- About Section: Image LEFT, Text RIGHT -->
  <section class="section about-section">
    <div class="container">

      <!-- Centered ABOUT US tag -->
      <div class="about-top-header">
        <span class="section-tag">ABOUT US</span>
      </div>

      <div class="about-detail-grid">
        <!-- LEFT: Blue Card -->
        <div class="about-img-col">
          <div class="acb-card">
            <div class="acb-logo">
              <img src="/images/nectra-logo-mark.png" alt="NECTRA SERVICES" class="acb-logo-img" />
            </div>
            <div class="acb-name">NECTRA SERVICES</div>
            <div class="acb-loc"><i class="fas fa-map-marker-alt"></i> Vatva, Ahmedabad, Gujarat</div>
            <div class="acb-badge">MS &amp; SS Fabrication Specialist</div>
            <div class="acb-motto">Precision | Quality | Timely Delivery</div>
          </div>
        </div>

        <!-- RIGHT: Text -->
        <div class="about-content-box">
          <h2 class="section-title" style="text-align:left">NECTRA SERVICES – Your Trusted Fabrication Partner</h2>
          <p class="ab-para">
            NECTRA SERVICES is a leading MS (Mild Steel) &amp; SS (Stainless Steel) Fabrication company based in Ahmedabad, Gujarat.
            With over <strong>15+ years of experience</strong> in precision fabrication and engineering, we have established ourselves
            as a trusted partner for industries across Gujarat and India.
          </p>
          <p class="ab-para">
            We specialize in a wide range of fabrication services including Generator Canopies, Electrical Panel Bodies,
            SS Cyclone Tanks, CNC Laser Cutting, MIG/TIG Welding, Laser Welding, and custom engineering solutions.
          </p>
          <p class="ab-para">
            Our team of skilled professionals uses state-of-the-art equipment and advanced manufacturing processes to deliver
            precision-engineered products that meet the highest quality standards.
          </p>
          <div class="about-badges">
            <div class="about-badge-item">
              <i class="fas fa-shield-alt"></i>
              <span>ISO Quality Assured</span>
            </div>
            <div class="about-badge-item">
              <i class="fas fa-certificate"></i>
              <span>GST Registered</span>
            </div>
            <div class="about-badge-item">
              <i class="fas fa-map-marker-alt"></i>
              <span>Ahmedabad, Gujarat</span>
            </div>
          </div>
          <div class="about-cta-row">
            <RouterLink to="/contact" class="btn btn-primary">
              Get a Free Quote <i class="fas fa-arrow-right"></i>
            </RouterLink>
            <a :href="info.whatsappUrl" target="_blank" class="btn btn-whatsapp">
              <i class="fab fa-whatsapp"></i> WhatsApp Us
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Factory Gallery -->
  <section class="factory-section">
    <div class="container">
      <div class="section-header">
        <span class="section-tag">OUR FACILITY</span>
        <h2 class="section-title">Our Factory &amp; Workshop</h2>
        <p class="section-sub">A look inside our state-of-the-art fabrication facility in Ahmedabad</p>
      </div>
      <div class="factory-grid-row">
        <div
          v-for="(photo, idx) in factoryPhotos"
          :key="photo.src"
          class="factory-card-thumb"
          @click="openLightbox(idx)"
        >
          <div class="thumb-img-box">
            <img :src="photo.src" :alt="photo.caption" class="thumb-img" />
            <div class="thumb-overlay">
              <span class="zoom-badge"><i class="fas fa-expand-alt"></i> View Full Size</span>
            </div>
          </div>
          <div class="thumb-info">
            <i class="fas fa-camera"></i> {{ photo.caption }}
          </div>
        </div>
      </div>
      <div class="factory-highlights">
        <div class="fh-item"><i class="fas fa-ruler-combined"></i> CNC Laser Cutting</div>
        <div class="fh-item"><i class="fas fa-fire"></i> Laser Welding</div>
        <div class="fh-item"><i class="fas fa-cogs"></i> CNC Bending</div>
        <div class="fh-item"><i class="fas fa-paint-brush"></i> Powder Coating</div>
        <div class="fh-item"><i class="fas fa-check-circle"></i> Quality Control</div>
      </div>
    </div>
  </section>

  <!-- What Makes Us Different -->
  <section class="why-section">
    <div class="container">
      <div class="section-header">
        <span class="section-tag">WHY CHOOSE US</span>
        <h2 class="section-title">What Makes Us Different</h2>
      </div>
      <div class="why-grid">
        <div v-for="item in whyUs" :key="item.title" class="why-card">
          <div class="why-icon"><i :class="item.icon"></i></div>
          <h3>{{ item.title }}</h3>
          <p>{{ item.desc }}</p>
        </div>
      </div>
    </div>
  </section>

  <!-- Mission & Vision -->
  <section class="mv-section">
    <div class="container">
      <div class="section-header">
        <span class="section-tag">OUR FOUNDATION</span>
        <h2 class="section-title">Mission &amp; Vision</h2>
      </div>
      <div class="mv-grid">
        <div class="mv-card">
          <div class="mvc-icon mission"><i class="fas fa-bullseye"></i></div>
          <h3>Our Mission</h3>
          <p>
            To deliver precision-engineered MS &amp; SS fabrication solutions with uncompromising quality,
            timely delivery, and complete customer satisfaction. We aim to be the most trusted fabrication
            partner in Gujarat and beyond.
          </p>
        </div>
        <div class="mv-card">
          <div class="mvc-icon vision"><i class="fas fa-eye"></i></div>
          <h3>Our Vision</h3>
          <p>
            To become the leading fabrication and engineering solutions provider in India, known for innovation,
            precision, and excellence. We envision expanding our capabilities to serve clients across diverse industries.
          </p>
        </div>
      </div>
    </div>
  </section>



  <!-- Lightbox -->
  <Teleport to="body">
    <Transition name="lightbox-fade">
      <div v-if="lightboxOpen" class="lightbox-backdrop" @click.self="closeLightbox">
        <button class="lightbox-close" @click="closeLightbox" aria-label="Close">
          <i class="fas fa-times"></i>
        </button>

        <div class="lightbox-content">
          <div
            class="lightbox-img-wrapper"
            @touchstart="handleTouchStart"
            @touchend="handleTouchEnd"
          >
            <img :src="factoryPhotos[lightboxIdx].src" :alt="factoryPhotos[lightboxIdx].caption" class="lightbox-img" />
            <button class="lightbox-nav prev" @click="prevPhoto" aria-label="Previous photo">
              <i class="fas fa-chevron-left"></i>
            </button>
            <button class="lightbox-nav next" @click="nextPhoto" aria-label="Next photo">
              <i class="fas fa-chevron-right"></i>
            </button>
          </div>
          <div class="lightbox-caption-box">
            <h3><i class="fas fa-camera"></i> {{ factoryPhotos[lightboxIdx].caption }}</h3>
            <p>NECTRA SERVICES – Fabrication Facility, Ahmedabad</p>
            <span class="photo-count">{{ lightboxIdx + 1 }} / {{ factoryPhotos.length }}</span>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>

  <!-- CTA -->
  <section class="cta-banner">
    <div class="container cta-inner">
      <div>
        <h2>Ready to Work with Us?</h2>
        <p>Contact NECTRA SERVICES for a free consultation and quote today.</p>
      </div>
      <div class="cta-btns">
        <RouterLink to="/contact" class="btn btn-light-cta btn-lg">
          Get a Quote <i class="fas fa-arrow-right"></i>
        </RouterLink>
        <RouterLink to="/services" class="btn btn-outline btn-lg">
          View Our Services
        </RouterLink>
      </div>
    </div>
  </section>

  <Footer />
</template>

<script setup>
import { ref } from 'vue'
import Navbar from '../components/common/Navbar.vue'
import Footer from '../components/common/Footer.vue'
import { whyUs } from '../data/homeData.js'
import businessInfo from '../data/businessInfo.js'

const info = businessInfo



const factoryPhotos = [
  { src: '/images/factory-exterior.jpg', caption: 'Factory Exterior – NECTRA SERVICES, Vatva, Ahmedabad' },
  { src: '/images/factory-interior-1.jpg', caption: 'Workshop Floor – CNC Laser Cutting & Fabrication Area' },
  { src: '/images/factory-interior-2.jpg', caption: 'Welding & Assembly Section – Professional Workmanship' },
]

const lightboxOpen = ref(false)
const lightboxIdx = ref(0)

function openLightbox(idx) {
  lightboxIdx.value = idx
  lightboxOpen.value = true
  document.body.style.overflow = 'hidden'
}
function closeLightbox() {
  lightboxOpen.value = false
  document.body.style.overflow = ''
}
function prevPhoto() {
  lightboxIdx.value = (lightboxIdx.value - 1 + factoryPhotos.length) % factoryPhotos.length
}
function nextPhoto() {
  lightboxIdx.value = (lightboxIdx.value + 1) % factoryPhotos.length
}

let touchStartX = 0
let touchEndX = 0

function handleTouchStart(e) {
  if (e.touches && e.touches.length > 0) {
    touchStartX = e.touches[0].clientX
  }
}

function handleTouchEnd(e) {
  if (e.changedTouches && e.changedTouches.length > 0) {
    touchEndX = e.changedTouches[0].clientX
    const diff = touchStartX - touchEndX
    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        nextPhoto()
      } else {
        prevPhoto()
      }
    }
  }
}
</script>

<style scoped>
/* ===== ABOUT SECTION ===== */
.about-section { background: #fff; padding-bottom: 20px; }

.about-top-header {
  text-align: center;
  margin-bottom: 36px;
}

.about-detail-grid {
  display: grid;
  grid-template-columns: 1fr 1.1fr;
  gap: 52px;
  align-items: center;
}

/* LEFT: Blue Card */
.about-img-col { display: flex; align-items: center; justify-content: center; }
.acb-card {
  background: var(--gradient-primary);
  color: #fff;
  border-radius: var(--radius-lg);
  padding: 32px 52px;
  text-align: center;
  box-shadow: var(--shadow-primary);
  width: 100%;
  max-width: 450px;
}
.acb-logo { margin: 0 auto 14px; width: 64px; height: 64px; }
.acb-logo-img {
  width: 64px;
  height: 64px;
  object-fit: contain;
  border-radius: 14px;
  background: rgba(255,255,255,0.18);
  padding: 8px;
}
.acb-name { font-family: 'Outfit', sans-serif; font-weight: 900; font-size: 20px; margin-bottom: 5px; letter-spacing: 0.5px; }
.acb-loc { opacity: 0.85; margin: 0 0 14px; font-size: 12.5px; display: flex; align-items: center; justify-content: center; gap: 5px; }
.acb-badge {
  background: rgba(255,255,255,0.18);
  border: 1px solid rgba(255,255,255,0.30);
  border-radius: 20px;
  padding: 5px 14px;
  font-size: 12px;
  font-weight: 600;
  margin-bottom: 8px;
  display: inline-block;
}
.acb-motto { opacity: 0.85; font-size: 12.5px; font-weight: 600; }

/* RIGHT: Text */
.ab-para { color: #475569; font-size: 13.5px; line-height: 1.75; margin-bottom: 12px; }
.about-badges { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 20px; margin-bottom: 24px; }
.about-badge-item {
  display: flex;
  align-items: center;
  gap: 8px;
  background: rgba(26,111,196,0.08);
  border: 1px solid rgba(26,111,196,0.18);
  border-radius: 20px;
  padding: 6px 14px;
  font-size: 13px;
  font-weight: 600;
  color: var(--primary);
}
.about-cta-row { display: flex; flex-wrap: wrap; gap: 12px; }

/* ===== FACTORY SECTION ===== */
.factory-section { background: #f8fafc; padding: 20px 0 50px; }
.factory-grid-row { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-top: 20px; }
.factory-card-thumb {
  border-radius: var(--radius-lg);
  border: 1px solid #e2e8f0;
  background: #fff;
  overflow: hidden;
  cursor: pointer;
  box-shadow: var(--shadow-sm);
  transition: transform 0.3s, box-shadow 0.3s, border-color 0.3s;
}
.factory-card-thumb:hover { border-color: var(--primary); transform: translateY(-6px); box-shadow: 0 12px 30px rgba(26,111,196,0.15); }
.thumb-img-box { height: 220px; background: #0f172a; position: relative; overflow: hidden; }
.thumb-img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center top;
  filter: brightness(1.05) contrast(1.08);
  transition: transform 0.5s, filter 0.5s;
}
.factory-card-thumb:hover .thumb-img { filter: brightness(1.12) contrast(1.12); transform: scale(1.08); }
.thumb-overlay {
  position: absolute;
  inset: 0;
  background: rgba(15,23,42,0.50);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s;
}
.factory-card-thumb:hover .thumb-overlay { opacity: 1; }
.zoom-badge {
  background: var(--gradient-primary);
  color: #fff;
  border-radius: 20px;
  padding: 8px 18px;
  font-size: 13px;
  font-weight: 700;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.30);
}
.thumb-info { background: #fff; padding: 14px 18px; display: flex; align-items: center; gap: 10px; font-size: 13px; font-weight: 700; color: #0f172a; }
.thumb-info i { color: var(--primary); font-size: 14px; }
.factory-highlights {
  display: flex;
  overflow: hidden;
  border-radius: var(--radius-lg);
  border: 1px solid #e2e8f0;
  box-shadow: var(--shadow-sm);
  background: #fff;
  justify-content: center;
  margin-top: 28px;
}
.fh-item { flex: 1; display: flex; align-items: center; justify-content: center; gap: 10px; padding: 16px 12px; font-size: 13.5px; font-weight: 700; color: #0f172a; border-right: 1px solid #e2e8f0; transition: var(--transition); }
.fh-item:last-child { border-right: none; }
.fh-item i { color: var(--primary); font-size: 17px; }
.fh-item:hover { color: var(--primary); background: rgba(26,111,196,0.05); }

/* ===== WHAT MAKES US DIFFERENT ===== */
.why-section { background: #fff; padding: 50px 0; }
.why-grid { display: grid; grid-template-columns: repeat(6, 1fr); gap: 16px; }
.why-card {
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: var(--radius);
  padding: 28px 20px;
  text-align: center;
  transition: var(--transition);
}
.why-card:hover { background: #fff; border-color: var(--primary-light); box-shadow: var(--shadow-sm); transform: translateY(-5px); }
.why-icon {
  width: 50px;
  height: 50px;
  border-radius: 12px;
  background: var(--gradient-primary);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  margin: 0 auto 14px;
}
.why-card h3 { color: #0f172a; font-size: 15px; font-weight: 700; margin-bottom: 8px; }
.why-card p { color: #64748b; font-size: 13px; line-height: 1.6; }

/* ===== MISSION & VISION ===== */
.mv-section { background: #f8fafc; padding: 50px 0; }
.mv-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 28px; }
.mv-card {
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: var(--radius-lg);
  padding: 36px 28px;
  box-shadow: var(--shadow-sm);
  transition: var(--transition);
}
.mv-card:hover { box-shadow: var(--shadow-hover); transform: translateY(-4px); }
.mvc-icon {
  width: 56px;
  height: 56px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  margin-bottom: 18px;
}
.mvc-icon.mission { background: var(--gradient-primary); color: #fff; }
.mvc-icon.vision { background: linear-gradient(135deg, #0284c7, #38bdf8); color: #fff; }
.mv-card h3 { color: #0f172a; font-size: 20px; font-weight: 800; margin-bottom: 12px; font-family: 'Outfit', sans-serif; }
.mv-card p { color: #64748b; font-size: 14.5px; line-height: 1.8; }

/* ===== LIGHTBOX ===== */
.lightbox-backdrop {
  position: fixed;
  inset: 0;
  z-index: 99999;
  background: rgba(15, 23, 42, 0.94);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
}
.lightbox-close {
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 20;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: rgba(15, 23, 42, 0.70);
  border: 1.5px solid rgba(255, 255, 255, 0.35);
  color: #fff;
  font-size: 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  box-shadow: 0 4px 14px rgba(0,0,0,0.5);
}
.lightbox-close:hover { background: #ef4444; border-color: #ef4444; transform: scale(1.1); }
.lightbox-content {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #1e293b;
  border: 1px solid rgba(255, 255, 255, 0.20);
  border-radius: 16px;
  overflow: hidden;
  max-width: 95vw;
  max-height: 94vh;
  width: fit-content;
  box-shadow: 0 25px 60px rgba(0, 0, 0, 0.70);
}
.lightbox-img-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  background: #0f172a;
  overflow: hidden;
}
.lightbox-img {
  display: block;
  width: auto;
  max-width: 94vw;
  height: auto;
  max-height: 72vh;
  object-fit: contain;
}
.lightbox-nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 15;
  width: 46px;
  height: 46px;
  border-radius: 50%;
  background: rgba(15, 23, 42, 0.75);
  backdrop-filter: blur(6px);
  border: 1.5px solid rgba(255, 255, 255, 0.40);
  color: #fff;
  font-size: 18px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.6);
  transition: all 0.2s ease;
}
.lightbox-nav.prev { left: 14px; }
.lightbox-nav.next { right: 14px; }
.lightbox-nav:hover, .lightbox-nav:active {
  background: var(--primary);
  border-color: #fff;
  transform: translateY(-50%) scale(1.1);
  box-shadow: 0 6px 20px rgba(26, 111, 196, 0.6);
}
.lightbox-caption-box { background: #1e293b; color: #fff; text-align: center; padding: 16px 20px 20px; width: 100%; box-sizing: border-box; }
.lightbox-caption-box h3 { color: #fff; font-size: 15px; font-weight: 700; margin-bottom: 4px; display: flex; align-items: center; justify-content: center; gap: 8px; }
.lightbox-caption-box h3 i { color: #38bdf8; }
.lightbox-caption-box p { color: #cbd5e1; font-size: 13.5px; line-height: 1.4; margin: 0 0 8px; }
.photo-count { display: inline-block; background: rgba(56, 189, 248, 0.15); color: #38bdf8; border-radius: 12px; padding: 3px 12px; font-size: 12px; font-weight: 700; }
.lightbox-fade-enter-active, .lightbox-fade-leave-active { transition: opacity 0.3s; }
.lightbox-fade-enter-from, .lightbox-fade-leave-to { opacity: 0; }

/* ===== CTA ===== */
.cta-banner { background: var(--gradient-primary); color: #fff; padding: 50px 0; }
.cta-inner { display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 24px; }
.cta-inner h2 { margin-bottom: 6px; font-family: 'Outfit', sans-serif; font-size: clamp(22px,3.5vw,30px); font-weight: 800; }
.cta-inner p { opacity: 0.9; font-size: 15px; }
.cta-btns { display: flex; flex-wrap: wrap; gap: 14px; }
.btn-light-cta { color: var(--primary); background: #fff; font-weight: 700; }

/* ===== REVIEWS / TESTIMONIALS ===== */
.reviews-section { background: #fff; padding: 60px 0; }
.reviews-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}
.review-card {
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: var(--radius-lg);
  padding: 28px 24px;
  display: flex;
  flex-direction: column;
  box-shadow: var(--shadow-sm);
  transition: transform 0.3s, box-shadow 0.3s, border-color 0.3s;
}
.review-card:hover {
  transform: translateY(-6px);
  border-color: var(--primary);
  box-shadow: 0 12px 30px rgba(26,111,196,0.12);
  background: #fff;
}
.review-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
}
.review-quote-icon {
  font-size: 24px;
  color: rgba(26, 111, 196, 0.25);
}
.review-stars {
  color: #f59e0b;
  font-size: 15px;
  display: flex;
  gap: 3px;
}
.review-comment {
  color: #334155;
  font-size: 14px;
  line-height: 1.7;
  font-style: italic;
  flex: 1;
  margin-bottom: 20px;
}
.review-author {
  display: flex;
  align-items: center;
  gap: 12px;
  padding-top: 16px;
  border-top: 1px solid #e2e8f0;
}
.author-avatar {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: rgba(26, 111, 196, 0.10);
  color: var(--primary);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  flex-shrink: 0;
}
.author-details {
  display: flex;
  flex-direction: column;
}
.author-name {
  color: #0f172a;
  font-size: 15px;
  font-weight: 700;
  margin: 0;
  line-height: 1.2;
}
.author-role {
  color: var(--primary);
  font-size: 12px;
  font-weight: 600;
  margin-top: 2px;
}
.author-company {
  color: #64748b;
  font-size: 11.5px;
}


/* ===== RESPONSIVE MEDIA QUERIES (ABOUT PAGE ONLY) ===== */
@media (max-width: 1200px) {
  .why-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 992px) {
  .about-detail-grid {
    grid-template-columns: 1fr;
    gap: 36px;
  }
  .about-img-col {
    order: 1;
  }
  .about-content-box {
    order: 2;
  }
  .factory-grid-row {
    grid-template-columns: repeat(2, 1fr);
  }
  .factory-highlights {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    overflow: visible;
  }
  .fh-item {
    border-right: 1px solid #e2e8f0;
    border-bottom: 1px solid #e2e8f0;
  }
  .fh-item:nth-child(3n) {
    border-right: none;
  }
  .reviews-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .about-section {
    padding-bottom: 10px;
  }
  .about-top-header {
    margin-bottom: 24px;
  }
  .why-section, .mv-section {
    padding: 40px 0;
  }
  .why-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 14px;
  }
  .mv-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }
  .cta-inner {
    flex-direction: column;
    text-align: center;
    gap: 20px;
  }
  .cta-btns {
    justify-content: center;
    width: 100%;
  }
}

@media (max-width: 600px) {
  .factory-grid-row {
    grid-template-columns: 1fr;
    gap: 16px;
  }
  .factory-highlights {
    grid-template-columns: repeat(2, 1fr);
  }
  .fh-item {
    border-right: 1px solid #e2e8f0;
    border-bottom: 1px solid #e2e8f0;
  }
  .fh-item:nth-child(3n) {
    border-right: 1px solid #e2e8f0;
  }
  .fh-item:nth-child(2n) {
    border-right: none;
  }
  .reviews-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 480px) {
  .about-detail-grid {
    gap: 28px;
  }
  .acb-card {
    padding: 24px 18px;
    max-width: 100%;
  }
  .acb-name {
    font-size: 18px;
  }
  .acb-badge {
    font-size: 11.5px;
    padding: 4px 12px;
    white-space: normal;
  }
  .acb-motto {
    font-size: 11.5px;
  }
  .about-badges {
    flex-direction: column;
    align-items: stretch;
    margin-top: 16px;
    margin-bottom: 20px;
  }
  .about-badge-item {
    justify-content: center;
    width: 100%;
  }
  .about-cta-row {
    flex-direction: column;
    width: 100%;
    gap: 10px;
  }
  .about-cta-row .btn {
    width: 100%;
    justify-content: center;
  }
  .why-grid {
    grid-template-columns: 1fr;
    gap: 12px;
  }
  .why-card {
    padding: 20px 16px;
  }
  .mv-card {
    padding: 24px 20px;
  }
  .factory-highlights {
    grid-template-columns: 1fr;
  }
  .fh-item {
    border-right: none;
    border-bottom: 1px solid #e2e8f0;
    justify-content: flex-start;
    padding: 12px 16px;
  }
  .fh-item:last-child {
    border-bottom: none;
  }
  .cta-btns {
    flex-direction: column;
    align-items: stretch;
  }
  .cta-btns .btn {
    width: 100%;
    justify-content: center;
  }
  .thumb-img-box {
    height: 190px;
  }
  /* Lightbox Mobile Adjustments */
  .lightbox-backdrop {
    padding: 8px;
  }
  .lightbox-close {
    top: 12px;
    right: 12px;
    width: 36px;
    height: 36px;
    font-size: 16px;
  }
  .lightbox-nav {
    width: 38px;
    height: 38px;
    font-size: 14px;
  }
  .lightbox-nav.prev {
    left: 8px;
  }
  .lightbox-nav.next {
    right: 8px;
  }
  .lightbox-caption-box {
    padding: 12px 14px 16px;
  }
  .lightbox-caption-box h3 {
    font-size: 13.5px;
  }
  .lightbox-img {
    max-height: 60vh;
  }
}
</style>
