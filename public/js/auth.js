firebase.auth().signInAnonymously().catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  console.error("Error on anonymous singin: " + errorMessage)
});


firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    console.log(user)
    var isAnonymous = user.isAnonymous;
    var uid = user.uid;
    // Save the user
    navigator.geolocation.getCurrentPosition(function(position) {
      writeUserData(uid, position.coords.latitude, position.coords.longitude)
    });
  } else {
    // User is signed out.
  }
});

function writeUserData(userId, lat, lon) {
  firebase.database().ref('users/' + userId).set({
    lat: lat,
    lon: lon
  });
}
