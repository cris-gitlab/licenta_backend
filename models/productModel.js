const mongoose = require('mongoose')

const productSchema = mongoose.Schema(
    {
        name: {
            type:String,
            required: [true, "Please add a name"]
        },
        description: {
            type:String,
        },
        price: {
            type: Number,
            required: true
        },
        productImage: {
            data: Buffer,
            contentType: String
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        }
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('Product', productSchema)