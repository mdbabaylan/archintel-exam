import Vue from 'vue';
import VueRouter from 'vue-router';
import AllMedia from './components/AllMedia.vue';
import DashBoard from './components/DashBoard.vue';
import LoginForm from './components/LoginForm.vue';

Vue.use(VueRouter);

const routes = [
  { path: '/', component: AllMedia },
  { path: '/dashboard', component: DashBoard },
  { path: '/login', component: LoginForm },
];

const router = new VueRouter({
  mode: 'history',
  routes
});

export default router;
