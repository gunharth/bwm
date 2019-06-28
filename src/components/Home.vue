<template>
  <v-container grid-list-xs>
    <v-layout row wrap>
      <v-flex v-for="(drink, index) in drinks" :key="drink.id" xs12 md6 xl3 pa-2>
        <v-card @click="$router.push({name: 'details', params:{ id:drink.id, drinkProp:drinks[index] }})">
          <v-img height="300" :src="drink.url" contain></v-img>
          <v-card-title primary-title style="padding-top:13px">
            <div>
              <h3 class="headline">{{ drink.comment }}</h3>
              <div>{{ drink.info }}</div>
            </div>
          </v-card-title>
        </v-card>
      </v-flex>
    </v-layout>
    <v-layout>
  </v-layout>
    <v-btn @click="$router.push({ name: 'post'})" color="red" dark fixed bottom right fab>
      <v-icon>add</v-icon>
    </v-btn>
  </v-container>
</template>

<script>
import firebase from "../firebaseConfig.js";
import { scrypt } from "crypto";
import { mapMutations } from 'vuex'

export default {
  data() {
    return {
      drinks: [],
      snackName: ''
    };
  },
  methods: {
    snackTime: function (snack) {
      this.setSnack(this.snackName)
      //this.$router.push('/')
    },
    ...mapMutations({
      setSnack: 'setSnack'
    })
  },
  mounted() {
    firebase.db
      .collection("drinks")
      .orderBy("created_at", "desc")
      .onSnapshot(snapShot => {
        this.drinks = [];
        snapShot.forEach(drink => {
          this.drinks.push({
            id: drink.id,
            url: drink.data().url,
            comment: drink.data().comment,
            info: drink.data().info
          });
        });
      });

    // var posts = firebase.db.collectionGroup('posts');
    // posts.get().then(function (querySnapshot) {
    //     querySnapshot.forEach(function (post) {
    //         console.log(post.id, ' => ', post.data());
    //     });
    // });

    // if (user != null) {
    // user.providerData.forEach(function (profile) {
    //     console.log("Sign-in provider: " + profile.providerId);
    //     console.log("  Provider-specific UID: " + profile.uid);
    //     console.log("  Name: " + profile.displayName);
    //     console.log("  Email: " + profile.email);
    //     console.log("  Photo URL: " + profile.photoURL);
    //     user.getIdToken().then(data => console.log(data))
    // });
    // }
  }
};
</script>
