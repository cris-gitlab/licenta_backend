const express = require("express");
const router = express.Router();
const {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getMyProducts,
  getProductInfo,
} = require("../controllers/productController");

const uploadProd = require("../middleware/imgMiddleware");
const { protect } = require("../middleware/authmiddleware");

router
  .route("/")
  .get(getProducts)
  //.post(protect, uploadProd("products").single("productImage"), createProduct);
  .post(protect, createProduct);
router
  .route("/:id")
  .get(getProductInfo)
  //.put(protect, uploadProd("products").single("productImage"), updateProduct)
  .put(protect, updateProduct)
  .delete(protect, deleteProduct);
router.route("/myProducts/me").get(protect, getMyProducts);
module.exports = router;
