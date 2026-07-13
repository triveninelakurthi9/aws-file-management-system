const express = require("express");
const router = express.Router();

const upload = require("../middleware/upload");
const protect = require("../middleware/authMiddleware");
const {
    uploadFile,
    getMyFiles,
    deleteFile,
     downloadFile
} = require("../controllers/fileController");

router.post(
    "/upload",
    protect,
    upload.single("file"),
    uploadFile
);

router.get("/", protect, getMyFiles);
router.get("/download/:id", protect, downloadFile);
router.delete("/:id", protect, deleteFile);

module.exports = router;