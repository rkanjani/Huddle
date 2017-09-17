// Initialize Firebase
var config = {
  apiKey: "AIzaSyB1Fvs-hHHZtN3JVU3iG7lL9JaU5vR180o",
  authDomain: "huddle-685b2.firebaseapp.com",
  databaseURL: "https://huddle-685b2.firebaseio.com",
  projectId: "huddle-685b2",
  storageBucket: "huddle-685b2.appspot.com",
  messagingSenderId: "66066916355"
};
firebase.initializeApp(config);
var database = firebase.database();

console.log(firebase.app().name);  // "[DEFAULT]"
