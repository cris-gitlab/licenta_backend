const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const fs = require("fs")

//@desc Get all users
//@route Get /api/users
//@access Private
const getAllUsers = asyncHandler(async (req, res) => {
    const users = await User.find()
    res.status(200).json(users)
})

//@desc Get public user information
//@route Get /api/users/:id
//@access Public
const getUser  = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id).select("-password")
    res.status(200).json(user)
})

//@desc Register new user
//@route POST /api/users
//@access Public
const registerUser = asyncHandler(async (req, res) => {
    const {name, email, password} = req.body
    if(!name || !email || !password) {
        res.status(400)
        throw new Error('Complete all fields ' + name + email + password)
    }

    //Check if user exists
    const userExists = await User.findOne({email})

    if(userExists) {
        res.status(400)
        throw new Error('User already exists')
    }

    // Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    //Create user
    const user = await User.create({
        name,
        email,
        password: hashedPassword,
        profileImg: {
            data: fs.readFileSync("uploads/profile/" + req.file.filename),
            contentType: "image/png"
        }

    })

    if(user) {
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
        })
    } else {
        res.status(400)
        throw new Error('Invalid user data')
    }

});

//@desc Authenticate a user
//@route POST /api/users/login
//@access Public
const loginUser = asyncHandler(async (req, res) => {
    const {email, password} = req.body

    //Check for data completion
    if(!email || !password) {
        throw new Error('Complete all fields')
    } else {
        //Check for user email
        const user = await User.findOne({email})
        
        if(user && (await bcrypt.compare(password, user.password))) {
            res.json({
                _id: user.id,
                name: user.name,
                email: user.email,
                token: generateToken(user._id)
            })
        } else {
            throw new Error('Invalid credentials')
        }
    }




});

//@desc Get user data
//@route GET /api/users/me
//@access Private
const getMe = asyncHandler(async (req, res) => {
    const {_id, name, email, farmer, profileImg} = await User.findById(req.user.id)

    res.status(200).json({
        id: _id,
        name,
        email,
        farmer,
        profileImg,
        request: req.user
    })
});


//@desc Update user data
//@route PUT /api/users/:id
//@access Private
const updateUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user.id)

    if(!user) {
        res.status(401)
        throw new Error('User not found')
    }

    const updatedUser = await User.findByIdAndUpdate(req.params.id,
        {
            name: req.body.name,
            profileImg: req.body.profileImg,
            farmer:req.body.farmer,
            password: req.body.password
        }, 
        {new:true})

    res.status(200).json({updatedUser})
})

// Generate JWT
const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: '30d',
    })
}

//@desc Delete user
//@route DELETE /api/users
//@access Private
const deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)

    if(!user) {
        res.status(400)
        throw new Error('User not found')
    }

    await user.remove()

    res.status(200).json({id: req.params.id})
})

module.exports = {
  getAllUsers,
  registerUser,
  loginUser,
  getMe,
  updateUser,
  deleteUser,
  getUser,
};
