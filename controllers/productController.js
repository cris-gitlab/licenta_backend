const asyncHandler = require('express-async-handler')
const Product = require('../models/productModel')

//@desc Get all products
//@route GET /api/products
//@acces Public
const getProducts = asyncHandler(async (req, res) => {
    const products = await Product.find()
    res.status(200).json(products)
})

//@desc Get all products created by logged user
//@route GET /api/products/:userid
//@acces Private

// @desc Create Product
// @route POST /api/products
// @access Private
const createProduct = asyncHandler(async (req, res) => {
    if(!req.body.name) {   
     res.status(400)
     throw new Error('Prease add a name for product')
    }

    if(!req.body.price) {   
        res.status(400)
        throw new Error('Prease add a price for product')
    }

    const product = await Product.create({
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
        image: {
            data: req.file.filename,
            contentType: 'image/png'
        }
        // user: req.user.id
    })

    res.status(200).json(product)
})

// @desc Update product
// @route PUT /api/products/:id
// @access Private
const updateProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)

    //const user = await User.findById(req.user.id)

    //Verify if product exists
    if(!product) {
        res.status(400)
        throw new Error('Product not found')
    }

    //Check for user
    // if(!user) {
    //     res.status(401)
    //     throw new Error('User not found')
    // }

    //Make sure the logged user maches the product user
    // if(goal.user.toString() !== user.id) {
    //     res.status(401)
    //     throw new Error('User not authorized')
    // }

    const updatedProduct = await Product.findByIdAndUpdate(req.params.id,
        req.body, {
            new: true,
        })

    res.status(200).json(updatedProduct)
})

// @desc Delete product
// @route DELETE /api/products/:id
// @access Private
const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)

    if(!product) {
        res.status(400)
        throw new Error('Product not found')
    }

    // const user = await User.findById(req.user.id)

    //Check for user
    // if(!user) {
    //     res.status(401)
    //     throw new Error('User not found')
    // }

    //Make sure the logged user maches the goal user
    // if(goal.user.toString() !== user.id) {
    //     res.status(401)
    //     throw new Error('User not authorized')
    // }

    await product.remove()
    // const deletedGoal = await Goal.findByIdAndDelete(req.params.id)

    res.status(200).json({id: req.params.id})
})


module.exports = {
    getProducts,
    createProduct,
    updateProduct,
    deleteProduct,
}