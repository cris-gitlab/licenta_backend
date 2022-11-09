const express = require('express')
const router = express.Router()
const {getProducts, createProduct, updateProduct, deleteProduct} = require('../controllers/productController')

// const {protect} = require('../middleware/authmiddleware')

// router.route('/').get(protect, getGoals).post(protect, setGoal)
// router.route('/:id').put(protect, updateGoal).delete(protect, deleteGoal)

router.route('/').get(getProducts).post(createProduct)
router.route('/:id').put(updateProduct).delete(deleteProduct)
module.exports = router