const multer = require('multer')
const crypto = require('crypto')
const path = require('path')

const pathUploads = path.resolve(__dirname, '..', '..', 'tmp', 'uploads')

module.exports = {
  dest: pathUploads,
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, pathUploads)
    },
    filename: (req, file, cb) => {
      crypto.randomBytes(16, (err, hash) => {
        if (err) cb(err)

        const fileName = `${hash.toString('hex')}-${file.originalname}`

        cb(null, fileName)
      })
    }
  }),
  limits: {
    filesize: 2 * 1024 * 1024
  },
  fileFilter: (req, file, cb) => {
    const allowedMimes = [
      'image/jpg',
      'image/jpeg',
      'image/pjpeg',
      'image/png',
      'image/gif',
      'image/svg+xml',
      'application/pdf',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/zip',
      'application/x-7z-compressed',
      'text/csv'
    ]

    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true)
    } else {
      cb(new Error('Invalid file type.'))
    }
  }
}