const config = require("./config");
const firebase = require("firebase");
const fbApp = firebase.initializeApp(config);

module.exports = { fbApp, firebase };
