const admin = require("firebase-admin");
const config = require("./config");
const serviceAccount = require("./trybuy-d42d2-firebase-adminsdk-fynps-3349460e8d.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
const db = admin.firestore();
const storage = admin.storage().bucket(config.storageBucket);

module.exports = { admin, db, storage };
