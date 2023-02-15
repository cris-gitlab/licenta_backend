const express = require("express");
const router = express.Router();
const {
  getOrders,
  createOrder,
  getStoreOrders,
  getOrder,
  updateOrder,
  getMyOrders,
} = require("../controllers/oderController");

const { protect } = require("../middleware/authmiddleware");

router.route("/").get(getOrders).post(createOrder);
router.route("/storeOrders").post(getStoreOrders).patch(updateOrder);
router.route("/myOrders/:id").get(getOrder)
router.route("/myOrders").get(protect, getMyOrders)

module.exports = router;
