const express = require("express");

const upload = require("../middleware/uploadMiddleware");

const {
    uploadFiles,
} = require("../controllers/importController");

const router = express.Router();

router.post(
    "/upload",
    upload.array("files", 20),
    uploadFiles
);

module.exports = router;