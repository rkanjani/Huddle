var messaging = firebase.messaging()
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
