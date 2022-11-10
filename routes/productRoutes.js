const express = require('express')
const router = express.Router()
const {getProducts, createProduct, updateProduct, deleteProduct} = require('../controllers/productController')
const multer = require('multer');
const uploadProd = multer({dest: 'uploads/products'})
const uploadProfile = multer({dest: 'uploads/profile'})
// const {protect} = require('../middleware/authmiddleware')

// router.route('/').get(protect, getGoals).post(protect, setGoal)
// router.route('/:id').put(protect, updateGoal).delete(protect, deleteGoal)

router.route('/').get(getProducts).post(uploadProd.single('productImage'),createProduct)
router.route('/:id').put(updateProduct).delete(deleteProduct)
module.exports = router