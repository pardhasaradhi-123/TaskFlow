const express = require("express");
const {
  getMyProfile,
  saveUsers,
  sigInUser,
} = require("../controllers/userController");
const auth = require("../middleware/jwtMiddleware");

const router = express.Router();

router.get("/myProfile", auth, getMyProfile);
router.post("/register", saveUsers);
router.post("/sign", sigInUser);

module.exports = router;
