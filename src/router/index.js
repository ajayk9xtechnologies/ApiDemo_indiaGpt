// router/index.js

import { createRouter, createWebHistory } from 'vue-router';
import Homepage from '@/pages/HomePage.vue';
import Login from '@/pages/LoginPage.vue';
import Register from '@/pages/Register.vue'
import ForgotPassword from '@/pages/ForgotPassword.vue' 
import Profile from '@/pages/Dashboard.vue';
import SearchPage from '../pages/SearchPage.vue';

 const routes = [
  { 
    path: '/', 
    component: Homepage, 
    name: 'Home' 
  },
  { 
    path: '/login', 
    component: Login, 
    name: 'Login' 
  },
  { 
    path: '/register', 
    component: Register, 
    name: 'Register' 
  },
  { 
    path: '/forgot-password', 
    component: ForgotPassword, 
    name: 'ForgotPassword' 
  },
  { 
    path: '/profile', 
    component: Profile, 
    name: 'Profile' 
  },
  { 
    path: '/searchpage', 
    component: SearchPage, 
    name: 'SearchPage' 
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
