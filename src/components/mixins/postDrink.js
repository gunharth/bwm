import firebase from "../../firebaseConfig.js";
import router from "../../router";

export default (url, comment, authorNickname, authorId) => {
  let d = new Date();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  console.log(firebase.db);

  firebase.db
    .collection("drinks")
    .add({
      url,
      comment,
      info: `Posted by ${authorNickname != "" ? authorNickname : "Unknow"} on ${days[d.getDay()]}`,
      authorId: authorId,
      created_at: new Date().getTime()
    })
    .then(router.push({ name: "home" }));
};
