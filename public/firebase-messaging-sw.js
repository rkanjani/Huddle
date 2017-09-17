importScripts("https://www.gstatic.com/firebasejs/4.3.0/firebase-app.js")
importScripts("https://www.gstatic.com/firebasejs/4.3.0/firebase-messaging.js")
importScripts('/node_modules/workbox-sw/build/workbox-sw.vX.X.X.prod.js');

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

var messaging = firebase.messaging()


const workboxSW = new WorkboxSW();
workboxSW.precache([
  {
    url: '/index.html',
    revision: 'bb121c',
  }, {
    url: '/stylesheets/css/style.css',
    revision: 'acd123',
  }, {
    url: '/scripts/init.js',
    revision: 'a32caa',
  }, {
    url: '/scripts/auth.js',
    revision: 'a32caa',
  }, {
    url: '/scripts/msg.js',
    revision: 'a32caa',
  }, {
    url: '/scripts/huddle.js',
    revision: 'a32caa',
  }, {
    url: '/scripts/main.js',
    revision: 'a32caa',
  }
]);


