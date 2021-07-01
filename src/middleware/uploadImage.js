const multer = require('multer')
const util = require('util')
const path = require('path')
const __basedir = path.resolve()

const imageFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true)
  } else {
    cb('Please upload only images.', false)
  }
}

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __basedir + '/storage/upload/')
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`)
  },
})

let uploadImage = multer({
  storage: storage,
  fileFilter: imageFilter,
}).array('files', 5)

let uploadFileMiddleware = util.promisify(uploadImage)

module.exports = uploadFileMiddleware
