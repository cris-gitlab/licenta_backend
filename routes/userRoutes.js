const express = require('express')
const router = express.Router()
const { registerUser, loginUser, getMe } = require('../controllers/userController')
const {protect} = require('../middleware/authmiddleware') 

const multer = require('multer');
const uploadProfile = multer({dest: 'uploads/profile'})


router.post('/', registerUser)
router.post('/login', loginUser)
router.get('/me', protect, getMe)
//router.put('/:id', protect, uploadProfile('profileImage'))

module.exports = router