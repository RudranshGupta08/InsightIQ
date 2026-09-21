const express = require("express");

const upload = require("../middleware/uploadMiddleware");
const { protect } = require("../middleware/authMiddleware");

const {
    uploadFiles,
} = require("../controllers/importController");

const router = express.Router();

router.post(
    "/upload",
    protect,
    upload.array("files", 20),
    uploadFiles
);

module.exports = router;