const express = require('express')
const router = express.Router()
const {getProducts, createProduct, updateProduct, deleteProduct} = require('../controllers/productController')

const uploadProd = require('../middleware/imgMiddleware')
const {protect} = require('../middleware/authmiddleware')

router.route('/').get(getProducts).post(protect, uploadProd('products').single('productImage'), createProduct)
router.route('/:id').put(protect, uploadProd('products').single('productImage'), updateProduct).delete(protect,deleteProduct)
module.exports = router