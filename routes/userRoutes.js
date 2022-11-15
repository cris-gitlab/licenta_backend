const express = require('express')
const router = express.Router()
const { registerUser, loginUser, getMe, updateUser, deleteUser } = require('../controllers/userController')

const {protect} = require('../middleware/authmiddleware') 
const uploadProfile = require('../middleware/imgMiddleware')


router.post('/', registerUser)
router.post('/login', loginUser)
router.get('/me', protect, getMe)
router.route('/:id').put(protect, uploadProfile('profile').single('profileImg'), updateUser)
.delete(protect, deleteUser)

module.exports = router