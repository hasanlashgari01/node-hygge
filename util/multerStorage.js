const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: (req, res, cb) => {
        cb(null, path.join(__dirname, "..", "/public/icon"));
    },
    filename: (req, file, cb) => {
        // const ext = path.extname(file.originalname);
        const fileName = file.originalname;
        cb(null, fileName);
    },
});

const uploadFile = multer({ storage });

module.exports = uploadFile;
