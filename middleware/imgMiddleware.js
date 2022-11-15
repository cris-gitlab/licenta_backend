const multer = require('multer');

const fileFilter = (req, file, cb) => {
    // reject a file
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true)
    } else {
        cb(null, false)
    }
}

const storage = (location) => multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, `./uploads/${location}`);
    },
    filename: function(req, file, cb) {
        cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname)
    }
})

const uploadImg = (location) => multer({
    storage: storage(location),
    limits: {
    fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
})

module.exports = uploadImg