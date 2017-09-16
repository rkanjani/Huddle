getLocation.then(function(location){
  alert("You're located at ${location.longitude} and ${position.latitude}");

  //Check firebase for existing huddles

  //If so, join that huddle and render current chat

  //If not, suggest creating a huddle


}).catch(function(err){
  alert("Please enable your location services on your browser");
})


createHuddle(location){
  
}

getLocation(){
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
