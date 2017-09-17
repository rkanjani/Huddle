var huddleApp = angular.module('huddleApp', []);

huddleApp.controller('mainController', function mainController($scope) {

  $scope.currentMessage = '';
  $scope.isCreatingHuddle = false;
  $scope.username = "rkanjani";
  $scope.nearbyHuddles = [
    {
      name:"Caledon Park",
      dateCreated: +new Date(),
      numOfUsers: 30
    }
  ];

  $scope.messages = [
      {sender: "Matt",
      dateSent: "Mar 23",
      content: "Hey guys, anyone down to get some coffee today?"}
  ];

  $scope.getLocation = function(){
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

  $scope.sendMessage = function(){
    const message = {
      sender: $scope.username,
      dateSent: +new Date(),
      content: $scope.currentMessage
    }

    $scope.messages.push(message);
    $scope.currentMessage = "";
    writeNewMessage("test_huddle", 101, message.content)
  }

  $scope.saveHuddle = function(){
    var obj = {
      name: $scope.newHuddleName,
      dateCreated: +new Date(),
      numOfUsers: 1
    }

    $scope.nearbyHuddles.push(obj);
    $scope.newHuddleName = '';
    $scope.isCreatingHuddle = false;
    //Create new huddle and send to server
  }

  $scope.getLocation().then(function(location){
    console.log("You're located at " + location.longitude + " and  " + location.latitude);

    $.post("/locationRecieved", {location: location});


    //Check firebase for existing huddles

    //If so, join that huddle and render current chat

    //If not, suggest creating a huddle


  }).catch(function(err){
    alert("Please enable your location services on your browser");
  });



});
