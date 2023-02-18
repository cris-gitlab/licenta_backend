const express = require("express");
const router = express.Router();

const {
  createRating,
  getMyRating,
  getProductAverage,
  updateRating,
} = require("../controllers/ratingController");

const { protect } = require("../middleware/authmiddleware");

router.route("/").post(protect, createRating).patch(protect, updateRating)
router.route("/:productId").get(getProductAverage);
router.route("/:productId/me").post(protect, getMyRating)
module.exports = router;
