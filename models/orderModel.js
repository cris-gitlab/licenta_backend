const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  quantity: {
    type: Number,
    requierd: true,
  },
  storeId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Store",
  },
});

const storesSchema = mongoose.Schema({
  storeId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Store",
  },
});

const stateSchema = mongoose.Schema({
  status: {
    type: String,
    required: true,
    default: 'pending',
    enum: ['pending', 'processing', 'shipping', 'done']
  }
})

const orderSchema = mongoose.Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    address: {
      type: String,
      required: [true, "Please add an address."],
    },
    products: [{ type: productSchema, default: [] }],
    stores: [{ type: storesSchema, default: [] }],
    states: [ {type: stateSchema, default: []}]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
