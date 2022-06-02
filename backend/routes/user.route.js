const express = require("express");
const router = express.Router();
const {
  getAllInfo,
  createUser,
  singleUser,
  updateUser,
  deletedUser,
} = require("../controllers/user.controller");

router.post("/user-register", createUser);
router.get("/get-alluser", getAllInfo);
router.get("/single/:id", singleUser);
router.put("/update-user/:id", updateUser);
router.delete("/deletedUser/:id", deletedUser);

module.exports = router;
