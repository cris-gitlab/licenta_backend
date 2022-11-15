const asyncHandler = require('express-async-handler')
const Store = require('../models/storeModel')
const User = require('../models/userModel')

//@desc Get all stores
//@route GET /api/stores
//@acces Public
const getStores = asyncHandler(async (req, res) => {
    const stores = await Store.find()
    res.status(200).json(stores)
})

// @desc Create Store
// @route POST /api/stores
// @access Private
const createStore = asyncHandler(async (req, res) => {
    if(!req.body.name) {   
     res.status(400)
     throw new Error('Prease add a name for store')
    }

    const store = await Store.create({
        name: req.body.name,
        description: req.body.description,
        storeImg: req.file.filename,
        owner: req.user.id
    })

    res.status(200).json(store)
})

// @desc Update store
// @route PUT /api/stores/:id
// @access Private
const updateStore = asyncHandler(async (req, res) => {
    const store = await Store.findById(req.params.id)

    const user = await User.findById(req.user.id)

    //Verify if store exists
    if(!store) {
        res.status(400)
        throw new Error('Store not found')
    }

    //Check for user
    if(!user) {
        res.status(401)
        throw new Error('User not found')
    }

    //Make sure the logged user maches the store user
    if(store.owner.toString() !== user.id) {
        res.status(401)
        throw new Error('User not authorized')
    }

    const updatedStore = await Store.findByIdAndUpdate(req.params.id,
        req.body, {
            new: true,
        })

    res.status(200).json(updatedStore)
})

const deleteStore = asyncHandler(async (req, res) => {
    const store = await Store.findById(req.params.id)

    if(!store) {
        res.status(400)
        throw new Error('Store not found')
    }

    await store.remove()
    res.status(200).json({id: req.params.id})

})

module.exports = {
    getStores,
    createStore,
    updateStore,
    deleteStore
}