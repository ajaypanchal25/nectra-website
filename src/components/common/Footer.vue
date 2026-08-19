<template>
  <footer class="footer">
    <div class="footer-top">
      <div class="container footer-grid">
        <!-- Brand -->
        <div class="footer-brand">
          <RouterLink to="/" class="footer-logo">
            <div class="footer-logo-icon">
              <img src="/images/nectra-logo-mark.png" alt="NECTRA SERVICES Logo" class="footer-logo-img" />
            </div>
            <div>
              <span class="footer-logo-name">NECTRA</span>
              <span class="footer-logo-sub">SERVICES</span>
            </div>
          </RouterLink>
          <p class="footer-desc">
            MS &amp; SS Fabrication Specialist based in Ahmedabad, Gujarat.
            15+ years of precision, quality &amp; timely delivery.
          </p>
          <div class="footer-quick-contact">
            <a :href="info.phoneUrl">
              <i class="fas fa-phone-alt"></i> {{ info.phone }}
            </a>
            <a :href="info.gmailUrl" target="_blank" rel="noopener noreferrer">
              <i class="fas fa-envelope"></i> {{ info.email }}
            </a>
          </div>
        </div>

        <!-- Quick Links -->
        <div class="footer-col">
          <h4>Quick Links</h4>
          <ul>
            <li v-for="link in navLinks" :key="link.to">
              <RouterLink :to="link.to">
                <i class="fas fa-angle-right"></i> {{ link.label }}
              </RouterLink>
            </li>
          </ul>
        </div>

        <!-- Our Services -->
        <div class="footer-col">
          <h4>Our Services</h4>
          <ul>
            <li v-for="svc in services.slice(0, 6)" :key="svc.name">
              <RouterLink to="/services">
                <i class="fas fa-angle-right"></i> {{ svc.name }}
              </RouterLink>
            </li>
          </ul>
        </div>

        <!-- Contact Info -->
        <div class="footer-col">
          <h4>Contact Info</h4>
          <div class="footer-contacts">
            <div class="fc-row">
              <i class="fas fa-user-tie"></i>
              <span>{{ info.contact_person }}</span>
            </div>
            <div class="fc-row">
              <i class="fas fa-phone-alt"></i>
              <a :href="info.phoneUrl">{{ info.phone }}</a>
            </div>
            <div class="fc-row">
              <i class="fas fa-envelope"></i>
              <a :href="info.gmailUrl" target="_blank" rel="noopener noreferrer">{{ info.email }}</a>
            </div>
            <div class="fc-row">
              <i class="fas fa-map-marker-alt"></i>
              <span>{{ info.address }}</span>
            </div>
            <div class="fc-row">
              <i class="fas fa-certificate"></i>
              <span>GST: {{ info.gst }}</span>
            </div>
          </div>
          <div class="footer-social">
            <a :href="info.whatsappUrl" target="_blank" rel="noopener noreferrer" title="WhatsApp">
              <i class="fab fa-whatsapp"></i>
            </a>
            <a :href="info.phoneUrl" title="Call">
              <i class="fas fa-phone-alt"></i>
            </a>
            <a :href="info.gmailUrl" target="_blank" rel="noopener noreferrer" title="Email">
              <i class="fas fa-envelope"></i>
            </a>
            <button class="footer-feedback-btn" @click="openReviewModal" title="Send Your Feedback">
              <i class="fas fa-star"></i> Send Your Feedback
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Review / Feedback Popup Modal -->
    <Teleport to="body">
      <Transition name="modal-fade">
        <div v-if="reviewModalOpen" class="review-modal-backdrop" @click.self="closeReviewModal">
          <div class="review-modal-card">
            <button class="review-modal-close" @click="closeReviewModal" aria-label="Close">
              <i class="fas fa-times"></i>
            </button>

            <div class="rm-header">
              <div class="rm-icon"><i class="fas fa-star"></i></div>
              <h3>Send Your Feedback / Review</h3>
              <p>Share your experience with NECTRA SERVICES directly via WhatsApp or Email</p>
            </div>

            <form @submit.prevent="submitFeedbackWhatsApp" class="arb-form">
              <div class="arb-rating-select">
                <label>Your Rating:</label>
                <div class="star-rating-input">
                  <i
                    v-for="star in 5"
                    :key="star"
                    :class="[star <= (hoverRating || newReview.rating) ? 'fas fa-star filled' : 'far fa-star']"
                    @click="newReview.rating = star"
                    @mouseenter="hoverRating = star"
                    @mouseleave="hoverRating = 0"
                  ></i>
                  <span class="rating-val-text">{{ newReview.rating }} / 5 Stars</span>
                </div>
              </div>

              <div class="arb-fields-grid">
                <div class="form-group">
                  <label>Your Name *</label>
                  <input v-model="newReview.name" type="text" placeholder="your name" required />
                </div>
                <div class="form-group">
                  <label>Company / City</label>
                  <input v-model="newReview.company" type="text" placeholder="your company / city" />
                </div>
              </div>

              <div class="form-group">
                <label>Your Feedback / Review Message *</label>
                <textarea v-model="newReview.comment" rows="3" placeholder="Write your experience or feedback here..." required></textarea>
              </div>

              <div class="arb-btn-row">
                <button type="submit" class="btn btn-whatsapp-submit">
                  <i class="fab fa-whatsapp"></i> Send via WhatsApp
                </button>
                <button type="button" @click="submitFeedbackEmail" class="btn btn-email-submit">
                  <i class="fab fa-google"></i> Send via Gmail
                </button>
              </div>
            </form>
          </div>
        </div>
      </Transition>
    </Teleport>
    <div class="footer-bottom">
      <div class="container footer-bottom-inner">
        <p>&copy; {{ year }} NECTRA SERVICES. All rights reserved.</p>
        <p>MS &amp; SS Fabrication Specialist | Ahmedabad, Gujarat</p>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { ref, computed } from 'vue'
import businessInfo from '../../data/businessInfo.js'
import services from '../../data/services.js'

const info = businessInfo
const year = computed(() => new Date().getFullYear())

const reviewModalOpen = ref(false)
function openReviewModal() {
  reviewModalOpen.value = true
  document.body.style.overflow = 'hidden'
}
function closeReviewModal() {
  reviewModalOpen.value = false
  document.body.style.overflow = ''
}

const hoverRating = ref(0)
const newReview = ref({
  rating: 5,
  name: '',
  company: '',
  comment: ''
})

function submitFeedbackWhatsApp() {
  if (!newReview.value.name || !newReview.value.comment) return

  const starsText = '⭐'.repeat(newReview.value.rating)
  const message = `*New Customer Review for NECTRA SERVICES*\n\n` +
    `*Rating:* ${starsText} (${newReview.value.rating}/5 Stars)\n` +
    `*Name:* ${newReview.value.name}\n` +
    (newReview.value.company ? `*Company/Location:* ${newReview.value.company}\n` : '') +
    `*Feedback:* ${newReview.value.comment}`

  const encodedMsg = encodeURIComponent(message)
  const whatsappUrl = `https://api.whatsapp.com/send?phone=919979170404&text=${encodedMsg}`
  closeReviewModal()
  window.open(whatsappUrl, '_blank')
}

function submitFeedbackEmail() {
  if (!newReview.value.name || !newReview.value.comment) return

  const starsText = '⭐'.repeat(newReview.value.rating)
  const subject = encodeURIComponent(`Customer Review from ${newReview.value.name}`)
  const body = encodeURIComponent(
    `Customer Review for NECTRA SERVICES\n\n` +
    `Rating: ${starsText} (${newReview.value.rating}/5 Stars)\n` +
    `Name: ${newReview.value.name}\n` +
    `Company/Location: ${newReview.value.company || 'N/A'}\n` +
    `Feedback:\n${newReview.value.comment}`
  )

  const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=Info@nectraservices.com&su=${subject}&body=${body}`
  closeReviewModal()
  window.open(gmailUrl, '_blank')
}

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'About Us', to: '/about' },
  { label: 'Services', to: '/services' },
  { label: 'Products', to: '/products' },
  { label: 'Contact Us', to: '/contact' },
]
</script>

<style scoped>
.footer { background: var(--bg-dark); color: #94a3b8; }
.footer-top { padding: 60px 0 40px; }
.footer-grid {
  display: grid;
  grid-template-columns: 1.2fr 0.9fr 0.9fr 1.6fr;
  gap: 28px;
}
.footer-logo {
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  margin-bottom: 16px;
}
.footer-logo-icon { width: 40px; height: 40px; border-radius: 10px; overflow: hidden; }
.footer-logo-img { width: 40px; height: 40px; object-fit: contain; }
.footer-logo-name {
  display: block;
  font-family: 'Outfit', sans-serif;
  font-weight: 900;
  font-size: 18px;
  color: #fff;
  letter-spacing: 1px;
}
.footer-logo-sub {
  display: block;
  font-size: 9px;
  font-weight: 600;
  color: #64748b;
  letter-spacing: 2.5px;
  text-transform: uppercase;
}
.footer-desc { font-size: 13.5px; line-height: 1.7; margin-bottom: 18px; }
.footer-quick-contact { display: flex; flex-direction: column; gap: 8px; }
.footer-quick-contact a {
  color: #94a3b8;
  text-decoration: none;
  font-size: 13.5px;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: color 0.2s;
}
.footer-quick-contact a:hover { color: #fff; }
.footer-quick-contact i { color: var(--primary-light); font-size: 13px; }
.footer-col h4 {
  color: #fff;
  font-size: 15px;
  font-weight: 700;
  margin-bottom: 18px;
  padding-bottom: 10px;
  border-bottom: 1px solid #ffffff14;
}
.footer-col ul { list-style: none; display: flex; flex-direction: column; gap: 8px; }
.footer-col ul a {
  color: #94a3b8;
  text-decoration: none;
  font-size: 13.5px;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: color 0.2s;
}
.footer-col ul a:hover { color: var(--primary-light); }
.footer-col ul i { color: var(--primary); font-size: 11px; }
.footer-contacts { display: flex; flex-direction: column; gap: 10px; margin-bottom: 18px; }
.fc-row { display: flex; align-items: flex-start; gap: 10px; font-size: 13px; }
.fc-row i { color: var(--primary-light); font-size: 13px; margin-top: 2px; flex-shrink: 0; }
.fc-row a { color: #94a3b8; text-decoration: none; transition: color 0.2s; }
.fc-row a:hover { color: #fff; }
.footer-social { display: flex; align-items: center; gap: 8px; flex-wrap: nowrap; }
.footer-social a {
  width: 36px;
  height: 36px;
  border-radius: 8px;
  background: #ffffff10;
  border: 1px solid #ffffff18;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #94a3b8;
  font-size: 15px;
  text-decoration: none;
  transition: all 0.2s;
  flex-shrink: 0;
}
.footer-social a:hover { background: var(--primary); color: #fff; border-color: var(--primary); }

.footer-feedback-btn {
  height: 36px;
  padding: 0 12px;
  border-radius: 8px;
  background: #ffffff10;
  border: 1px solid #ffffff18;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: #94a3b8;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  font-family: inherit;
  white-space: nowrap;
  flex-shrink: 0;
}
.footer-feedback-btn i { color: #f59e0b; font-size: 13px; }
.footer-feedback-btn:hover { background: var(--primary); color: #fff; border-color: var(--primary); }
.footer-feedback-btn:hover i { color: #fff; }

/* Review Modal */
.review-modal-backdrop {
  position: fixed;
  inset: 0;
  z-index: 99999;
  background: rgba(15, 23, 42, 0.78);
  backdrop-filter: blur(6px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
}
.review-modal-card {
  background: #fff;
  border-radius: 16px;
  max-width: 580px;
  width: 100%;
  padding: 28px 26px;
  position: relative;
  box-shadow: 0 25px 60px rgba(0, 0, 0, 0.40);
  border: 1px solid #cbd5e1;
  max-height: 90vh;
  overflow-y: auto;
  overflow-x: hidden;
  box-sizing: border-box;
}

/* Custom internal scrollbar */
.review-modal-card::-webkit-scrollbar {
  width: 6px;
}
.review-modal-card::-webkit-scrollbar-track {
  background: #f1f5f9;
  border-radius: 10px;
  margin: 10px 0;
}
.review-modal-card::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 10px;
}
.review-modal-card::-webkit-scrollbar-thumb:hover {
  background: var(--primary);
}

.review-modal-close {
  position: absolute;
  top: 16px;
  right: 16px;
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background: #f1f5f9;
  border: 1px solid #cbd5e1;
  color: #475569;
  font-size: 15px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  z-index: 10;
}
.review-modal-close:hover { background: #ef4444; color: #fff; border-color: #ef4444; }

.rm-header { text-align: center; margin-bottom: 16px; }
.rm-icon {
  width: 46px;
  height: 46px;
  background: rgba(26, 111, 196, 0.10);
  color: var(--primary);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  margin: 0 auto 8px;
}
.rm-header h3 { font-family: 'Outfit', sans-serif; font-size: 20px; font-weight: 800; color: #0f172a; margin-bottom: 2px; }
.rm-header p { color: #64748b; font-size: 13.5px; margin: 0; }

.arb-form { display: flex; flex-direction: column; gap: 14px; text-align: left; }
.arb-rating-select { display: flex; align-items: center; gap: 12px; flex-wrap: wrap; background: #f8fafc; padding: 10px 14px; border-radius: 10px; border: 1px solid #cbd5e1; }
.arb-rating-select label { font-size: 13.5px; font-weight: 700; color: #334155; }
.star-rating-input { display: flex; align-items: center; gap: 6px; }
.star-rating-input i { font-size: 22px; color: #cbd5e1; cursor: pointer; transition: transform 0.15s, color 0.15s; }
.star-rating-input i.filled { color: #f59e0b; }
.star-rating-input i:hover { transform: scale(1.2); }
.rating-val-text { font-size: 13px; font-weight: 700; color: #475569; margin-left: 6px; }

.arb-fields-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
.form-group { display: flex; flex-direction: column; gap: 5px; }
.form-group label { font-size: 13px; font-weight: 700; color: #334155; }
.form-group input {
  width: 100%;
  padding: 10px 14px;
  border-radius: 8px;
  border: 1px solid #cbd5e1;
  font-family: inherit;
  font-size: 14px;
  background: #fff;
  color: #0f172a;
  outline: none;
  transition: border-color 0.2s, box-shadow 0.2s;
  box-sizing: border-box;
}
.form-group textarea {
  width: 100%;
  padding: 11px 14px;
  border-radius: 8px;
  border: 1px solid #cbd5e1;
  font-family: inherit;
  font-size: 14px;
  line-height: 1.4;
  background: #fff;
  color: #0f172a;
  outline: none;
  transition: border-color 0.2s, box-shadow 0.2s;
  box-sizing: border-box;
  min-height: 85px;
  resize: vertical;
}
.form-group input:focus, .form-group textarea:focus {
  border-color: var(--primary);
  box-shadow: 0 0 0 3px rgba(26, 111, 196, 0.15);
}

.arb-btn-row { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 4px; }
.btn-whatsapp-submit {
  background: linear-gradient(135deg, #25d366, #128c7e);
  color: #fff;
  border: none;
  font-weight: 700;
  box-shadow: 0 4px 14px rgba(37, 211, 102, 0.35);
  cursor: pointer;
  padding: 11px 20px;
  border-radius: 8px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 13.5px;
  transition: transform 0.2s, box-shadow 0.2s;
}
.btn-whatsapp-submit:hover { transform: translateY(-2px); box-shadow: 0 8px 20px rgba(37, 211, 102, 0.5); }

.btn-email-submit {
  background: var(--gradient-primary);
  color: #fff;
  border: none;
  font-weight: 700;
  box-shadow: var(--shadow-primary);
  cursor: pointer;
  padding: 11px 20px;
  border-radius: 8px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 13.5px;
  transition: transform 0.2s, box-shadow 0.2s;
}
.btn-email-submit:hover { transform: translateY(-2px); box-shadow: 0 8px 20px rgba(26, 111, 196, 0.5); }

.modal-fade-enter-active, .modal-fade-leave-active { transition: opacity 0.3s; }
.modal-fade-enter-from, .modal-fade-leave-to { opacity: 0; }
.footer-bottom {
  border-top: 1px solid #ffffff10;
  padding: 18px 0;
  background: #0a1628;
}
.footer-bottom-inner {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
}
.footer-bottom p { font-size: 13px; }

@media (max-width: 1024px) {
  .footer-grid { grid-template-columns: 1fr 1fr; }
}
@media (max-width: 600px) {
  .footer-grid { grid-template-columns: 1fr; }
  .footer-bottom-inner { flex-direction: column; text-align: center; }
}
</style>
