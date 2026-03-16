const cloudinary = require('cloudinary').v2

// Cloudinary configuration is loaded from CLOUDINARY_URL or env vars
cloudinary.config({
  secure: true,
})

/**
 * Upload a buffer to Cloudinary and return the secure URL.
 * @param {Buffer} buffer
 * @param {string} filename
 * @param {string} folder
 * @returns {Promise<string>} secure_url
 */
function uploadBuffer(buffer, filename, folder = 'shopigo') {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        public_id: filename.replace(/\.[^.]+$/, ''),
        overwrite: true,
        resource_type: 'image',
      },
      (error, result) => {
        if (error) return reject(error)
        resolve(result.secure_url)
      },
    )

    uploadStream.end(buffer)
  })
}

module.exports = {
  uploadBuffer,
}
