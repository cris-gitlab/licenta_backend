const asyncHandler = require("express-async-handler");
const Product = require("../models/productModel");
const User = require("../models/userModel");
const Comment = require("../models/commentModel")

// @desc Create comment
// @route POST /api/comments/
// @access Private
const createComment = asyncHandler(async (req, res) => {
    //const store = await Store.findOne({ owner: req.user.id });
  
    if (!req.body.content) {
      res.status(400);
      throw new Error("Prease add content for your comment");
    }
  
  
    const comment = await Comment.create({
      username: req.user.name,
      userId: req.user.id,
      productId: req.body.productId,
      content: req.body.content
    });
  
    res.status(200).json(comment);
});

// @desc GET the comments of a product
// @route GET /api/comments/:productId
// @access Public
const getProductComments = asyncHandler(async (req, res) => {
    const comments = await Comment.find({ productId: req.params.productId });
  
    res.status(200).json(comments);
});

// @desc Update comment
// @route PATCH /api/comments/
// @access Private
const editComments = asyncHandler(async (req, res) => {
    const comment = Comment.findById(req.body._id)

    if (!comment) {
        res.status(401);
        throw new Error("User not found.");
    }

    if (req.user.id !== req.body.userId) {
        res.status(401);
        throw new Error("Not authorized.");
    }

    const updatedComment = Comment.findByIdAndUpdate(
        req.body._id,
        {
            content: req.body.content
        },
        {
            new: true,
        }
    )
    
    res.status(200).json(updatedComment);
  });

module.exports = {
    createComment,
    getProductComments,
    editComments
};