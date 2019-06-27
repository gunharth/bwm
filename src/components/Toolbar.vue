<template>
  <v-toolbar app>
    <v-btn icon v-if="$route.name !== 'home' && $route.name !=='login'" @click="$router.go(-1) ">
      <v-icon>arrow_back</v-icon>
    </v-btn>
    <v-toolbar-title>
      <span>Beer With Me PWA</span>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <span v-if="$route.name=='home'" class="body-2 px-2">Hi, {{ nickname }}</span>
    <v-btn icon v-if="$route.name=='post'" @click="$router.push({name:'camera'})">
      <v-icon>camera_alt</v-icon>
    </v-btn>
    <v-btn icon v-if="$route.name=='home'" @click="getMessagingToken">
      <v-icon>{{ icon }}</v-icon>
    </v-btn>
    <v-btn icon v-if="$route.name=='home'" @click="logout">
      <v-icon>power_settings_new</v-icon>
    </v-btn>
  </v-toolbar>
</template>

<script>
import firebase from "../firebaseConfig.js";
import axios from "axios";
import { firestore } from "firebase";
const { messaging } = firebase;
export default {
  name: "Toolbar",
  data() {
    return {
      icon: "notifications_none"
    };
  },
  created() {},
  mounted() {
    this.listenTokenRefresh();
  },
  computed: {
    nickname: function() {
      return this.$store.getters.user.nickname;
    }
  },
  methods: {
    getMessagingToken() {
      messaging
        .getToken()
        .then(async token => {
          if (token) {
            const currentMessageToken = window.localStorage.getItem(
              "messagingToken"
            );
            console.log("token will be updated", currentMessageToken != token);
            if (currentMessageToken != token) {
              await this.saveToken(token);
            }
          } else {
            console.log(
              "No Instance ID token available. Request permission to generate one."
            );
            this.notificationsPermisionRequest();
          }
        })
        .catch(function(err) {
          console.log("An error occurred while retrieving token. ", err);
        });
    },
    notificationsPermisionRequest() {
      messaging
        .requestPermission()
        .then(() => {
          this.getMessagingToken();
        })
        .catch(err => {
          console.log("Unable to get permission to notify.", err);
        });
    },
    listenTokenRefresh() {
      const currentMessageToken = window.localStorage.getItem("messagingToken");
      console.log("currentMessageToken", currentMessageToken);
      if (!!currentMessageToken) {
        messaging.onTokenRefresh(function() {
          messaging
            .getToken()
            .then(function(token) {
              this.saveToken(token);
            })
            .catch(function(err) {
              console.log("Unable to retrieve refreshed token ", err);
            });
        });
      }
    },
    saveToken(token) {
      console.log("tokens", token);
      axios
        .post(
          "https://us-central1-bmwgunicode.cloudfunctions.net/GeneralSubscription",
          { token }
        )
        .then(response => {
          window.localStorage.setItem("messagingToken", token);
          console.log(response);
        })
        .catch(err => {
          console.log(err);
        });
    },
    logout: function() {
      this.$store.dispatch("signOutAction");
    }
  }
};
</script>
