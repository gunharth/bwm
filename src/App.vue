<template>
  <v-app>
    <Snackbar />
    <Toolbar />
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
import firebase from "@/firebaseConfig.js";
import axios from "axios";
import { firestore } from "firebase";
const { messaging } = firebase;
export default {
  name: "App",
  components: {
    Home,
    Snackbar,
    Toolbar
  },
  data() {
    return {};
  },
  mounted() {
    // this.listenTokenRefresh();
  },
  methods: {
    // getMessagingToken() {
    //   messaging
    //     .getToken()
    //     .then(async token => {
    //       if (token) {
    //         const currentMessageToken = window.localStorage.getItem(
    //           "messagingToken"
    //         );
    //         console.log("token will be updated", currentMessageToken != token);
    //         if (currentMessageToken != token) {
    //           await this.saveToken(token);
    //         }
    //       } else {
    //         console.log(
    //           "No Instance ID token available. Request permission to generate one."
    //         );
    //         this.notificationsPermisionRequest();
    //       }
    //     })
    //     .catch(function(err) {
    //       console.log("An error occurred while retrieving token. ", err);
    //     });
    // },
    // notificationsPermisionRequest() {
    //   messaging
    //     .requestPermission()
    //     .then(() => {
    //       this.getMessagingToken();
    //     })
    //     .catch(err => {
    //       console.log("Unable to get permission to notify.", err);
    //     });
    // },
    // listenTokenRefresh() {
    //   const currentMessageToken = window.localStorage.getItem("messagingToken");
    //   console.log("currentMessageToken", currentMessageToken);
    //   if (!!currentMessageToken) {
    //     messaging.onTokenRefresh(function() {
    //       messaging
    //         .getToken()
    //         .then(function(token) {
    //           this.saveToken(token);
    //         })
    //         .catch(function(err) {
    //           console.log("Unable to retrieve refreshed token ", err);
    //         });
    //     });
    //   }
    // },
    // saveToken(token) {
    //   console.log("tokens", token);
    //   axios
    //     .post(
    //       "https://us-central1-bmwgunicode.cloudfunctions.net/GeneralSubscription",
    //       { token }
    //     )
    //     .then(response => {
    //       window.localStorage.setItem("messagingToken", token);
    //       console.log(response);
    //     })
    //     .catch(err => {
    //       console.log(err);
    //     });
    // },
    // logout: function() {
    //   firebase.auth.signOut().then(() => {
    //     this.$router.replace("login");
    //   });
    // }
  }
};
</script>
