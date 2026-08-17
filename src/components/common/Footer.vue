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
          </div>
        </div>
      </div>
    </div>
    <div class="footer-bottom">
      <div class="container footer-bottom-inner">
        <p>&copy; {{ year }} NECTRA SERVICES. All rights reserved.</p>
        <p>MS &amp; SS Fabrication Specialist | Ahmedabad, Gujarat</p>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { computed } from 'vue'
import businessInfo from '../../data/businessInfo.js'
import services from '../../data/services.js'

const info = businessInfo
const year = computed(() => new Date().getFullYear())

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
  grid-template-columns: 1.4fr 1fr 1fr 1.2fr;
  gap: 40px;
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
.footer-social { display: flex; gap: 10px; }
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
}
.footer-social a:hover { background: var(--primary); color: #fff; border-color: var(--primary); }
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
