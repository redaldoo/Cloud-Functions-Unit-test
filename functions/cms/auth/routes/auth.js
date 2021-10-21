const router = require("express").Router();
const { login, autoConnect } = require("../controllers/auth");

// GET ALL
router.route("/login").post(login);
router.route("/connect").get(autoConnect);

module.exports = router;
