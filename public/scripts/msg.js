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
  if (currentToken) {
    // sendTokenToServer(currentToken);
    // updateUIForPushEnabled(currentToken);
  } else {
    // Show permission request.
    console.log('No Instance ID token available. Request permission to generate one.');
    // Show permission UI.
    // updateUIForPushPermissionRequired();
    // setTokenSentToServer(false);
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

function getHuddleMsgs(huddleName) {
  return new Promise(function(resolve, reject) {
    database.ref('huddles/' + huddleName + '/messages').on("value", function(snapshot) {
      if (snapshot) {
        var msg = {}
        msg[huddleName] = snapshot.val()
        resolve(msg)
      }
      else
        reject('No huddle messages snapshot found')
    })
  })
}

function getAllHuddleMsgs(huddleList) {
  console.log("Found huddleList: " + huddleList)
  var getMsgPromises = []
  huddleList.forEach(function(huddleName) {
    getMsgPromises.push(getHuddleMsgs(huddleName))
  })

  return new Promise(function(fulfill, reject) {
    // Wait until msgs for all huddles are loaded
    Promise.all(getMsgPromises)
      .then(function(msgs) {
        var msgList = {}
        // Concat all msg hashes to msgList
        msgs.forEach(function(msg) {
          Object.assign(msgList, msg)
        })
        return fulfill(msgList)
      })
      .catch(function(err) {
        return reject('Somthing happend in getAllHuddleMsgs: ' + err)
      })
  })
}

function getTime() {
  return Math.round(new Date().getTime() / 1000)
}
