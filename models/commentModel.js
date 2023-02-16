const mongoose = require('mongoose')

const commentSchema = mongoose.Schema(
    {
        username: {
            type:String,
            required: [true, "Please add a name"]
        },
        content: {
            type:String,
            required: true
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

module.exports = mongoose.model('Comment', commentSchema)