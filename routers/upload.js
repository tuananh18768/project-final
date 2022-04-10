const router = require('express').Router();
const uploadController = require('../controllers/uploadController');
const auth = require('../middleware/auth')
const multer = require('multer');
const uploadImage = require('../middleware/uploadImage')
const { upload } = require('../middleware/documentIdea')

// const MIME_TYPES = {
//     "application/pdf": "pdf",
//     "application/vnd.openxmlformats-officedocument.wordprocessingml.document": "docx",
// }

// const storage = multer.diskStorage({
//     destination: function(req, file, cb) {
//         cb(null, 'public/uploads')
//     },
//     filename: function(req, file, cb) {
//         const extension = MIME_TYPES[file.mimetype];
//         cb(null, file.fieldname + '-' + Date.now() + "." + extension)
//     }
// })
// const filefilter = (req, file, cb) => {
//     if (file.mimetype !== 'application/pdf' && file.mimetype !== 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
//         cb(null, true)
//     } else {
//         cb(null, false)
//     }
// }
// const upload = multer({ storage: storage, fileFilter: filefilter })

// router.post('/upload_avatar', upload.single('file'), uploadImage, uploadController.uploadAvatar)
router.post('/upload_avatar', uploadImage, auth, uploadController.uploadAvatar)
    // router.post('/upload_idea', upload.array('file', 12), uploadController.uploadIdea)

module.exports = router