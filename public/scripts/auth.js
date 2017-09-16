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
    console.log(isAnonymous + ' ' + uid);
  } else {
    // User is signed out.
  }
});

function writeUserData(userId, name, email, imageUrl) {
  firebase.database().ref('users/' + userId).set({
    username: name,
    email: email,
    profile_picture : imageUrl
  });
}
