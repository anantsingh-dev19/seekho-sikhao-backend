const cloudinary = require('cloudinary').v2;
const streamifier = require('streamifier');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadVideo = async (req, res, next) => {
  try {
    if (!req.file) return res.status(400).json({ success: false, message: 'No file uploaded' });

    const streamUpload = (buffer) => new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { resource_type: 'video', folder: 'courses', chunk_size: 6000000 },
        (error, result) => { if (result) resolve(result); else reject(error); }
      );
      streamifier.createReadStream(buffer).pipe(stream);
    });

    const result = await streamUpload(req.file.buffer);
    res.json({ success: true, data: { url: result.secure_url, publicId: result.public_id, duration: Math.round(result.duration) } });
  } catch (err) { next(err); }
};

const uploadImage = async (req, res, next) => {
  try {
    if (!req.file) return res.status(400).json({ success: false, message: 'No file uploaded' });

    const streamUpload = (buffer) => new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { resource_type: 'image', folder: 'products' },
        (error, result) => { if (result) resolve(result); else reject(error); }
      );
      streamifier.createReadStream(buffer).pipe(stream);
    });

    const result = await streamUpload(req.file.buffer);
    res.json({ success: true, data: { url: result.secure_url, publicId: result.public_id } });
  } catch (err) { next(err); }
};

module.exports = { uploadVideo, uploadImage };