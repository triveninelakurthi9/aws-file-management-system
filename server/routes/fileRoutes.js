const express = require("express");
const router = express.Router();

const upload = require("../middleware/upload");
const protect = require("../middleware/authMiddleware");
const { uploadFile, getMyFiles } = require("../controllers/fileController");

router.post(
    "/upload",
    protect,
    upload.single("file"),
    uploadFile
);

router.get("/", protect, getMyFiles);

module.exports = router;