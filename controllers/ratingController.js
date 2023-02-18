const asyncHandler = require("express-async-handler");
const Rating = require("../models/ratingModel")

// @desc Create rating
// @route POST /api/ratings/
// @access Private
const createRating = asyncHandler(async (req, res) => {
  
    if (!req.body.mark) {
      res.status(400);
      throw new Error("The rating has no value.");
    }
  
  
    const rating = await Rating.create({
      userId: req.user.id,
      productId: req.body.productId,
      mark: req.body.mark
    });
  
    res.status(200).json(rating);
});

// @desc Update rating
// @route PATCH /api/ratings/
// @access Private
const updateRating = asyncHandler(async (req, res) => {
    const foundRating = await Rating.findById(req.body._id)

    if (!foundRating) {
        res.status(401);
        throw new Error("Rating not found.");
    }

    if (req.user.id !== req.body.userId) {
        res.status(401);
        throw new Error("Not authorized.");
    }

    const updatedRating = await Rating.findByIdAndUpdate(
        req.body._id,
        {
            mark: req.body.mark
        },
        {
            new: true,
        }
    )
    
    res.status(200).json(updatedRating);
  });


// @desc GET the ratings of a product
// @route GET /api/ratings/:productId
// @access Public
const getProductAverage = asyncHandler(async (req, res) => {
    const ratings = await Rating.find({ productId: req.params.productId });
    let average = 0
    if(ratings) {
        let sum = 0
        const numberOfRatings = ratings.length
        ratings.map((el) => sum += el.mark)
        average = (sum/ numberOfRatings).toPrecision(2)
    }

    res.status(200).json(average);
});

// @desc GET the rating of a product created by a user
// @route POST /api/ratings/:productId/me
// @access Public
const getMyRating = asyncHandler(async (req, res) => {
    const rating = await Rating.find({ productId: req.params.productId, userId: req.user.id });
    if(rating) {
        res.status(200).json(rating)
    } else {
        res.status(401).json(null)

    }
});

module.exports = {
    createRating,
    getProductAverage,
    getMyRating,
    updateRating
}