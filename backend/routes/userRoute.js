const express = require("express");
const router = express.Router();
const {
  getProfile,
  updateProfile,
  createProfile,
} = require("../controller/userController");
const multer = require("multer");
const upload = multer({ dest: "uploads/" }); // or better use multer-storage-cloudinary

// routes/userRoutes.js
router.post('/', upload.single("avatar"), createProfile);  // upload.none() if no avatar at creation
router.get("/:id", getProfile);
router.put("/:id", upload.single("avatar"), updateProfile);

module.exports = router;
