const mongoose = require('mongoose')

const storeSchema = mongoose.Schema(
    {
        name: {
            type:String,
            required: [true, "Please add a name"]
        },
        description: {
            type:String,
        },
        storeImg: {
            type: String,
            required: true
        },
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        }
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('Store', storeSchema)