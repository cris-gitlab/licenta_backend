const express = require("express");
const router = express.Router();

const {
  getProductComments,
  createComment,
  editComments,
} = require("../controllers/commentController");

const { protect } = require("../middleware/authmiddleware");

router.route("/").post(protect, createComment).patch(protect, editComments);
router.route("/:productId").get(getProductComments);
module.exports = router;
