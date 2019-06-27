<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-card class="elevation-12">
          <v-toolbar dark color="primary">
            <v-toolbar-title>Sign Up</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-card-text>
            <v-form>
              <v-text-field
                prepend-icon="person"
                name="nickname"
                label="Nickname"
                type="text"
                v-model="nickname"
                ref="nickname"
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
            <v-btn color="primary" @click="signUp">Sign Up</v-btn>
          </v-card-actions>
          <v-card-text>
            <p>
              or go back to
      <router-link to="/login">login</router-link>.
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
  name: "signUp",
  data() {
    return {
      nickname: "",
      email: "",
      password: "",
      snackName: ''
    };
  },
  mounted() {
    // this.$nextTick(() => this.$refs.nickname.focus())
  },
  methods: {
    onEnter: function() {
       this.msg = 'on enter event';
    },
    signUp: function() {
      this.registerWithFirebase();
      // firebase.auth.createUserWithEmailAndPassword(this.email, this.password)
      // .then(
      //     user => {
            // return firebase.db
            // .collection("users")
            // .doc(user.user.uid)
            // .set({
            //   nickname: this.nickname
            // })
            // .then(() => {
            //   this.$router.replace("home");
            // });

      //     },
      //     err => {
      //       this.setSnack("Oops. " + err.message);
      //     }
      //   );
    },

    registerWithFirebase () {
      const user = {
        email: this.email,
        password: this.password,
        nickname: this.nickname
      }
      this.$store.dispatch('signUpAction', user)
    },

    ...mapMutations({
      setSnack: 'setSnack'
    })

  }
};
</script>
