const functions = require("firebase-functions");
const admin = require("firebase-admin");
const axios = require("axios");
var cors = require("cors")({ origin: true });
const serverKey = require("./serverKey");

admin.initializeApp(functions.config().firebase);
let firestore = admin.firestore();

exports.GeneralSubscription = functions.https.onRequest((request, response) => {
  console.log("token", request.body.token);

  cors(request, response, function() {
    axios
      .post(
        `https://iid.googleapis.com/iid/v1/${
          request.body.token
        }/rel/topics/general`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `key=${serverKey}`
          }
        }
      )
      .then(res => {
        firestore
          .collection("tokens")
          .add({
            token: request.body.token
          })
          .then(ref => {
            console.log("Document added ID: ", ref.id);
            response.status(200).send(`notifications subscription successful`);
          });
      })
      .catch(err => {
        console.log(err);
        console.log(err.response);
        response.status(500).send({
          message: "Whops! there was an error",
          error: err.response
        });
      });
  });
});

exports.createDog = functions.firestore
  .document("dogs/{dogId}")
  .onCreate(event => {
    var dog = event.data();

    console.log(dog.comment);

    axios
      .post(
        `https://fcm.googleapis.com/fcm/send`,
        {
          to: "/topics/general",
          priority: "high",
          notification: {
            title: "Nueva publicación",
            body: dog.comment,
            click_action: "http://localhost:8081",
            icon:
              "http://localhost:8081/chrome/chrome-installprocess-128-128.png"
          }
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `key=${serverKey}`
          }
        }
      )
      .then(response => {
        console.log(response);
        console.log(response.data);
      })
      .catch(err => {
        console.log(err.response);
      });
  });

exports.createUser = functions.firestore
  .document("users/{userId}")
  .onCreate(event => {
    var user = event.data();

    console.log(user.nickname);

    axios
      .post(
        `https://fcm.googleapis.com/fcm/send`,
        {
          to: "/topics/general",
          priority: "high",
          notification: {
            title: "New User",
            body: user.nickname,
            click_action: "http://localhost:8081",
            icon:
              "http://localhost:8081/chrome/chrome-installprocess-128-128.png"
          }
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `key=${serverKey}`
          }
        }
      )
      .then(response => {
        console.log(response);
        console.log(response.data);
      })
      .catch(err => {
        console.log(err.response);
      });
  });
