$(document).ready(function () {

  const firebaseConfig = {
    apiKey: "AIzaSyDptzalblggmxw1uUs9IKgpGkNi59jz0n8",
    authDomain: "train-scheduler-4a98d.firebaseapp.com",
    databaseURL: "https://train-scheduler-4a98d.firebaseio.com",
    projectId: "train-scheduler-4a98d",
    storageBucket: "train-scheduler-4a98d.appspot.com",
    messagingSenderId: "512904481254",
    appId: "1:512904481254:web:07ff3de406bcfc9ab72e27",
    measurementId: "G-396Q7J83HM"
  };


  firebase.initializeApp(firebaseConfig);

  var database = firebase.database().ref();

  console.log("this is database :" + database)
  database.ref().on("child_added", function (snapshot) {

    // Convert first train hours to minutes
    var firstTrainHoursMinutesArr = snapshot.val().firstTrain.split(":", 2);
    var firstTrainHours = parseInt(firstTrainHoursMinutesArr[0]);
    var firstTrainMinutes = parseInt(firstTrainHoursMinutesArr[1]);
    var firstTrainHoursToMinutes = firstTrainHours * 60
    var firstTrainMinutesTotal = (firstTrainHoursToMinutes) + firstTrainMinutes
    var timeNow = new Date();
    var getHours = timeNow.getHours();
    var getMinutes = timeNow.getMinutes();
    var timeNowinMinutes = (getHours * 60) + getMinutes
    // Get next train time by verifying that next train is in the future and not in the past
    while (timeNowinMinutes > firstTrainMinutesTotal) {

      firstTrainMinutesTotal = parseInt(firstTrainMinutesTotal) + parseInt(snapshot.val().frequency)
    }

    var nextTrainArrivalHour = parseInt(firstTrainMinutesTotal / 60)
    var minutesAway = firstTrainMinutesTotal - timeNowinMinutes
    var nextTrainArrivalMinutes = (getMinutes + minutesAway);
    if (nextTrainArrivalMinutes >= 60 && nextTrainArrivalMinutes < 120) {
      nextTrainArrivalMinutes = nextTrainArrivalMinutes - 60
    }
    if (nextTrainArrivalMinutes >= 120 && nextTrainArrivalMinutes < 180) {
      nextTrainArrivalMinutes = nextTrainArrivalMinutes - 120
    }
    if (nextTrainArrivalMinutes >= 180 && nextTrainArrivalMinutes < 240) {
      nextTrainArrivalMinutes = nextTrainArrivalMinutes - 180
    }
    if (nextTrainArrivalMinutes >= 240 && nextTrainArrivalMinutes < 300) {
      nextTrainArrivalMinutes = nextTrainArrivalMinutes - 240
    }
    if (nextTrainArrivalMinutes >= 300 && nextTrainArrivalMinutes < 360) {
      nextTrainArrivalMinutes = nextTrainArrivalMinutes - 300
    }
    if (nextTrainArrivalMinutes >= 360 && nextTrainArrivalMinutes < 420) {
      nextTrainArrivalMinutes = nextTrainArrivalMinutes - 360
    }
    if (nextTrainArrivalMinutes < 10) {
      nextTrainArrivalMinutes = "0" + nextTrainArrivalMinutes
    }

    var nextTrainArrivalFinal = nextTrainArrivalHour + ":" + nextTrainArrivalMinutes
    var markup = "<tr><td>" + snapshot.val().train + "</td><td>" + snapshot.val().destination + "</td><td>" + snapshot.val().frequency + "</td><td>" + nextTrainArrivalFinal + "</td><td>" + minutesAway + "</td></tr>";

    //Add trains already on firebase when page opens

    $("table tbody").append(markup);
  }, function (errorObject) {
    console.log("The read failed: " + errorObject.code);
  });
  
  // On click function to add more trains
  $(".btn").click(function () {
    event.preventDefault();
    var train = $("#input-train-name").val().trim();
    var destination = $("#input-destination").val().trim();
    var firstTrain = $("#input-first-train-time").val().trim();
    var frequency = $("#input-frequency").val().trim();
    // Convert first train hours to minutes
    var firstTrainHoursMinutesArr = firstTrain.split(":", 2);
    var firstTrainHours = parseInt(firstTrainHoursMinutesArr[0]);
    var firstTrainMinutes = parseInt(firstTrainHoursMinutesArr[1]);
    var firstTrainHoursToMinutes = firstTrainHours * 60
    var firstTrainMinutesTotal = (firstTrainHoursToMinutes) + firstTrainMinutes
    // Convert present time to minutes
    var timeNow = new Date();
    var getHours = timeNow.getHours();
    var getMinutes = timeNow.getMinutes();
    var timeNowinMinutes = (getHours * 60) + getMinutes
    // Get next train time by verifying that next train is in the future and not in the past (same code from page load)
    while (timeNowinMinutes > firstTrainMinutesTotal) {
      firstTrainMinutesTotal = parseInt(firstTrainMinutesTotal) + parseInt(frequency)
    }
    var nextTrainArrivalHour = parseInt(firstTrainMinutesTotal / 60)
    var minutesAway = firstTrainMinutesTotal - timeNowinMinutes
    var nextTrainArrivalMinutes = (getMinutes + minutesAway);
    if (nextTrainArrivalMinutes >= 60 && nextTrainArrivalMinutes < 120) {
      nextTrainArrivalMinutes = nextTrainArrivalMinutes - 60
    }
    if (nextTrainArrivalMinutes >= 120 && nextTrainArrivalMinutes < 180) {
      nextTrainArrivalMinutes = nextTrainArrivalMinutes - 120
    }
    if (nextTrainArrivalMinutes >= 180 && nextTrainArrivalMinutes < 240) {
      nextTrainArrivalMinutes = nextTrainArrivalMinutes - 180
    }
    if (nextTrainArrivalMinutes >= 240 && nextTrainArrivalMinutes < 300) {
      nextTrainArrivalMinutes = nextTrainArrivalMinutes - 240
    }
    if (nextTrainArrivalMinutes >= 300 && nextTrainArrivalMinutes < 360) {
      nextTrainArrivalMinutes = nextTrainArrivalMinutes - 300
    }
    if (nextTrainArrivalMinutes >= 360 && nextTrainArrivalMinutes < 420) {
      nextTrainArrivalMinutes = nextTrainArrivalMinutes - 360
    }
    if (nextTrainArrivalMinutes < 10) {
      nextTrainArrivalMinutes = "0" + nextTrainArrivalMinutes
    }
    var nextTrainArrivalFinal = nextTrainArrivalHour + ":" + nextTrainArrivalMinutes
    database.ref().push({
      train: train,
      destination: destination,
      frequency: frequency,
      firstTrain: firstTrain,
      nextTrainArrivalFinal: nextTrainArrivalFinal,
      minutesAway: minutesAway,
      dateAdded: firebase.database.ServerValue.TIMESTAMP
    });
    // Add data to table inside html page after previous train rows from firebase limiting to only last entry
    database.ref().limitToLast(1).on("child_added", function (snapshot) {
      var markup = "<tr><td>" + snapshot.val().train + "</td><td>" + snapshot.val().destination + "</td><td>" + snapshot.val().frequency + "</td><td>" + nextTrainArrivalFinal + "</td><td>" + minutesAway + "</td></tr>";
      $("table tbody").append(markup);
    }, function (errorObject) {
      console.log("The read failed: " + errorObject.code);
    });
  });
});