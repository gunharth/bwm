<template>
  <v-app>
    <snackbar />
    <toolbar />
    <v-content>
      <transition name="fade" mode="out-in">
        <router-view></router-view>
      </transition>
    </v-content>
  </v-app>
</template>

<script>
import Home from "@/components/Home";
import Snackbar from "@/components/Snackbar";
import Toolbar from "@/components/Toolbar";

export default {
  name: "App",
  components: {
    Home,
    Snackbar,
    Toolbar
  },
  data() {
    return {};
  }
};
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition-duration: 0.3s;
  transition-property: opacity;
  transition-timing-function: ease;
}

.fade-enter,
.fade-leave-active {
  opacity: 0
}
</style>
