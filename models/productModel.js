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
        image: {
            data: Buffer,
            contentType: String
        }
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('Product', productSchema)