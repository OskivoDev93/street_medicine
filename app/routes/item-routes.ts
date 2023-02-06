const express = require("express");
const router = express.Router();
const {
  createItem,
  listItems,
  deleteItem,
  findOneItem,
  updateOneItem,
} = require("../controllers/item-controller/item-controller");

router.route("/").post(createItem);
router.route("/list").get(listItems);
router.route("/:uuid").delete(deleteItem).get(findOneItem).put(updateOneItem);

module.exports = router;
