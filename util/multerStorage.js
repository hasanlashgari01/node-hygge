const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: (req, res, cb) => {
        cb(null, path.join(__dirname, "..", "public", "icon"));
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        const fileTypes = /svg/;
        const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
        if (!extName && !mimeType) throw { status: 400, message: "File type is not valid" };

        const fileName = Date.now() + String(Math.random() * 9999);

        cb(null, fileName);
    },
});

const uploadFile = multer({ storage });

module.exports = uploadFile;
