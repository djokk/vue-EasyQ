import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Menu from '../views/Menu.vue'
import Search from '../views/Search.vue'
import Maps from '../views/Map.vue'
import Profil from '../views/Profil.vue'
import Booking from '../views/Booking.vue'
import ETicket from '../views/ETicket.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/menu',
    name: 'Menu',
    component: Menu
  },
  {
    path: '/menu/search',
    name: 'Search',
    component: Search
  },
  {
    path: '/menu/search/booking/:id',
    name: 'Booking',
    component: Booking,
    props: true
  },
  {
    path: '/menu/search/e-ticket/:id',
    name: 'ETicket',
    component: ETicket,
    props: true
  },
  {
    path: '/menu/map',
    name: 'Maps',
    component: Maps
  },
  {
    path: '/menu/profil',
    name: 'Profil',
    component: Profil
  },
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router
