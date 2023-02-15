const asyncHandler = require("express-async-handler");
const Product = require("../models/productModel");
const User = require("../models/userModel");
const Store = require("../models/storeModel");
const fs = require("fs");

//@desc Get all products or by category
//@route GET /api/products
//@acces Public
const getProducts = asyncHandler(async (req, res) => {
  let products
  if(req.body.category === 'all'){
    products = await Product.find();
  } else {
    products = await Product.find({category: req.body.category});
  }
  res.status(200).json(products);
});

//@desc Get a product
//@route GET /api/products/:id
const getProductInfo = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  res.status(200).json(product);
});

//@desc Get all products created by logged user
//@route GET /api/products/me
//@acces Private
const getMyProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({ producer: req.user.id });

  res.status(200).json(products);
});

// @desc Create Product
// @route POST /api/products
// @access Private
const createProduct = asyncHandler(async (req, res) => {
  const store = await Store.findOne({ owner: req.user.id });

  if (!req.body.name) {
    res.status(400);
    throw new Error("Prease add a name for product");
  }

  if (!req.body.price) {
    res.status(400);
    throw new Error("Prease add a price for product");
  }

  const product = await Product.create({
    name: req.body.name,
    price: req.body.price,
    description: req.body.description,
    category: req.body.category,
    productImage: {
        data: fs.readFileSync("uploads/products/" + req.file.filename),
        contentType: "image/png",
    },
    producer: req.user.id,
    store: store.id,
  });

  res.status(200).json(product);
});

// @desc Update product
// @route PATCH /api/products/:id
// @access Private
const updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  const user = await User.findById(req.user.id);

  //Verify if product exists
  if (!product) {
    res.status(400);
    throw new Error("Product not found");
  }

  //Check for user
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  //Make sure the logged user maches the product user
  if (product.producer.toString() !== user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  let storePicture;
  if (req.file) {
    storePicture = req.file.filename;
  } else {
    storePicture = defaultStorePic;
  }

  const updatedProduct = await Product.findByIdAndUpdate(
    req.params.id,
    {
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
        category: req.body.category,
        ...((req.file !== undefined) && {
            productImage: {
              data: fs.readFileSync("uploads/products/" + req.file.filename),
              contentType: "image/png",
            },
          }),
    },
    {
      new: true,
    }
  );

  if (updateProduct) {
    res.status(200).json(updatedProduct);
  } else {
    res.status(404).json(req.body);
  }
});

// @desc Delete product
// @route DELETE /api/products/:id
// @access Private
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(400);
    throw new Error("Product not found");
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

  await product.remove();
  // const deletedGoal = await Goal.findByIdAndDelete(req.params.id)

  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getProducts,
  getProductInfo,
  getMyProducts,
  createProduct,
  updateProduct,
  deleteProduct,
};
