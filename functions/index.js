const express = require("express");
const V1 = require("express")();
const functions = require("firebase-functions");
const cors = require("cors");
const helmet = require("helmet");
const app = express();
V1.use(cors());
V1.use(helmet());

const { filesUpload } = require("./cms/middleware/filesUpload");

app.use("/auth", require("./cms/auth/routes/auth"));
app.use("/users", require("./cms/ec/users/routes/users"));

V1.use("/v1", filesUpload, app);

exports.api = functions.region("us-central1").https.onRequest(V1);
