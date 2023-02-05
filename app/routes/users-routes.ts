const express = require("express");
const router = express.Router();
import { Response, Request } from "express";
const {
  getUsers,
  getOneUser,
  createUser,
  deleteOneUser,
} = require("../controllers/user-controller/user-controller");

router.route("/").get(getUsers).post(createUser);
router.route("/:uuid").get(getOneUser).delete(deleteOneUser);

module.exports = router;
