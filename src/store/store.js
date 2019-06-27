import Vue from "vue";
import Vuex from "vuex";
import firebase from "../firebaseConfig.js";
import router from "../router";

Vue.use(Vuex);

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
    autoSignIn({ commit }, payload) {
      commit("setUser", { uid: payload.uid });
      const userDataFromAuth = { id: payload.uid, email: payload.email };
      firebase.db
        .collection("users")
        .doc(payload.uid)
        .get()
        .then(doc => {
          const userDataFromDatabase = {};
          if (doc.data().nickname) {
            userDataFromDatabase.nickname = doc.data().nickname;
          }
          if (doc.data().realname) {
            userDataFromDatabase.realname = doc.data().realname;
          }
            // nickname: doc.data().nickname,
            // realname: doc.data().realname
          // };
          const userData = {
            ...userDataFromAuth,
            ...userDataFromDatabase
          };
          commit("setUser", userData);
        });
    },
    signUpAction({ commit }, payload) {
      commit("setStatus", "loading");
      firebase.auth
        .createUserWithEmailAndPassword(payload.email, payload.password)
        .then(response => {
          firebase.db
            .collection("users")
            .doc(response.user.uid)
            .set({
              nickname: payload.nickname
            })
            .then(() => {
              const userData = {
                id: response.user.uid,
                nickname: payload.nickname
              };;
              commit("setUser", userData);
              commit("setStatus", "success");
              commit("setError", null);
              router.replace("home");
            });
        })
        .catch(error => {
          commit("setStatus", "failure");
          commit("setError", error.message);
        });
    },
    signInAction({ commit }, payload) {
      firebase.auth
        .signInWithEmailAndPassword(payload.email, payload.password)
        .then(response => {
          const userDataFromAuth = { id: response.user.uid };
          firebase.db
            .collection("users")
            .doc(response.user.uid)
            .get()
            .then(doc => {
              const userDataFromDatabase = {
                nickname: doc.data().nickname
              };
              const userData = {
                ...userDataFromAuth,
                ...userDataFromDatabase
              };
              commit("setUser", userData);
            commit("setStatus", "success");
            commit("setError", null);
            router.replace("home");
          })
        })
        .catch(error => {
          commit("setStatus", "failure");
          commit("setError", error.message);
        });
    },
    signInActionSocial({ commit }) {
      const provider = new firebase.socialAuth.GoogleAuthProvider();
      firebase.auth
        .signInWithPopup(provider)
        .then(response => {
          return firebase.db
            .collection("users")
            .doc(response.user.uid)
            .set({
              realname: response.user.displayName,
            }).then(() => {
              commit("setUser", { id: response.user.uid, realname: response.user.displayName });
              commit("setStatus", "success");
              commit("setError", null);
              router.replace("home");
          })
        })
        .catch(error => {
          commit("setStatus", "failure");
          commit("setError", error.message);
        });
    },
    signOutAction({ commit }) {
      firebase.auth
        .signOut()
        .then(response => {
          commit("setUser", null);
          commit("setStatus", "success");
          commit("setError", null);
          router.replace("login");
        })
        .catch(error => {
          commit("setStatus", "failure");
          commit("setError", error.message);
        });
    }
  },
  getters: {
    status(state) {
      return state.status;
    },
    user(state) {
      return state.user;
    },
    error(state) {
      return state.error;
    }
  }
});
