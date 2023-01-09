const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getMe,
  getUser,
  updateUser,
  deleteUser,
  getAllUsers,
} = require("../controllers/userController");

const { protect } = require("../middleware/authmiddleware");
const uploadProfile = require("../middleware/imgMiddleware");
//const { publicUser } = require("../middleware/publicmiddleware")

router.post("/",uploadProfile('profile').single('profileImg') ,registerUser).get("/", getAllUsers);
router.post("/login", loginUser);
router.get("/me", protect, getMe);
router.get("/:id",  getUser)
router
  .route("/:id")
  .patch(protect, uploadProfile("profile").single("profileImg"), updateUser)
  .delete(protect, deleteUser);

module.exports = router;
