<template>
  <Navbar />


  <!-- Contact Section -->
  <section class="section contact-section">
    <div class="container">
      <div class="contact-grid">
        <!-- Contact Info Card -->
        <div class="contact-card">
          <div class="c-header">
            <div class="c-logo">
              <img src="/images/nectra-logo-mark.png" alt="NECTRA SERVICES" class="c-logo-img" />
            </div>
            <div>
              <h3>NECTRA SERVICES</h3>
              <p>MS &amp; SS Fabrication Specialist</p>
            </div>
          </div>

          <div class="contact-person-box">
            <i class="fas fa-user-tie"></i>
            <div>
              <span class="cp-label">Contact Person</span>
              <span class="cp-name">{{ info.contact_person }}</span>
            </div>
          </div>

          <div class="contact-items">
            <a class="ci" :href="info.phoneUrl">
              <div class="ci-icon phone"><i class="fas fa-phone-alt"></i></div>
              <div class="ci-text">
                <span>Mobile</span>
                <strong>{{ info.phone }}</strong>
              </div>
            </a>
            <a class="ci" :href="info.gmailUrl" target="_blank" rel="noopener noreferrer">
              <div class="ci-icon email"><i class="fas fa-envelope"></i></div>
              <div class="ci-text">
                <span>Email</span>
                <strong>{{ info.email }}</strong>
              </div>
            </a>
            <div class="ci">
              <div class="ci-icon addr"><i class="fas fa-map-marker-alt"></i></div>
              <div class="ci-text">
                <span>Address</span>
                <strong>{{ info.address }}</strong>
              </div>
            </div>
            <div class="ci">
              <div class="ci-icon gst"><i class="fas fa-certificate"></i></div>
              <div class="ci-text">
                <span>GST Number</span>
                <strong>{{ info.gst }}</strong>
              </div>
            </div>
          </div>
        </div>

        <!-- Quick Contact Panel -->
        <div>
          <div class="qc-grid">
            <a :href="info.phoneUrl" class="qc-card qc-phone">
              <div class="qci"><i class="fas fa-phone-alt"></i></div>
              <div class="qcc">
                <h4>Call Us</h4>
                <p>Talk directly with our team</p>
                <span>{{ info.phone }}</span>
              </div>
            </a>
            <a :href="info.whatsappUrl" target="_blank" rel="noopener noreferrer" class="qc-card qc-wa">
              <div class="qci"><i class="fab fa-whatsapp"></i></div>
              <div class="qcc">
                <h4>WhatsApp</h4>
                <p>Message us on WhatsApp</p>
                <span>{{ info.phone }}</span>
              </div>
            </a>
            <a :href="info.gmailUrl" target="_blank" rel="noopener noreferrer" class="qc-card qc-email">
              <div class="qci"><i class="fas fa-envelope"></i></div>
              <div class="qcc">
                <h4>Email Us</h4>
                <p>Send us your enquiry</p>
                <span>{{ info.email }}</span>
              </div>
            </a>
            <a :href="info.mapsUrl" target="_blank" class="qc-card qc-map">
              <div class="qci"><i class="fas fa-map-marker-alt"></i></div>
              <div class="qcc">
                <h4>Visit Us</h4>
                <p>{{ info.address }}</p>
                <span>Get Directions →</span>
              </div>
            </a>
          </div>

          <div class="biz-hours">
            <h4><i class="fas fa-clock"></i> Business Hours</h4>
            <div class="bh-row">
              <span>Monday – Saturday</span>
              <span class="open-badge">9:00 AM – 7:00 PM</span>
            </div>
            <div class="bh-row">
              <span>Sunday</span>
              <span class="appt-badge">By Appointment</span>
            </div>
          </div>

          <div class="contact-cta-btns">
            <a :href="info.whatsappUrl" target="_blank" rel="noopener noreferrer" class="btn btn-whatsapp btn-lg">
              <i class="fab fa-whatsapp"></i> Message on WhatsApp
            </a>
            <a :href="info.phoneUrl" class="btn btn-primary btn-lg">
              <i class="fas fa-phone-alt"></i> Call Now
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>

  <Footer />
</template>

<script setup>
import Navbar from '../components/common/Navbar.vue'
import Footer from '../components/common/Footer.vue'
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
.contact-section { background: #fff; }
.contact-grid {
  display: grid;
  grid-template-columns: 1fr 1.1fr;
  gap: 40px;
  align-items: start;
}
.contact-card {
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: var(--radius-lg);
  padding: 32px;
  box-shadow: var(--shadow-sm);
}
.c-header {
  display: flex;
  align-items: center;
  gap: 14px;
  padding-bottom: 20px;
  margin-bottom: 20px;
  border-bottom: 1px solid #e2e8f0;
}
.c-logo { flex-shrink: 0; width: 42px; height: 42px; }
.c-logo-img { object-fit: contain; width: 42px; height: 42px; }
.c-header h3 { color: #0f172a; font-family: 'Outfit', sans-serif; font-size: 20px; font-weight: 800; }
.c-header p { color: #64748b; font-size: 13px; }
.contact-person-box {
  background: rgba(26,111,196,0.08);
  border: 1px solid rgba(26,111,196,0.18);
  border-radius: 12px;
  padding: 14px 16px;
  margin-bottom: 18px;
  display: flex;
  align-items: center;
  gap: 14px;
}
.contact-person-box i { color: var(--primary); font-size: 24px; }
.cp-label { color: #64748b; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; display: block; }
.cp-name { color: #0f172a; font-size: 16px; font-weight: 700; }
.contact-items { display: flex; flex-direction: column; gap: 10px; }
.ci {
  display: flex;
  align-items: flex-start;
  gap: 14px;
  padding: 10px;
  border-radius: 10px;
  text-decoration: none;
  color: inherit;
  transition: var(--transition);
}
.ci:hover { background: #fff; }
.ci-icon {
  width: 38px;
  height: 38px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  flex-shrink: 0;
}
.ci-icon.phone { color: var(--primary); background: rgba(26,111,196,0.10); }
.ci-icon.email { color: #128c7e; background: rgba(37,211,102,0.10); }
.ci-icon.addr { color: #0284c7; background: rgba(2,132,199,0.10); }
.ci-icon.gst { color: var(--primary); background: rgba(26,111,196,0.08); }
.ci-text span { color: #64748b; font-size: 11px; text-transform: uppercase; letter-spacing: 0.8px; display: block; margin-bottom: 2px; }
.ci-text strong { color: #0f172a; font-size: 13.5px; font-weight: 600; line-height: 1.5; }
.qc-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 20px; }
.qc-card {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 18px;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: var(--radius);
  text-decoration: none;
  color: inherit;
  transition: var(--transition);
}
.qc-card:hover { background: #fff; box-shadow: var(--shadow-sm); border-color: var(--primary-light); transform: translateY(-4px); }
.qci {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  flex-shrink: 0;
}
.qc-phone .qci { color: var(--primary); background: rgba(26,111,196,0.10); }
.qc-wa .qci { color: #25d366; background: rgba(37,211,102,0.12); }
.qc-email .qci { color: #0284c7; background: rgba(2,132,199,0.10); }
.qc-map .qci { color: #f59e0b; background: rgba(255,165,0,0.10); }
.qcc h4 { color: #0f172a; font-size: 13.5px; font-weight: 700; margin-bottom: 2px; }
.qcc p { color: #64748b; font-size: 12px; }
.qcc span { color: var(--primary); font-size: 11.5px; font-weight: 600; }
.biz-hours {
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: var(--radius);
  padding: 20px 22px;
  margin-bottom: 20px;
}
.biz-hours h4 {
  color: #0f172a;
  font-size: 14px;
  font-weight: 700;
  margin-bottom: 14px;
  display: flex;
  align-items: center;
  gap: 8px;
}
.biz-hours h4 i { color: var(--primary); }
.bh-row { display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; color: #475569; font-size: 13.5px; }
.bh-row:last-child { margin-bottom: 0; }
.open-badge { background: rgba(37,211,102,0.12); color: #128c7e; border-radius: 20px; padding: 3px 10px; font-size: 12px; font-weight: 600; }
.appt-badge { background: rgba(245,158,11,0.12); color: #d97706; border-radius: 20px; padding: 3px 10px; font-size: 12px; font-weight: 600; }
.contact-cta-btns { display: flex; flex-wrap: wrap; gap: 14px; }

@media (max-width: 900px) {
  .contact-grid { grid-template-columns: 1fr; }
}
@media (max-width: 560px) {
  .qc-grid { grid-template-columns: 1fr; }
  .contact-cta-btns { flex-direction: column; }
}
</style>
