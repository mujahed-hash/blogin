const News = require('../db/models/news'); // Import your News model
const Category = require('../db/models/category');
const fs = require('fs');
const sharp = require('sharp');
const slugify = require('slugify');
exports.getNews = async (req, res) => {
    try {
        let filter = {};
        if (req.query.category) {
            filter = {
                category: req.query.category
            };
        }
        
        const news = await News.find(filter).sort({ createdAt: -1 }).populate('category');
        res.send(news);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
};
exports.getNewsByCategory = async (req, res) => {
         try {
             let filter = {};
             if (req.query.categories) {
                 filter = {
                     category: req.query.categories.split(',')
                 };
                 const news = await News.find(filter).populate('category');
                 res.send(news);
             } else {
                 console.log('no cat');
             }
         } catch (error) {
             console.error(error);
             console.log('got server error', error);
             res.status(500).json({ error: 'Server error' });
         }
     };
exports.postNews = async (req, res) => {
    try {
        const category = await Category.findById(req.body.category);

        if (!category) {
            return res.status(500).json({
                error: 'Invalid category'
            });
        }
        const {
            color,
            newshead,
            newsdesc,
        } = req.body;

        const randomComponent = Date.now().toString(); // You can replace this with your own logic

        const customIdentifier = `${slugify(newshead, { lower: true })}-${randomComponent}`;
        const file = req.file;
        if (!file) return res.status(400).send('No image in the request');
        
        const fileName = file.filename;
        const basePath = `${req.protocol}://${req.get('host')}/`;
        const pat = `${basePath}${fileName}`
       const compressedImageBuffer = await sharp(file.path)
       .jpeg({ quality: 20 })// Adjust the quality as needed
       .toBuffer();
    //    const out = path.join('/home/pc/Music/img',  fileName)
       const out = (`pics/${fileName}`)

fs.writeFileSync(out, compressedImageBuffer);
// console.log('Output Path:', out);
        const news = new News({
            category: req.body.category,
            color,
            newshead,
            newsdesc,
            image: `${basePath}${out}`,
            customIdentifier
        });

        const newsData = await news.save();
        res.status(200).json(newsData);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
};
