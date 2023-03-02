const express = require("express");
const router = express.Router();
const {
  getStores,
  createStore,
  updateStore,
  deleteStore,
  getStore,
  getMyStore,
  changeStatus,
} = require("../controllers/storeController");

const uploadImg = require("../middleware/imgMiddleware");
const { protect } = require("../middleware/authmiddleware");
const { protectAdmin } = require("../middleware/adminmiddleware")

router
  .route("/")
  .get(getStores)
  .post(protect, uploadImg("stores").single("storeImg"), createStore);
router
  .route("/:id")
  .get(getStore)
  .put(protect, uploadImg("stores").single("storeImg"), updateStore)
  .patch(protectAdmin, changeStatus)
  .delete(protect, deleteStore);
router
  .route("/mine/:id")
  .get(protect, getMyStore)
  .patch(protect, uploadImg("stores").single("storeImg"), updateStore)

module.exports = router;
