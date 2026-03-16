const path = require('path')
const os = require('os')
const fs = require('fs')

/**
 * Directory where uploaded assets are stored.
 *
 * In production / serverless environments the project folder is usually read-only
 * (e.g. /var/task). In that case we store uploads in a writable temp directory.
 */
function getUploadDir() {
  const override = process.env.UPLOAD_DIR
  if (override) {
    return path.resolve(override)
  }

  // In production environments (serverless) use temp directory.
  if (process.env.NODE_ENV === 'production') {
    return path.resolve(os.tmpdir(), 'shopigo_uploads')
  }

  // Local development uses project static folder
  return path.resolve(__dirname, '..', 'static')
}

function ensureUploadDir() {
  const uploadDir = getUploadDir()
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true })
  }
  return uploadDir
}

module.exports = {
  getUploadDir,
  ensureUploadDir,
}
