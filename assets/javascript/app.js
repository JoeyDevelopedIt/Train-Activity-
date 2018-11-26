var config = {
    apiKey: "AIzaSyCrc3FljwlvXZeMlX8x6rVzerSeHH9gs6s",
    authDomain: "metro-train-times.firebaseapp.com",
    databaseURL: "https://metro-train-times.firebaseio.com",
    projectId: "metro-train-times",
    storageBucket: "metro-train-times.appspot.com",
    messagingSenderId: "544576642015"
  };
  firebase.initializeApp(config);
  
  var database = firebase.database();
  
  // 2. Button for adding train
  $("#add-train-btn").on("click", function(event) {
    event.preventDefault();
  
    // Grabs user input
    var trainName = $("#train-name-input").val().trim();
    var trainDest = $("#destination-input").val().trim();
    var trainTime = moment($("#find-input").val().trim(), "hh:mm A").format("X");
    var trainFreq= $("#freq-input").val().trim();
  
    // Creates local "temporary" object for holding train data
    var addTrain = {
      name: trainName,
      destination: trainDest,
      time: trainTime,
      freq: trainFreq,
    };
  
    // Uploads train data to the database
    database.ref().push(addTrain);
  
    // Logs everything to console
    console.log(addTrain.name);
    console.log(addTrain.destination);
    console.log(addTrain.time);
    console.log(addTrain.freq);
  
    alert("Train successfully added");
  
    // Clears all of the text-boxes
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#find-input").val("");
    $("#freq-input").val("");
  });
  
  //Create Firebase event 
  database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());
  
    // Store everything into a variable.
    var trainName = childSnapshot.val().name;
    var trainDest = childSnapshot.val().destination;
    var trainTime = childSnapshot.val().time;
    var trainFreq = childSnapshot.val().freq;
  
    // Train Info
    console.log(trainName);
    console.log(trainDest);
    console.log(trainTime);
    console.log(trainFreq);

  

var tFrequency = 15;

// Time
var firstTime = "01:00";

// First Time (pushed back 1 year to make sure it comes before current time)
var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
console.log(firstTimeConverted);

// Current Time
var currentTime = moment();
console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

// Difference between the times
var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
console.log("DIFFERENCE IN TIME: " + diffTime);

// Time apart (remainder)
var tRemainder = diffTime % tFrequency;
console.log(tRemainder);

// Minutes Until Train
var tMinutesTillTrain = tFrequency - tRemainder;
console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);
console.log("15" + 10);

// Next Train
var nextTrain = moment().add(tMinutesTillTrain, "minutes");
console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm A"));

  
    // Create the new row
    var newRow = $("<tr>").append(
      $("<td>").text(trainName),
      $("<td>").text(trainDest),
      $("<td>").text(trainFreq),
      $("<td>").text(nextTrain),
      $("<td>").text(tMinutesTillTrain),
    );
  
    // Append the new row to the table
    $("#train-table > tbody").append(newRow);
  });
  

