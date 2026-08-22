<template>
  <Navbar />


  <!-- Products Grid -->
  <section class="section products-section">
    <div class="container">
      <div class="products-grid">
        <div
          v-for="product in products"
          :key="product.id"
          class="product-card"
          @click="openModal(product)"
        >
          <div class="prod-img-box">
            <img :src="product.image" :alt="product.name" class="prod-img" />
            <div class="prod-badge-overlay">Click to View Details</div>
          </div>
          <div class="product-info">
            <h3 class="prod-title">{{ product.name }}</h3>
            <p class="prod-desc">{{ product.desc }}</p>
            <div v-if="product.motto" class="prod-motto">
              <i class="fas fa-check-circle"></i> {{ product.motto.split('|')[0].trim() }}
            </div>
            <button class="btn-details">
              <i class="fas fa-eye"></i> View Details
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Product Modal -->
  <Teleport to="body">
    <Transition name="modal-fade">
      <div v-if="selectedProduct" class="modal-overlay" @click.self="closeModal">
        <div class="product-modal">
          <button class="modal-close" @click="closeModal" aria-label="Close modal">
            <i class="fas fa-times"></i>
          </button>

          <div class="product-modal-scroll">
            <div class="modal-img-wrap">
              <img :src="selectedProduct.image" :alt="selectedProduct.name" />
            </div>

            <div class="modal-body">
              <span class="modal-badge">{{ selectedProduct.name }}</span>
              <h2>{{ selectedProduct.name }}</h2>
              <p class="modal-desc">{{ selectedProduct.fullDesc }}</p>

              <div v-if="selectedProduct.motto" class="modal-motto-banner">
                <i class="fas fa-star"></i> {{ selectedProduct.motto }}
              </div>

              <!-- Sub Products -->
              <div v-if="selectedProduct.subProducts" class="modal-block">
                <h4><i class="fas fa-list"></i> Products / Variants</h4>
                <div class="tag-grid">
                  <span v-for="sp in selectedProduct.subProducts" :key="sp" class="tag-pill">
                    <i class="fas fa-check"></i> {{ sp }}
                  </span>
                </div>
              </div>

              <!-- Materials -->
              <div v-if="selectedProduct.materials" class="modal-block">
                <h4><i class="fas fa-layer-group"></i> Materials Used</h4>
                <div class="materials-list">
                  <span v-for="m in selectedProduct.materials" :key="m" class="mat-badge">{{ m }}</span>
                </div>
              </div>

              <!-- Features -->
              <div v-if="selectedProduct.features" class="modal-block">
                <h4><i class="fas fa-star"></i> Key Features</h4>
                <ul class="modal-features-list">
                  <li v-for="f in selectedProduct.features" :key="f">
                    <i class="fas fa-check-circle"></i> {{ f }}
                  </li>
                </ul>
              </div>

              <!-- Applications -->
              <div v-if="selectedProduct.applications" class="modal-block">
                <h4><i class="fas fa-industry"></i> Applications</h4>
                <div class="app-grid">
                  <span v-for="app in selectedProduct.applications" :key="app" class="app-chip">
                    <i class="fas fa-check"></i> {{ app }}
                  </span>
                </div>
              </div>

              <!-- CTA Actions -->
              <div class="modal-actions">
                <a
                  :href="info.whatsappUrl"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="btn btn-whatsapp btn-lg"
                >
                  <i class="fab fa-whatsapp"></i> Enquire on WhatsApp
                </a>
                <a :href="info.phoneUrl" class="btn btn-primary btn-lg">
                  <i class="fas fa-phone-alt"></i> Call Now (+91 99791 70404)
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>

  <!-- CTA Banner -->
  <section class="cta-banner">
    <div class="container cta-inner">
      <div class="cta-text">
        <i class="fas fa-hard-hat cta-icon"></i>
        <div>
          <h2>Looking for Custom Fabrication?</h2>
          <p>Contact NECTRA SERVICES for a free consultation and quotation today.</p>
        </div>
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
import { ref } from 'vue'
import Navbar from '../components/common/Navbar.vue'
import Footer from '../components/common/Footer.vue'
import products from '../data/products.js'
import businessInfo from '../data/businessInfo.js'

const info = businessInfo
const selectedProduct = ref(null)

function openModal(product) {
  selectedProduct.value = product
  document.body.style.overflow = 'hidden'
}
function closeModal() {
  selectedProduct.value = null
  document.body.style.overflow = ''
}
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

.products-section { background: #fff; }
.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  gap: 28px;
}
.product-card {
  display: flex;
  flex-direction: column;
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: var(--radius);
  box-shadow: var(--shadow-sm);
  overflow: hidden;
  cursor: pointer;
  transition: var(--transition);
}
.product-card:hover { box-shadow: var(--shadow-hover); border-color: var(--primary-light); transform: translateY(-6px); }
.prod-img-box { height: 260px; background: #f8fafc; position: relative; overflow: hidden; }
.prod-img { width: 100%; height: 100%; object-fit: contain; padding: 12px; transition: var(--transition); }
.product-card:hover .prod-img { transform: scale(1.04); }
.prod-badge-overlay {
  position: absolute;
  inset: 0;
  background: rgba(26,111,196,0.88);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 600;
  opacity: 0;
  transition: var(--transition);
}
.product-card:hover .prod-badge-overlay { opacity: 1; }
.product-info { flex: 1; padding: 24px; display: flex; flex-direction: column; }
.prod-title { color: #0f172a; font-size: 19px; font-weight: 800; margin-bottom: 10px; line-height: 1.3; }
.prod-desc { color: #64748b; font-size: 14px; line-height: 1.6; flex: 1; margin-bottom: 16px; }
.prod-motto {
  color: var(--primary);
  background: rgba(26,111,196,0.08);
  border-radius: 6px;
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  font-size: 11.5px;
  font-weight: 700;
  margin-bottom: 16px;
}
.btn-details {
  background: var(--gradient-primary);
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 12px 20px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  transition: var(--transition);
}
.btn-details:hover { box-shadow: var(--shadow-primary); transform: translateY(-2px); }

/* Modal */
.modal-overlay {
  position: fixed;
  inset: 0;
  z-index: 9999;
  background: rgba(15,23,42,0.80);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}
.product-modal {
  background: #fff;
  border-radius: var(--radius-lg);
  width: 100%;
  max-width: 760px;
  max-height: 90vh;
  position: relative;
  box-shadow: 0 25px 50px -12px rgba(0,0,0,0.30);
  overflow: hidden;
}
.product-modal-scroll {
  max-height: 90vh;
  overflow-y: auto;
  width: 100%;
  box-sizing: border-box;
}
.product-modal-scroll::-webkit-scrollbar {
  width: 6px;
}
.product-modal-scroll::-webkit-scrollbar-track {
  background: transparent;
}
.product-modal-scroll::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 10px;
}
.product-modal-scroll::-webkit-scrollbar-thumb:hover {
  background: var(--primary);
}
.modal-close {
  position: absolute;
  top: 16px;
  right: 16px;
  z-index: 20;
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background: rgba(15,23,42,0.60);
  border: none;
  color: #fff;
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: var(--transition);
  box-shadow: 0 2px 8px rgba(0,0,0,0.3);
}
.modal-close:hover { background: #ef4444; }
.modal-img-wrap { width: 100%; height: 320px; padding: 20px; background: #f8fafc; border-bottom: 1px solid #e2e8f0; }
.modal-img-wrap img { object-fit: contain; width: 100%; height: 100%; }
.modal-body { padding: 32px; }
.modal-badge {
  display: inline-block;
  color: var(--primary);
  background: rgba(26,111,196,0.10);
  border-radius: 20px;
  padding: 4px 12px;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 1.5px;
  margin-bottom: 8px;
}
.modal-body h2 { color: #0f172a; font-family: 'Outfit', sans-serif; font-size: 26px; font-weight: 800; margin-bottom: 12px; }
.modal-desc { color: #475569; font-size: 15px; line-height: 1.7; margin-bottom: 24px; }
.modal-motto-banner {
  background: var(--gradient-primary);
  color: #fff;
  border-radius: 10px;
  padding: 12px 20px;
  font-size: 14px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-bottom: 24px;
}
.modal-block { margin-bottom: 24px; }
.modal-block h4 {
  color: #0f172a;
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  gap: 8px;
}
.modal-block h4 i { color: var(--primary); }
.tag-grid { display: flex; flex-wrap: wrap; gap: 8px; }
.tag-pill {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 14px;
  background: #f1f5f9;
  border: 1px solid #cbd5e1;
  border-radius: 20px;
  color: #1e293b;
  font-size: 13px;
  font-weight: 600;
}
.tag-pill i { color: var(--primary); }
.materials-list { display: flex; flex-wrap: wrap; gap: 8px; }
.mat-badge { background: #0f172a; color: #38bdf8; border-radius: 6px; padding: 6px 14px; font-size: 13px; font-weight: 700; }
.modal-features-list { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; list-style: none; }
.modal-features-list li { display: flex; align-items: flex-start; gap: 8px; font-size: 13.5px; color: #334155; line-height: 1.4; }
.modal-features-list i { color: var(--primary); flex-shrink: 0; margin-top: 3px; }
.app-grid { display: flex; flex-wrap: wrap; gap: 8px; }
.app-chip {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  background: #f0fdf4;
  border: 1px solid #bbf7d0;
  border-radius: 6px;
  color: #166534;
  font-size: 13px;
  font-weight: 600;
}
.app-chip i { color: #22c55e; }
.modal-actions { display: flex; flex-wrap: wrap; gap: 14px; }

/* Modal transition */
.modal-fade-enter-active, .modal-fade-leave-active { transition: opacity 0.3s; }
.modal-fade-enter-from, .modal-fade-leave-to { opacity: 0; }

/* CTA */
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
.cta-text h2 { font-family: 'Outfit', sans-serif; font-size: clamp(22px,3.5vw,30px); font-weight: 800; margin-bottom: 6px; }
.cta-text p { opacity: 0.9; font-size: 15px; }
.cta-btns { display: flex; flex-wrap: wrap; gap: 14px; }
.btn-light-cta { color: var(--primary); background: #fff; font-weight: 700; }

@media (max-width: 768px) {
  .products-grid { grid-template-columns: 1fr; }
  .modal-overlay { padding: 12px; }
  .modal-body { padding: 24px 18px; }
  .modal-img-wrap { height: 240px; padding: 12px; }
  .modal-features-list { grid-template-columns: 1fr; }
  .modal-actions { flex-direction: column; }
  .cta-inner { text-align: center; flex-direction: column; justify-content: center; }
  .cta-text { text-align: center; flex-direction: column; }
  .cta-btns { justify-content: center; }
}

@media (max-width: 480px) {
  .modal-overlay { padding: 8px; }
  .modal-close { top: 10px; right: 10px; width: 34px; height: 34px; font-size: 15px; }
  .modal-img-wrap { height: 200px; }
  .modal-body { padding: 18px 14px; }
  .modal-body h2 { font-size: 22px; }
  .modal-actions .btn { width: 100%; justify-content: center; }
}
</style>
