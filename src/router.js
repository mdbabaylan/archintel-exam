import Vue from 'vue';
import VueRouter from 'vue-router';
import AllMedia from './components/AllMedia.vue';
import DashBoard from './components/DashBoard.vue';
import LoginForm from './components/LoginForm.vue';
import store from './store';

Vue.use(VueRouter);

const routes = [
  { path: '/', component: AllMedia, meta: { requiresAuth: true } },
  { path: '/dashboard', component: DashBoard, meta: { requiresAuth: true } },
  { path: '/login', component: LoginForm },
];

const router = new VueRouter({
  mode: 'history',
  routes
});

router.beforeEach((to, from, next) => {
  // Check if the route requires authentication
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // Check if the user is not logged in
    if (!store.state.isLoggedIn) {
      // Redirect to the login page
      next({ path: '/login' });
    } else {
      next(); // Allow access
    }
  } else {
    next(); // Allow access to routes that don't require authentication
  }
});

export default router;
