<template>

  <!-- Main Navbar -->
  <nav :class="['navbar', { scrolled: isScrolled }]">
    <div class="container nav-inner">
      <RouterLink to="/" class="nav-logo">
        <div class="logo-icon">
          <img src="/images/nectra-logo-mark.png" alt="NECTRA SERVICES Logo" class="logo-img" />
        </div>
        <div class="logo-text">
          <span class="logo-name">NECTRA</span>
          <span class="logo-sub">SERVICES</span>
        </div>
      </RouterLink>

      <button
        class="hamburger"
        @click="menuOpen = !menuOpen"
        :aria-expanded="menuOpen"
        aria-label="Toggle menu"
      >
        <span :class="{ open: menuOpen }"></span>
        <span :class="{ open: menuOpen }"></span>
        <span :class="{ open: menuOpen }"></span>
      </button>

      <ul :class="['nav-links', { open: menuOpen }]">
        <li v-for="link in navLinks" :key="link.to">
          <RouterLink
            :to="link.to"
            :class="{ active: isActive(link.to) }"
            @click="menuOpen = false"
          >{{ link.label }}</RouterLink>
        </li>
        <li>
          <button class="nav-pdf-btn" @click="downloadPDF" :disabled="pdfLoading" id="nav-company-profile-btn" title="Company Profile PDF" aria-label="Download Company Profile PDF">
            <i class="fas fa-file-pdf"></i>
            <span class="pdf-btn-text">Company Profile</span>
          </button>
        </li>
        <li>
          <RouterLink to="/contact" class="nav-cta" @click="menuOpen = false">
            <i class="fas fa-paper-plane"></i> Get a Quote
          </RouterLink>
        </li>
      </ul>
    </div>
  </nav>

  <!-- PDF Progress Modal -->
  <Teleport to="body">
    <Transition name="modal-fade">
      <div v-if="pdfLoading || pdfDone || pdfError" class="pdf-modal-overlay" @click.self="closePdfModal">
        <div class="pdf-modal">
          <!-- Header -->
          <div class="pdf-modal-header">
            <div class="pdf-modal-logo">
              <img src="/images/nectra-logo-mark.png" alt="NECTRA" class="pdf-modal-logo-img" />
            </div>
            <div>
              <div class="pdf-modal-title">NECTRA SERVICES</div>
              <div class="pdf-modal-subtitle">Company Profile PDF</div>
            </div>
          </div>

          <!-- Content -->
          <div class="pdf-modal-body">
            <!-- Loading State -->
            <template v-if="pdfLoading && !pdfDone && !pdfError">
              <div class="pdf-spinner-wrap">
                <div class="pdf-spinner">
                  <div class="pdf-spinner-ring"></div>
                  <i class="fas fa-file-pdf pdf-spinner-icon"></i>
                </div>
              </div>
              <div class="pdf-status-text">{{ pdfStatus }}</div>
              <div class="pdf-progress-bar-wrap">
                <div class="pdf-progress-bar" :style="{ width: pdfProgress + '%' }"></div>
              </div>
              <div class="pdf-progress-label">{{ pdfProgress }}% complete</div>
              <div class="pdf-pages-info">
                <span class="pdf-page-badge"><i class="fas fa-file"></i> 13 Pages</span>
                <span class="pdf-page-badge"><i class="fas fa-images"></i> All Photos</span>
                <span class="pdf-page-badge"><i class="fas fa-box"></i> 7 Products</span>
                <span class="pdf-page-badge"><i class="fas fa-layer-group"></i> Full Details</span>
              </div>
            </template>

            <!-- Done State -->
            <template v-if="pdfDone">
              <div class="pdf-done-icon">
                <i class="fas fa-check-circle"></i>
              </div>
              <div class="pdf-done-title">Download Complete!</div>
              <div class="pdf-done-desc">
                Your <strong>Nectra Services Company Profile</strong> has been downloaded successfully.
              </div>
              <div class="pdf-done-file">
                <i class="fas fa-file-pdf"></i>
                Nectra_Services_Company_Profile.pdf
              </div>
              <button class="pdf-close-btn" @click="closePdfModal">
                <i class="fas fa-times"></i> Close
              </button>
            </template>

            <!-- Error State -->
            <template v-if="pdfError">
              <div class="pdf-error-icon">
                <i class="fas fa-exclamation-circle"></i>
              </div>
              <div class="pdf-error-title">Generation Failed</div>
              <div class="pdf-error-desc">{{ pdfError }}</div>
              <div class="pdf-error-actions">
                <button class="pdf-retry-btn" @click="downloadPDF">
                  <i class="fas fa-redo"></i> Try Again
                </button>
                <button class="pdf-close-btn-outline" @click="closePdfModal">
                  <i class="fas fa-times"></i> Close
                </button>
              </div>
            </template>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>

</template>

<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { onMounted, onUnmounted } from 'vue'
import { generateCompanyProfilePDF } from '../../utils/pdfGenerator.js'

const route = useRoute()
const menuOpen = ref(false)
const isScrolled = ref(false)

// PDF state
const pdfLoading  = ref(false)
const pdfDone     = ref(false)
const pdfError    = ref(null)
const pdfStatus   = ref('Preparing your company profile...')
const pdfProgress = ref(0)

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'About Us', to: '/about' },
  { label: 'Services', to: '/services' },
  { label: 'Products', to: '/products' },
  { label: 'Contact Us', to: '/contact' },
]

function isActive(path) {
  return path === '/' ? route.path === '/' : route.path === path
}

function handleScroll() {
  isScrolled.value = window.scrollY > 30
}

onMounted(() => window.addEventListener('scroll', handleScroll))
onUnmounted(() => window.removeEventListener('scroll', handleScroll))

async function downloadPDF() {
  menuOpen.value = false
  pdfLoading.value = true
  pdfDone.value    = false
  pdfError.value   = null
  pdfProgress.value = 0
  pdfStatus.value  = 'Preparing your company profile...'

  try {
    await generateCompanyProfilePDF((message, progress) => {
      pdfStatus.value   = message
      pdfProgress.value = progress
    })
    pdfLoading.value  = false
    pdfDone.value     = true
    pdfProgress.value = 100
  } catch (err) {
    pdfLoading.value = false
    pdfError.value   = 'Something went wrong while generating the PDF. Please try again.'
    console.error(err)
  }
}

function closePdfModal() {
  if (pdfLoading.value) return // Don't close while loading
  pdfDone.value  = false
  pdfError.value = null
}
</script>

<style scoped>

/* Navbar */
.navbar {
  position: sticky;
  top: 0;
  z-index: 1000;
  background: rgba(255, 255, 255, 0.97);
  border-bottom: 1px solid var(--border-light);
  transition: var(--transition);
  backdrop-filter: blur(10px);
}
.navbar.scrolled {
  box-shadow: 0 4px 20px rgba(15, 23, 42, 0.10);
}
.nav-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 12px;
  padding-bottom: 12px;
}
.nav-logo {
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
}
.logo-icon {
  width: 42px;
  height: 42px;
  border-radius: 10px;
  overflow: hidden;
  flex-shrink: 0;
}
.logo-img {
  width: 42px;
  height: 42px;
  object-fit: contain;
}
.logo-text {
  display: flex;
  flex-direction: column;
  line-height: 1.1;
}
.logo-name {
  font-family: 'Outfit', sans-serif;
  font-weight: 900;
  font-size: 20px;
  color: var(--primary);
  letter-spacing: 1px;
}
.logo-sub {
  font-size: 10px;
  font-weight: 600;
  color: var(--text-muted);
  letter-spacing: 2px;
  text-transform: uppercase;
}
.nav-links {
  display: flex;
  align-items: center;
  gap: 4px;
  list-style: none;
}
.nav-links a {
  color: var(--text-main);
  font-size: 14px;
  font-weight: 500;
  padding: 8px 14px;
  border-radius: 8px;
  text-decoration: none;
  transition: var(--transition);
}
.nav-links a:hover, .nav-links a.active {
  color: var(--primary);
  background: #1a6fc410;
}
.nav-cta {
  background: var(--gradient-primary) !important;
  color: #fff !important;
  box-shadow: var(--shadow-primary);
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 9px 18px !important;
}
.nav-cta:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(26, 111, 196, 0.45) !important;
}

/* PDF Button */
.nav-pdf-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  background: none;
  border: 1.5px solid #0B6CB8;
  color: #0B6CB8;
  border-radius: 8px;
  cursor: pointer;
  font-family: inherit;
  transition: all 0.2s ease;
  margin-left: 6px;
  margin-right: 8px;
}
.nav-pdf-btn .pdf-btn-text {
  display: none;
}
.nav-pdf-btn:hover:not(:disabled) {
  background: #0B6CB8;
  color: #fff;
  transform: translateY(-1px);
  box-shadow: 0 4px 14px rgba(11, 108, 184, 0.35);
}
.nav-pdf-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
.nav-pdf-btn i { font-size: 16px; }

/* Hamburger */
.hamburger {
  display: none;
  flex-direction: column;
  gap: 5px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 6px;
  border-radius: 6px;
}
.hamburger span {
  display: block;
  height: 2px;
  width: 24px;
  background: var(--text-main);
  border-radius: 2px;
  transition: all 0.3s;
}
.hamburger span.open:nth-child(1) { transform: translateY(7px) rotate(45deg); }
.hamburger span.open:nth-child(2) { opacity: 0; }
.hamburger span.open:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

/* ─── PDF Modal ─────────────────────────────────────────────── */
.pdf-modal-overlay {
  position: fixed;
  inset: 0;
  z-index: 9999;
  background: rgba(7, 20, 38, 0.75);
  backdrop-filter: blur(6px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.pdf-modal {
  background: #fff;
  border-radius: 20px;
  width: 100%;
  max-width: 460px;
  box-shadow: 0 24px 64px rgba(7, 20, 38, 0.45);
  overflow: hidden;
}

.pdf-modal-header {
  background: linear-gradient(135deg, #071426 0%, #0B6CB8 100%);
  padding: 20px 24px;
  display: flex;
  align-items: center;
  gap: 14px;
}
.pdf-modal-logo {
  width: 44px;
  height: 44px;
  background: rgba(255,255,255,0.12);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.pdf-modal-logo-img {
  width: 32px;
  height: 32px;
  object-fit: contain;
}
.pdf-modal-title {
  font-family: 'Outfit', sans-serif;
  font-weight: 800;
  font-size: 17px;
  color: #fff;
  letter-spacing: 0.5px;
}
.pdf-modal-subtitle {
  font-size: 12px;
  color: #00B0C4;
  font-weight: 500;
  margin-top: 2px;
}

.pdf-modal-body {
  padding: 28px 24px 24px;
  text-align: center;
}

/* Spinner */
.pdf-spinner-wrap {
  display: flex;
  justify-content: center;
  margin-bottom: 18px;
}
.pdf-spinner {
  position: relative;
  width: 72px;
  height: 72px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.pdf-spinner-ring {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  border: 4px solid #e2e8f0;
  border-top-color: #0B6CB8;
  border-right-color: #00B0C4;
  animation: pdf-spin 1s linear infinite;
}
@keyframes pdf-spin {
  to { transform: rotate(360deg); }
}
.pdf-spinner-icon {
  color: #0B6CB8;
  font-size: 26px;
  z-index: 1;
}

.pdf-status-text {
  font-size: 14px;
  color: #334155;
  font-weight: 500;
  margin-bottom: 14px;
}

.pdf-progress-bar-wrap {
  background: #e2e8f0;
  border-radius: 100px;
  height: 8px;
  overflow: hidden;
  margin-bottom: 6px;
}
.pdf-progress-bar {
  height: 100%;
  background: linear-gradient(90deg, #0B6CB8, #00B0C4);
  border-radius: 100px;
  transition: width 0.4s ease;
}
.pdf-progress-label {
  font-size: 12px;
  color: #64748b;
  margin-bottom: 16px;
}

.pdf-pages-info {
  display: flex;
  justify-content: center;
  gap: 8px;
  flex-wrap: wrap;
}
.pdf-page-badge {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  background: #f0f7ff;
  border: 1px solid #bfdbfe;
  color: #0B6CB8;
  font-size: 11.5px;
  font-weight: 600;
  padding: 4px 10px;
  border-radius: 20px;
}

/* Done */
.pdf-done-icon {
  font-size: 56px;
  color: #16a34a;
  margin-bottom: 12px;
  animation: done-pop 0.4s ease;
}
@keyframes done-pop {
  0% { transform: scale(0.5); opacity: 0; }
  70% { transform: scale(1.15); }
  100% { transform: scale(1); opacity: 1; }
}
.pdf-done-title {
  font-family: 'Outfit', sans-serif;
  font-size: 20px;
  font-weight: 800;
  color: #0f172a;
  margin-bottom: 8px;
}
.pdf-done-desc {
  font-size: 14px;
  color: #475569;
  margin-bottom: 14px;
  line-height: 1.5;
}
.pdf-done-file {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: #f0f7ff;
  border: 1px solid #bfdbfe;
  color: #0B6CB8;
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 600;
  margin-bottom: 20px;
}
.pdf-done-file i { color: #dc2626; }
.pdf-close-btn {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  background: linear-gradient(135deg, #071426, #0B6CB8);
  color: #fff;
  border: none;
  padding: 11px 28px;
  border-radius: 9px;
  font-size: 14px;
  font-weight: 600;
  font-family: inherit;
  cursor: pointer;
  transition: all 0.2s;
}
.pdf-close-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(11, 108, 184, 0.4);
}

/* Error */
.pdf-error-icon {
  font-size: 52px;
  color: #dc2626;
  margin-bottom: 12px;
}
.pdf-error-title {
  font-family: 'Outfit', sans-serif;
  font-size: 18px;
  font-weight: 800;
  color: #0f172a;
  margin-bottom: 8px;
}
.pdf-error-desc {
  font-size: 13.5px;
  color: #64748b;
  margin-bottom: 20px;
  line-height: 1.5;
}
.pdf-error-actions {
  display: flex;
  justify-content: center;
  gap: 10px;
  flex-wrap: wrap;
}
.pdf-retry-btn {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  background: #0B6CB8;
  color: #fff;
  border: none;
  padding: 10px 22px;
  border-radius: 9px;
  font-size: 14px;
  font-weight: 600;
  font-family: inherit;
  cursor: pointer;
  transition: all 0.2s;
}
.pdf-retry-btn:hover { background: #0a5a9e; transform: translateY(-1px); }
.pdf-close-btn-outline {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  background: transparent;
  color: #64748b;
  border: 1.5px solid #cbd5e1;
  padding: 10px 22px;
  border-radius: 9px;
  font-size: 14px;
  font-weight: 600;
  font-family: inherit;
  cursor: pointer;
  transition: all 0.2s;
}
.pdf-close-btn-outline:hover { border-color: #94a3b8; background: #f8fafc; }

/* Modal transition */
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: all 0.25s ease;
}
.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}
.modal-fade-enter-from .pdf-modal,
.modal-fade-leave-to .pdf-modal {
  transform: scale(0.94) translateY(10px);
}

@media (max-width: 768px) {
  .hamburger { display: flex; }
  .nav-links {
    display: none;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: #fff;
    flex-direction: column;
    align-items: stretch;
    padding: 16px;
    border-bottom: 1px solid var(--border-light);
    box-shadow: 0 8px 24px rgba(15,23,42,0.10);
    gap: 4px;
  }
  .nav-links.open { display: flex; }
  .nav-links a { border-radius: 8px; }
  .nav-pdf-btn { width: 100%; height: 42px; gap: 8px; justify-content: center; margin: 0; }
  .nav-pdf-btn .pdf-btn-text { display: inline; font-size: 14px; font-weight: 600; }
  .navbar { position: relative; }
}
</style>
