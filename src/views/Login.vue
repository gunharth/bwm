<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-card class="elevation-12">
          <v-toolbar dark color="primary">
            <v-toolbar-title>Login</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-card-text>
            <v-form>
              <v-text-field
                prepend-icon="person"
                name="nickname"
                label="Nickname"
                v-model="nickname"
              ></v-text-field>
              <v-text-field
                prepend-icon="email"
                name="email"
                label="E-mail"
                type="email"
                v-model="email"
              ></v-text-field>
              <v-text-field
                prepend-icon="lock"
                name="password"
                label="Password"
                id="password"
                type="password"
                v-model="password"
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="login">Login</v-btn>
          </v-card-actions>
          <v-card-text>
              or Sign In with
              <button @click="socialLogin" class="social-button">
                <img alt="Google Logo" src="../assets/google-logo.png">
              </button>

            <p>
              You don't have an account?
              <router-link to="/sign-up">Create one</router-link>
            </p>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import firebase from "../firebaseConfig.js";
import { mapMutations } from 'vuex'

export default {
  name: "login",
  data() {
    return {
      nickname: "",
      email: "",
      password: "",
      snackName: ''
    };
  },
  methods: {
    login: function() {
      firebase.auth.signInWithEmailAndPassword(this.email, this.password).then(
        user => {
              this.$router.replace("home");
            //});
        },
        err => {
          this.setSnack(err.message);
          //this.$store.commit('store/setSnack', err.message)
          //this.$store.dispatch('setSnack', err.message)
          //alert("Oops. " + err.message);
        }
      );
    },
    socialLogin() {
      const provider = new firebase.socialAuth.GoogleAuthProvider();
      firebase.auth
        .signInWithPopup(provider)
        .then(cred => {
          return firebase.db
            .collection("users")
            .doc(cred.user.uid)
            .set({
              nickname: cred.user.displayName
            });
        })
        .then(() => {
          this.$router.replace("home");
        })
        .catch(err => {
          this.setSnack(err.message)
          alert("Oops. " + err.message);
        });
    },
    ...mapMutations({
      setSnack: 'setSnack'
    })
  }
};
</script>

<style scoped>
  .social-button img {
    width: 20px;
  }
  .social-button:active {
    box-shadow: 0 2px 4px 0 rgba(0,0,0,0.1)
  }
</style>
