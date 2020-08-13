var firebaseConfig = {
    apiKey: "AIzaSyDptzalblggmxw1uUs9IKgpGkNi59jz0n8",
    authDomain: "train-scheduler-4a98d.firebaseapp.com",
    databaseURL: "https://train-scheduler-4a98d.firebaseio.com",
    projectId: "train-scheduler-4a98d",
    storageBucket: "train-scheduler-4a98d.appspot.com",
    messagingSenderId: "512904481254",
    appId: "1:512904481254:web:07ff3de406bcfc9ab72e27",
    measurementId: "G-396Q7J83HM"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  var database = firebase.database();


//on click event to prevent page from reloading when submit button clicked
  $("#submit-button").on("click", function(event) {
    event.preventDefault();
  
    //grab values from input boxes and assign to respective variable
    var tName = $("#train-name").val().trim();
    var tDestination = $("#train-destination").val().trim();
    var firstTrain = $("#train-start").val().trim();
    var trainFreq = $("#train-frequency").val().trim();
    //create object to hold new train info
    var newTrain = {
        name: tName,
        destination: tDestination,
        start: firstTrain,
        frequency: trainFreq,
    };
//upload new train data to database
    database.ref().push(newTrain);
    //log to console
    console.log(newTrain.name);
    console.log(newTrain.destination);
    console.log(newTrain.start);
    console.log(newTrain.frequency);
    //clear text boxes
    $("#train-name").val("");
    $("#train-destination").val("");
    $("#train-start").val("");
    $("#train-frequency").val("");

});
// //create Firebase event for adding train to database and row in chart in html when input is added
// database.ref().on("child_added", function(childSnapshot) {
//     console.log(childSnapshot.val())
//     //store snapshots in variables
//     var tName = childSnapshot.val().name;
//     var tDestination = childSnapshot.val().destination;
//     var firstTrain = childSnapshot.val().start;
//     var trainFreq = childSnapshot.val().frequency;
//     //train info
//     console.log(tName);
//     console.log(tDestination);
//     console.log(firstTrain);
//     console.log(trainFreq);
//     //calculate next arrival
//     var nextArrival = moment(firstTrain, "HH:mm").from(moment(trainFreq, "m"));
//     nextArrival = moment().format("HH:mm");
//     console.log("Next arrival: " + nextArrival);
//     //calculate how many minutes until next train
//     // var now = moment().format("HH:mm");
//     var minsArrive = nextArrival - trainFreq;
//     console.log("Minutes until next train: " + minsArrive);
//     //create the new row
//     var newRow = $("<tr>").append(
//         $("<td>").text(tName),
//         $("<td>").text(tDestination),
//         $("<td>").text(firstTrain),
//         $("<td>").text(trainFreq),
//         $("<td>").text(nextArrival),
//         $("<td>").text(minsArrive),
//     );
//     //append new row to table
//     $("#train-table").append(newRow);

// }, function(errorObject) {
//     console.log("Errors handled:" + errorObject.code);
// });