<template>
  <v-container grid-list-xs>
    <v-layout row wrap>
      <div>{{ displayName }}</div>
      <v-flex v-for="(dog, index) in dogs" :key="dog.id" xs12 md6 xl3 pa-2>
        <v-card @click="$router.push({name: 'details', params:{ id:dog.id, dogProp:dogs[index] }})">
          <v-img height="300" :src="dog.url" contain></v-img>
          <v-card-title primary-title style="padding-top:13px">
            <div>
              <h3 class="headline">{{ dog.comment }}</h3>
              <div>{{ dog.info }}</div>
            </div>
          </v-card-title>
        </v-card>
      </v-flex>
    </v-layout>
    <v-btn @click="$router.push({ name: 'post'})" color="red" dark fixed bottom right fab>
      <v-icon>add</v-icon>
    </v-btn>
  </v-container>
</template>

<script>
import firebase from "../configFirebase.js";
import { scrypt } from "crypto";
export default {
  data() {
    return {
      dogs: [],
      displayName: ""
    };
  },
  mounted() {
    firebase.db
      .collection("dogs")
      .orderBy("created_at", "desc")
      .onSnapshot(snapShot => {
        this.dogs = [];
        snapShot.forEach(dog => {
          this.dogs.push({
            id: dog.id,
            url: dog.data().url,
            comment: dog.data().comment,
            info: dog.data().info
          });
        });
      });

    var posts = firebase.db.collectionGroup('posts');
    posts.get().then(function (querySnapshot) {
        querySnapshot.forEach(function (post) {
            console.log(post.id, ' => ', post.data());
        });
    });

    var user = firebase.auth.currentUser;
    console.log(user.uid);
    console.log(user.displayName);
    firebase.db
      .collection("users")
      .doc(user.uid)
      .get()
      .then(doc => {
        this.displayName = doc.data().nickname;
      });

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
