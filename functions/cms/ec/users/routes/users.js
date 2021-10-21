const express = require("express");
const router = express.Router();
//const celebrate = require("celebrate");
const {
  create,
  update,
  readAll,
  readOne,
  remove,
} = require("../controllers/users");

// GET ALL
router.route("/").get(readAll);
// CREATE NEW
router.route("/").post(create);
// GET ONE
router.route("/:id").get(readOne);
// UPDATE ONE
router.route("/:id").put(update);
// DELETE ONE
router.route("/:id").delete(remove);

module.exports = router;
