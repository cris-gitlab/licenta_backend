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
        category: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        productImage: {
            data: Buffer,
            contentType: String
        },
        producer: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        },
        store: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Store'
        }
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('Product', productSchema)