const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { v4: uuid } = require("uuid");

const uploadDir = path.join(__dirname, "..", "uploads");

// Create uploads folder automatically
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({

    destination(req, file, cb) {
        cb(null, uploadDir);
    },

    filename(req, file, cb) {

        const extension = path.extname(file.originalname);

        cb(
            null,
            `${uuid()}${extension}`
        );

    },

});

const allowedMimeTypes = [

    // Excel
    "application/vnd.ms-excel",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",

    // CSV
    "text/csv",

    // PDF
    "application/pdf",

    // Word
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",

    // Images
    "image/png",
    "image/jpeg",
    "image/jpg",
    "image/webp",

    // Text
    "text/plain",

];

function fileFilter(req, file, cb) {

    if (
        allowedMimeTypes.includes(file.mimetype)
    ) {

        cb(null, true);

    }

    else {

        cb(
            new Error(
                `Unsupported file type: ${file.mimetype}`
            ),
            false
        );

    }

}

const upload = multer({

    storage,

    fileFilter,

    limits: {

        fileSize: 25 * 1024 * 1024,

        files: 20,

    },

});

module.exports = upload;