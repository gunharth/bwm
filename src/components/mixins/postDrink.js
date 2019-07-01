import firebase from "../../firebaseConfig.js";
import router from "../../router";

export default (url, comment, authorNickname, authorId, lat, lng) => {
  // let d = new Date();
  // let days = [
  //   "Sunday",
  //   "Monday",
  //   "Tuesday",
  //   "Wednesday",
  //   "Thursday",
  //   "Friday",
  //   "Saturday"
  // ];
  //console.log(firebase.db);

  firebase.db
    .collection("drinks")
    .add({
      url,
      comment,
      info: `${authorNickname != "" ? authorNickname : "Unknow"}`,
      authorId: authorId,
      lat: lat,
      lng: lng,
      created_at: new Date().getTime()
    })
    .then(router.push({ name: "home" }));
};
