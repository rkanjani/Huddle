var userData;
function signIn() {
  return new Promise(function(fulfill, reject) {
    firebase.auth().signInAnonymously()
      .then(function(user) {
        console.log("User signed in anonymously")
        navigator.geolocation.getCurrentPosition(function(position) {
          writeUserData(uid, position.coords.latitude, position.coords.longitude)
          return fulfill(userData)
        });
      })
      .catch(function(error) {
          // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.error("Error on anonymous singin: " + errorMessage)
        return reject("Sign in error")
      });
  })
}

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    var isAnonymous = user.isAnonymous;
    uid = user.uid;
    console.log('authState change triggered')
  } else {
    console.log('user signed out')
  }
});

function writeUserData(userId, lat, lon) {
  console.log(userId)
  userData = {
    uid: userId,
    lat: lat,
    lon: lon,
  }
  firebase.database().ref('users/' + userId).set({
    lat: lat,
    lon: lon
  });
  // Set global userData object for other fileg
}
