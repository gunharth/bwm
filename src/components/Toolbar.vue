<template>
  <v-toolbar app>
    <v-btn icon v-if="$route.name !== 'home' && $route.name !=='login'" @click="$router.go(-1) ">
      <v-icon>arrow_back</v-icon>
    </v-btn>
    <v-toolbar-title>
      <span>BwM PWA</span>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <span v-if="$route.name=='home'" class="body-2 px-2">Hi, {{ nickname }}</span>
    <v-btn icon v-if="$route.name=='home'" @click="$router.push({name:'map'})">
      <v-icon>location_on</v-icon>
    </v-btn>
    <v-btn icon v-if="$route.name=='post'" @click="$router.push({name:'camera'})">
      <v-icon>camera_alt</v-icon>
    </v-btn>
    <v-btn icon v-if="$route.name=='home'" @click="installPWA" :style="{'display' : installBtn}">
      <v-icon>cloud_download</v-icon>
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

export default {
  name: "Toolbar",
  data() {
    return {
      icon: "notifications_none",
      installBtn: "none",
      installPWA: undefined
    };
  },
  created() {
    let installPrompt;
    window.addEventListener("beforeinstallprompt", e => {
      e.preventDefault();
      installPrompt = e;
      this.installBtn = "block";
    });

    this.installPWA = () => {
      this.installBtn = "none";
      installPrompt.prompt();
      installPrompt.userChoice.then(result => {
        if (result.outcome === "accepted") {
          console.log("User accepted");
        } else {
          console.log("User denied");
        }
        installPrompt = null;
      })
    }

  },
  mounted() {
    if(firebase.messaging) {
      this.listenTokenRefresh();
    }
  },
  computed: {
    nickname: function() {
      if(this.$store.getters.user !== null) {
        if(this.$store.getters.user.nickname === undefined) {
          return this.$store.getters.user.realname;
        } else {
          return this.$store.getters.user.nickname;
        }
      }
    }
  },
  methods: {
    getMessagingToken() {
      firebase.messaging
        .getToken()
        .then(async token => {
          if (token) {
            const currentMessageToken = window.localStorage.getItem("messagingToken");
            console.log("token will be updated", currentMessageToken != token);
            if (currentMessageToken != token) {
              await this.saveToken(token);
            }
          } else {
            console.log("No Instance ID token available. Request permission to generate one.");
            this.notificationsPermisionRequest();
          }
        })
        .catch(function(err) {
          console.log("An error occurred while retrieving token. ", err);
        });
    },
    notificationsPermisionRequest() {
      firebase.messaging
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
      //console.log(!!currentMessageToken);
      if (!!currentMessageToken) {
        this.icon = 'notifications_active';
        firebase.messaging.onTokenRefresh(function() {
          firebase.messaging
            .getToken()
            .then(function(token) {
              this.saveToken(token);
              console.log('Got a new token');
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
        .post("https://us-central1-bmwgunicode.cloudfunctions.net/GeneralSubscription", { token })
        .then(response => {
          window.localStorage.setItem("messagingToken", token);
          this.icon = 'notifications_active';
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
