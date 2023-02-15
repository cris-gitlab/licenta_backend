const Order = require("../models/orderModel");
const asyncHandler = require("express-async-handler");

//@desc Get all orders
//@route GET /api/orders
//@acces Public
const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find();

  if (orders) {
    res.status(200).json(orders);
  } else res.status(200).json([]);
  res.status(200).json(orders);
});

//@desc Get an order
//@route GET /api/orders/:id
const getOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    res.status(200).json(order);
  } else {
    res.status(404).json({});
  }
});

//@desc Get the orders of a store
//@route POST /api/orders/order/myOrders
const getStoreOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find();
  const storeId = req.body.storeId;
  let myOrders = [];

  if (orders) {
    orders.map((order) => {
      for (let i = 0; i < order.stores.length; i++) {
        if (order.stores[i].storeId.toString() === storeId) {
          i = order.stores.length;
          myOrders.push(order);
        }
      }
    });
  }

  res.status(200).json(myOrders);
});

// @desc Create Store
// @route POST /api/orders
// @access Private
const createOrder = asyncHandler(async (req, res) => {
  if (!req.body.address) {
    res.status(400);
    throw new Error("Prease add an address.");
  }

  const order = await Order.create({
    customer: req.body.customer,
    address: req.body.address,
    products: req.body.products,
    stores: req.body.stores,
    states: req.body.states,
  });

  res.status(200).json(order);
});

const updateOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.body._id);

  if (!order) {
    res.status(401);
    throw new Error("Order not found");
  }

  const updatedOrder = await Order.findByIdAndUpdate(
      req.body._id,
      {
        states: req.body.states,
      },
      { new: true }
    );

  res.status(200).json(updatedOrder);
});

//@desc Get all orders created by logged user
//@route GET /api/orders/myOrders
//@acces Private
const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ costumer: req.user._id });

  res.status(200).json(orders);
});

module.exports = {
  getOrders,
  createOrder,
  getStoreOrders,
  getOrder,
  updateOrder,
  getMyOrders
};
