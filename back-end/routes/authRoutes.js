const express = require("express");
const router = express.Router();

const {
  googleAuth,
  googleCallback,
  getUserPicture,
} = require("../controllers/login/authController");

router.get("/auth/google", googleAuth);
router.get("/auth/google/callback", googleCallback);
router.get("/user/picture", getUserPicture);

module.exports = router;
