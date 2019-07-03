import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/messaging";
import "firebase/storage";
import "firebase/auth";
import { config } from "@/firebaseCredentials.js";

firebase.initializeApp(config);
// Initialize Cloud Firestore through Firebase
let db = firebase.firestore();
db.enablePersistence({ synchronizeTabs: true });
const storage = firebase.storage();
let messaging = null;
if (firebase.messaging.isSupported()) {
  messaging = firebase.messaging();
}
const auth = firebase.auth();
const socialAuth = firebase.auth;
export default {
  db,
  storage,
  messaging,
  auth,
  socialAuth
};
