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
          <RouterLink to="/contact" class="nav-cta" @click="menuOpen = false">
            <i class="fas fa-paper-plane"></i> Get a Quote
          </RouterLink>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { onMounted, onUnmounted } from 'vue'

const route = useRoute()
const menuOpen = ref(false)
const isScrolled = ref(false)

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
  .navbar { position: relative; }
}
</style>
