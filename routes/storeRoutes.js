const express = require("express");
const router = express.Router();
const {
  getStores,
  createStore,
  updateStore,
  deleteStore,
  getStore,
  getMyStore,
} = require("../controllers/storeController");

const uploadImg = require("../middleware/imgMiddleware");
const { protect } = require("../middleware/authmiddleware");

router
  .route("/")
  .get(getStores)
  .post(protect, uploadImg("stores").single("storeImg"), createStore);
router
  .route("/:id")
  .get(getStore)
  .put(protect, uploadImg("stores").single("storeImg"), updateStore)
  .delete(protect, deleteStore);
router
  .route("/mine/:id")
  .get(protect, getMyStore)
  .patch(protect, uploadImg("stores").single("storeImg"), updateStore)
module.exports = router;
