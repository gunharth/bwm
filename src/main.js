import Vue from "vue";
import firebase from "./firebaseConfig.js";
import "./plugins/vuetify";
import App from "./App.vue";
import router from "./router";
import "./registerServiceWorker";
import "material-design-icons-iconfont/dist/material-design-icons.css";

Vue.config.productionTip = false;

let app = "";

firebase.auth.onAuthStateChanged(() => {
  if (!app) {
    /* eslint-disable no-new */
    app = new Vue({
      router,
      render: h => h(App)
    }).$mount("#app");
  }
});
