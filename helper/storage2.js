const multer = require('multer');
const sharp = require('sharp');
const fs = require('fs');

const diskStorage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null, 'newsslider');
    },
  filename:(req,file,cb)=>{
    const mimeType = file.mimetype.split('/');
    const fileType = mimeType[1];
    const timestamp = Date.now(); // Generate a timestamp

    // Sanitize the original filename by removing non-alphanumeric characters and spaces
    const sanitizedFilename = file.originalname.replace(/[^a-zA-Z0-9]/g, '');

    // Construct the new filename with sanitized name, date, time, and extension
    const newFilename = `${timestamp}_${sanitizedFilename}.${fileType}`;
    cb(null, newFilename);
}

});


const fileFilter = (req,file,cb)=>{
    const allowedMimeTypes = ['image/png', 'image/jpeg', 'image/jpg'];
    allowedMimeTypes.includes(file.mimetype) ? cb(null, true): cb(null, false);
  }

  const storage = multer({storage: diskStorage, fileFilter: fileFilter}).single('image');



  // Modify the storage middleware to compress the image file size
const compressedStorage = (req, file, cb) => {
  storage(req, file, (err) => {
      if (err) {
          cb(err);
          return;
      }

      // Use sharp to compress the image without changing dimensions
      sharp(file.path)
          .jpeg({ quality: 80 }) // Adjust quality as needed
          .toBuffer((err, compressedBuffer) => {
              if (err) {
                  cb(err);
                  return;
              }

              // Write the compressed buffer back to the file
              fs.writeFile(file.path, compressedBuffer, (err) => {
                  if (err) {
                      cb(err);
                      return;
                  }
                  cb(null);
              });
          });
  });
};
  module.exports = storage;