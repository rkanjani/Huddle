var allHuddleMsgs = {}

// There should be a loading sign while this is running
function runLoader() {
}

function stopLoader() {
}

signIn()
  .then(function(userData) {
    return getAllNearbyHuddles()
  })
  .then(function(huddleList) {
    console.log("Found  nearby huddleList: " + huddleList)
    return new Promise(function(fulfill, reject) {
      joinHuddle(huddleList)
        .then(function(successMsg) {
          return getAllHuddleMsgs(huddleList)
        })
    })
  })
  .then(function(msgList) {
    console.log(msgList)
  })
  .catch(function(err) {
    console.log("Didn't found  huddleList: " + err)
    createNewHuddle("new_huddle", userData.uid, userData.lat, userData.lon)
      .then(function(success) {
        console.log("= = = = = = = New Huddle has been made!")
      })
  })

