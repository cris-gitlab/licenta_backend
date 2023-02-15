const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add an name']
    },
    email: {
        type: String,
        required: [true, 'Please add an email']
    },
    password: {
        type: String,
        required: [true, 'Please add an password']
    },
    role: {
        type: String,
        default: 'customer',
        enum: ['guest', 'customer', 'producer', 'admin']
    },
    profileImg: {
        data: Buffer,
        contentType: String
    }
    // profileImg: {
    //     type: Object
    // }

}, {
    timpestamps: true
})

module.exports = mongoose.model('User', userSchema)