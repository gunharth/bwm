import Vue from 'vue'
import Vuex from 'vuex'
import firebase from "../firebaseConfig.js";
import router from "../router";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    status: null,
    error: null,
    snack: ""
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload;
    },
    removeUser(state) {
      state.user = null;
    },
    setStatus(state, payload) {
      state.status = payload;
    },
    setError(state, payload) {
      state.error = payload;
    },
    setSnack(state, snack) {
      state.snack = snack;
    }
  },
  actions: {
    signUpAction({ commit }, payload) {
      commit('setStatus', 'loading');
      firebase.auth.createUserWithEmailAndPassword(payload.email, payload.password)
        .then((response) => {
          alert('success');
          commit('setUser', response.user.uid);
          commit('setStatus', 'success');
          commit('setError', null);

          firebase.db
            .collection("users")
            .doc(response.user.uid)
            .set({
              nickname: 'guni'
            })
            .then(() => {
              router.replace("home");
            });

        })
        .catch((error) => {
          commit('setStatus', 'failure');
          commit('setError', error.message);
        })
    },
    signInAction({ commit }, payload) {
      firebase.auth.signInWithEmailAndPassword(payload.email, payload.password)
        .then((response) => {
          commit('setUser', response.user.uid);
          commit('setStatus', 'success');
          commit('setError', null);
          router.replace("home");
        })
        .catch((error) => {
          commit('setStatus', 'failure')
          commit('setError', error.message)
        })
    },
    signInActionSocial({ commit }) {
      const provider = new firebase.socialAuth.GoogleAuthProvider();
      firebase.auth.signInWithPopup(provider)
        .then((response) => {
          console.log(response.user.uid)
          commit('setUser', response.user.uid);
          commit('setStatus', 'success');
          commit('setError', null);

          // return firebase.db
          //   .collection("users")
          //   .doc(response.user.uid)
          //   .set({
          //     nickname: response.user.displayName
          //   }).then(() => {
              router.replace("home");
            // })

        })
        .catch((error) => {
          commit('setStatus', 'failure')
          commit('setError', error.message)
        })
    },
    signOutAction({ commit }) {
      firebase.auth.signOut()
        .then((response) => {
          commit('setUser', null)
          commit('setStatus', 'success')
          commit('setError', null)
          router.replace("login");
        })
        .catch((error) => {
          commit('setStatus', 'failure')
          commit('setError', error.message)
        })
    }
  },
  getters: {
    status(state) {
      return state.status
    },
    user(state) {
      return state.user
    },
    error(state) {
      return state.error
    }
  }
})
