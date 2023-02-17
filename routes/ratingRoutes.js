const express = require("express");
const router = express.Router();

const {
  createRating,
  getMyRating,
  getProductAverage,
} = require("../controllers/ratingController");

const { protect } = require("../middleware/authmiddleware");

router.route("/").post(protect, createRating)
router.route("/:productId").get(getProductAverage);
router.route("/:productId/me").post(protect, getMyRating)
module.exports = router;
