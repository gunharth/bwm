import Vue from "vue";
import Router from "vue-router";
import firebase from "./firebaseConfig.js";
import Login from "./views/Login.vue";
import SignUp from "./views/SignUp.vue";
import store from '@/store/store'

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: "*",
      redirect: "/login"
    },
    {
      path: "/",
      redirect: "/login"
    },
    {
      path: "/login",
      name: "login",
      component: Login
    },
    {
      path: "/sign-up",
      name: "signup",
      component: SignUp
    },
    {
      path: "/home",
      name: "home",
      component: () => import("./components/Home.vue"),
      meta: {
        requiresAuth: true
      }
    }
  ]
});

console.log(store.getters.user)

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  if (requiresAuth && !store.getters.user) next('login');
  //else if (!requiresAuth && store.getters.user) next('home');
  else next();
});

export default router;
