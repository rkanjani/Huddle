// =========================
// Huddle related operations

// The distance threshold to determine which huddle to join
var huddleJoinDistanceThreshold = 3

function createNewHuddle(huddleName, uid, latitude, longitude){
  var huddleRef = '/huddles/'+ huddleName
  var huddleUserRef = '/users/' + uid + '/huddles/' + huddleName
  var huddleData = {
    uid: uid,
    lat: latitude,
    lon: longitude,
    time: new Date(),
    members: {},
  };
  huddleData['members'][uid] = true
  var huddleUserData = {}
  huddleUserData[huddleName] = true

  var updates = {};
  updates[huddleRef] = huddleData
  updates[huddleUserRef] = huddleUserData
  return firebase.database().ref().update(updates);
}

function getJoinHuddleUpdates(uid, huddleNameArray) {
  var updates = {}
  var temp = {}
  huddleNameArray.map(function(huddleName) {
    var huddleMemberRef = '/huddles/'+ huddleName + '/members/'
    var userHuddleRef = '/users/'+ uid + '/huddles/'

    // Use variables as hash key
    temp[uid] = true
    updates[huddleRef] = Object.assing({}, temp) // Clone temp
    temp = {}
    temp[huddleName] = true
    updates[userHuddleRef] = Object.assing({}, temp) // Clone temp
  })
  return updates
}

function joinHuddle(uid, huddleNameArray){
  return new Promise(function(fulfill, reject) {
    var huddleUpdates = getJoinHuddleUpdates(uid, huddleNameArray)
    database.ref('huddles').on("value", function(snapshot) {
      firebase.database().ref().update(huddleUpdates)
        .then(function(result) {
          fulfill(result)
        })
        .catch(function(err) {
          reject(err)
        })
    })
  })
}

// =======================
// Distance calc

// Holy shit this is actually acurate
function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2-lat1);  // deg2rad below
  var dLon = deg2rad(lon2-lon1);
  var a =
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ;
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  var d = R * c; // Distance in km
  return d;
}

function deg2rad(deg) {
  return deg * (Math.PI/180)
}

// =======================
// Huddles query

function getAllHuddles() {
  return new Promise(function(resolve, reject) {
    database.ref('huddles').on("value", function(snapshot) {
      if (snapshot) {
        resolve(snapshot.val())
      }
      else
        reject('No all huddles snapshot found')
    })
  })
}

function getAllNearbyHuddles(){
  return getAllHuddles().then(function(huddles) {
    return new Promise(function(fulfill, reject) {
      var huddleList = []
      if (!huddles)
        reject("No huddles in the system")

      Object.keys(huddles).forEach(function(h) {
        var origin = huddles[h]
        if (getDistanceFromLatLonInKm(origin["lat"], origin["lon"], userData.lat, userData.lon) < huddleJoinDistanceThreshold) {
          huddleList.push(h)
        }
      })

      if (huddleList.length == 0)
        return reject("No nearby huddles")
      else
        return fulfill(huddleList)
    })
  })
}

