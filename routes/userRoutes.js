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
  changeRole,
  loginAdmin,
} = require("../controllers/userController");

const { protect } = require("../middleware/authmiddleware");
const uploadProfile = require("../middleware/imgMiddleware");
const { protectAdmin } = require("../middleware/adminmiddleware")

router.post("/",uploadProfile('profile').single('profileImg') ,registerUser).get("/", getAllUsers);
router.post("/login", loginUser);
router.get("/me", protect, getMe);
router.get("/:id",  getUser)
router
  .route("/:id")
  .patch(protect, uploadProfile("profile").single("profileImg"), updateUser)
  .delete(protect, deleteUser);

router.route("/admin/roles/:id").put(protectAdmin, changeRole)
router.post('/admin/loginAdmin', loginAdmin)
module.exports = router;
