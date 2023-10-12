const News = require('../db/models/newsslider'); // Import your News model
const Category = require('../db/models/category');

exports.getNews = async (req, res) => {
    try {
        let filter = {};
        if (req.query.category) {
            filter = {
                category: req.query.category
            };
            const news = await News.find(filter).sort({ createdAt: -1 }).populate('category');
            res.send(news);
        }
        
      else{
        const news = await News.find().populate('category');
        res.send(news);
      }
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
         sliderTitle,
         sliderHead
        } = req.body;

        const file = req.file;
        if (!file) return res.status(400).send('No image in the request');
        
        const fileName = file.filename;
        const basePath = `${req.protocol}://${req.get('host')}/newsslider/`;

        const news = new News({
            category: req.body.category,
            color,
            sliderTitle,
            sliderHead,
            image: `${basePath}${fileName}`
        });

        const newsData = await news.save();
        res.status(200).json(newsData);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
};
