import Vue from "vue";
import firebase from "./firebaseConfig.js";
import "./plugins/vuetify";
import App from "./App.vue";
import router from "./router";
import "./registerServiceWorker";
import "material-design-icons-iconfont/dist/material-design-icons.css";
import store from "./store/store";
import VueMoment from "vue-moment";

Vue.use(VueMoment);

// leaflet
import { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";
// this part resolve an issue where the markers would not appear
delete Icon.Default.prototype._getIconUrl;
Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png")
});

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
