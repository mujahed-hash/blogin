const multer = require('multer');
const fs = require('fs');


const diskStorage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null, 'pics');
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

  
  const compressedStorage = (req, file, cb) => {
    storage(req, file, async (err) => {
        if (err) {
            cb(err);
            return;
        }

        try {
            let compressedBuffer;

            // Compress the image based on its format
            if (file.mimetype === 'image/jpeg') {
                const inputBuffer = fs.readFileSync(file.path);
                compressedBuffer = await imagemin.buffer(inputBuffer, {
                    plugins: [
                        imageminJpegtran({ quality: 'low' }) // Adjust quality as needed
                    ]
                });
            } else if (file.mimetype === 'image/png') {
                const inputBuffer = fs.readFileSync(file.path);
                compressedBuffer = await imagemin.buffer(inputBuffer, {
                    plugins: [
                        imageminPngquant({ quality: [0.6, 0.8] }) // Adjust quality as needed
                    ]
                });
            }

            // Write the compressed buffer back to the file
            fs.writeFileSync(file.path, compressedBuffer);
            cb(null);
        } catch (error) {
            cb(error);
        }
    });
};

module.exports = storage;