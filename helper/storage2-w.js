const multer = require('multer');
const compressImages = require('compress-images');
const fs = require('fs');

const diskStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'pics');
    },
    filename: (req, file, cb) => {
        const mimeType = file.mimetype.split('/');
        const fileType = mimeType[1];
        const timestamp = Date.now();
        const sanitizedFilename = file.originalname.replace(/[^a-zA-Z0-9]/g, '');
        const newFilename = `${timestamp}_${sanitizedFilename}.${fileType}`;
        cb(null, newFilename);
    }
});

const fileFilter = (req, file, cb) => {
    const allowedMimeTypes = ['image/png', 'image/jpeg', 'image/jpg'];
    allowedMimeTypes.includes(file.mimetype) ? cb(null, true) : cb(null, false);
}

const storage = multer({
    storage: diskStorage,
    fileFilter: fileFilter
}).single('image');

const compressedStorage = (req, file, cb) => {
    storage(req, file, async (err) => {
        if (err) {
            cb(err);
            return;
        }

        try {
            // Configure options for compress-images
            const compression = 60;
            const options = {
                source: file.path,
                destination: 'pics',
                enginesSetup: {
                    jpg: 'jpegoptim', // Use 'pngquant' for PNG images,
                    png:'pngquant',
                    jpg:'mozjpeg'
                },

            };

            // Compress the image using compress-images
            await compressImages(options);

            // Clean up temporary files
            fs.unlink(file.path, (error) => {
                if (error) {
                    console.error("Error deleting temporary file:", error);
                }
            });

            cb(null);
        } catch (error) {
            cb(error);
        }
    });
};

module.exports = compressedStorage;
