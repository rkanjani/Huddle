var messaging = firebase.messaging()

// Notification
messaging.requestPermission()
.then(function() {
  console.log('Notification permission granted.');
  return messaging.getToken()
})
.catch(function(err) {
  console.log('Unable to get permission to notify.', err);
})
.then(function(currentToken) {
  console.log(currentToken)
  if (currentToken) {
    // sendTokenToServer(currentToken);
    updateUIForPushEnabled(currentToken);
  } else {
    // Show permission request.
    console.log('No Instance ID token available. Request permission to generate one.');
    // Show permission UI.
    updateUIForPushPermissionRequired();
    setTokenSentToServer(false);
  }
})
.catch(function(err) {
  console.log('An error occurred while retrieving token. ', err);
  showToken('Error retrieving Instance ID token. ', err);
  setTokenSentToServer(false);
});

messaging.onMessage(function(payload) {
  console.log('onMessage ' + payload);
})

function createNewHuddle(huddleName, dateCreated, creator, longitude, latitude, users){

}

function joinHuddle(huddleId){

}

function getAllMessagesForHuddle(huddleId){

}

function getAllNearbyHuddles(longitude, latitude){

}


// var obj = {
//   sender: "",
//   dateSent: new Date(),
//   content: ""
// }
//
// huddle = {
//   huddleName, dateCreated, creator, longitude, latitude, users
// }

function writeNewMessage(huddleName, uid, body) {
  // A post entry.
  var huddleMsgRef = '/huddles/'+ huddleName + '/messages/'
  var newMsgKey = firebase.database().ref('/huddles/' + huddleName + '/messages').push().key
  var msgData = {
    uid: uid,
    body: body,
    time: getTime()
  };

  // Write the new post's data simultaneously in the posts list and the user's post list.
  var updates = {};
  updates[huddleMsgRef + newMsgKey] = msgData;
  // Should there be msg field for user too?
  // updates['/user-posts/' + uid + '/' + newPostKey] = postData;

  return firebase.database().ref().update(updates);
}

function getAllMsgs() {
  return new Promise(function(resolve, reject) {
    database.ref('huddles/test_huddle/messages').on("value", function(snapshot) {
      if (snapshot) {
        resolve(snapshot.val())
      }
      else
        reject('No snapshot found')
    })
  })
}

function getTime() {
  return Math.round(new Date().getTime() / 1000)
}

getAllMsgs().then(function(msgs) {
  console.log(msgs)
  Object.keys(msgs).forEach(function(key) {
    console.log(key)
  })
})
writeNewMessage('test_huddle', uid, "AYOOO")
