import './style.css'
import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'

const routes = [
  { path: '/', name: 'Home', component: () => import('./views/HomeView.vue') },
  { path: '/about', name: 'About', component: () => import('./views/AboutView.vue') },
  { path: '/services', name: 'Services', component: () => import('./views/ServicesView.vue') },
  { path: '/products', name: 'Products', component: () => import('./views/ProductsView.vue') },
  { path: '/contact', name: 'Contact', component: () => import('./views/ContactView.vue') },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { top: 0, behavior: 'smooth' }
  },
})

const app = createApp(App)
app.use(router)
app.mount('#app')
