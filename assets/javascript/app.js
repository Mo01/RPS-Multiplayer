// Initialize Firebase
// Make sure to match the configuration to the script version number in the HTML
// (Ex. 3.0 != 3.7.0)
var config = {
    apiKey: "AIzaSyC8ZuAzfH4SmA2lxojUKIlhsdSAzSsp81U",
    authDomain: "rps-multiplayer-78dac.firebaseapp.com",
    databaseURL: "https://rps-multiplayer-78dac.firebaseio.com",
    projectId: "rps-multiplayer-78dac",
    storageBucket: "rps-multiplayer-78dac.appspot.com",
    messagingSenderId: "1080271631636"
  };
  firebase.initializeApp(config);
  
  // Create a variable to reference the database.
  var database = firebase.database();
  
  // -----------------------------
  
  // connectionsRef references a specific location in our database.
  // All of our connections will be stored in this directory.
  var connectionsRef = database.ref("/connections");
  
  // '.info/connected' is a special location provided by Firebase that is updated
  // every time the client's connection state changes.
  // '.info/connected' is a boolean value, true if the client is connected and false if they are not.
  var connectedRef = database.ref(".info/connected");
  
  // When the client's connection state changes...
  connectedRef.on("value", function(snap) {
  
    // If they are connected..
    if (snap.val()) {
  
      // Add user to the connections list.
      var con = connectionsRef.push(true);
      // Remove user from the connection list when they disconnect.
      con.onDisconnect().remove();
    }
  });

  // When first loaded or when the connections list changes...
connectionsRef.on("value", function(snap) {

    // Display the viewer count in the html.
    // The number of online users is the number of children in the connections list.
    $("#connected-viewers").text(snap.numChildren());
  });