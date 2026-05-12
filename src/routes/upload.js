const router = require('express').Router();
const multer = require('multer');
const { uploadVideo, uploadImage } = require('../controllers/uploadController');
const { authenticate } = require('../middleware/auth');
const { isAdmin } = require('../middleware/isAdmin');

const storage = multer.memoryStorage();
const upload = multer({ storage, limits: { fileSize: 500 * 1024 * 1024 } }); // 500MB limit

router.post('/video', authenticate, isAdmin, upload.single('video'), uploadVideo);
router.post('/image', authenticate, isAdmin, upload.single('image'), uploadImage);

module.exports = router;