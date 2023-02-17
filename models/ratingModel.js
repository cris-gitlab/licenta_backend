const mongoose = require('mongoose')

const ratingSchema = mongoose.Schema(
    {
        mark: {
            type: Number,
            min: 1,
            max: 5
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        },
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Product'
        }
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('Rating', ratingSchema)