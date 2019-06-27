import Vue from "vue";
import firebase from "./firebaseConfig.js";
import "./plugins/vuetify";
import App from "./App.vue";
import router from "./router";
import "./registerServiceWorker";
import "material-design-icons-iconfont/dist/material-design-icons.css";
import store from "./store/store";

Vue.config.productionTip = false;

let app = "";

// firebase.auth.onAuthStateChanged(() => {
// store.commit("setUser", { user });
firebase.auth.onAuthStateChanged(firebaseUser => {
  if (firebaseUser) {
    store.dispatch("autoSignIn", firebaseUser);
  }
  if (!app) {
    /* eslint-disable no-new */
    app = new Vue({
      router,
      store,
      render: h => h(App)
      //created() {
      // firebase.auth.onAuthStateChanged(firebaseUser => {
      //   if (firebaseUser) {
      //     store.dispatch("autoSignIn", firebaseUser);
      //   }
      // });
      //}
    }).$mount("#app");
  }
});
