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
  .post(protect, uploadProd("products").single("productImg"), createProduct);
  //.post(protect, uploadProd("products").array("productImg"), createProduct);
router
  .route("/:id")
  .get(getProductInfo)
  .patch(protect, uploadProd("products").single("productImg"), updateProduct)
  //.put(protect, updateProduct)
  .delete(protect, deleteProduct);
router.route("/myProducts/me").get(protect, getMyProducts);
module.exports = router;
