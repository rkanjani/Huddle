getLocation().then(function(location){
  console.log("You're located at " + location.longitude + " and  " + location.latitude);

  $.post("/locationRecieved", {location: location});


  //Check firebase for existing huddles

  //If so, join that huddle and render current chat

  //If not, suggest creating a huddle


}).catch(function(err){
  alert("Please enable your location services on your browser");
});

function getLocation(){
  return new Promise(function(resolve, reject){
    navigator.geolocation.getCurrentPosition(function(position) {
      const location = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      }

      resolve(location);
    }, function(err){
      reject(err)
    });
  })
}
