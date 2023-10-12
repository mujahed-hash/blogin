const express = require('express');
const compressedStorage = require('../helper/storagesli');
const newsController = require('../controller/news');
const router = express.Router();
const News = require('../db/models/news');
const fs = require('fs');
const path = require('path');
const slugify = require('slugify');

router.post('/news', compressedStorage, newsController.postNews);
router.get('/news', newsController.getNews);
router.get('/newscatid', newsController.getNewsByCategory);

// router.delete('/news/:id', async (req, res) => {
//     try {
//         if (!mongoose.isValidObjectId(req.params.id)) {
//             return res.status(400).json('Invalid news ID');
//         }

//         const news = await News.findByIdAndRemove(req.params.id);
//         if (news) {
//             return res.status(200).json({ status: 'success', message: 'News deleted successfully' });
//         }
//         res.status(404).json({ status: 'failed', message: 'News not found' });
//     } catch (err) {
//         res.status(500).json({ status: 'failed', error: err });
//     }
// });

router.get('/news/:id', async (req, res) => {
    try {
        const news = await News.findById(req.params.id).populate('category');

        if (!news) {
            return res.status(404).json({ message: "News with the given ID is not found" });
        } else {
            res.status(200).json(news);
        }
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

router.put('/news/:id', compressedStorage, async (req, res) => {
    try {
        const news = await News.findById(req.params.id);
        if (!news) {
            return res.status(404).send('No news found to update');
        }

        let imagePath;
        const file = req.file;
        if (file) {
            const fileName = file.filename;
            const basePath = `${req.protocol}://${req.get('host')}/pics/`;
            imagePath = `${basePath}${fileName}`;
        } else {
            imagePath = news.image;
        }
  

        const updatedNews = await News.findByIdAndUpdate(
            req.params.id,
            {
                category: req.body.category,
                color:req.body.color,
                newshead: req.body.newshead,
                newsdesc: req.body.newsdesc,
                image: imagePath,
                customIdentifier: generateCustomIdentifier(req.body.newshead) // Generate or update the custom identifier
            },
            { new: true }
        );

        res.status(200).json(updatedNews);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});
function generateCustomIdentifier(newshead) {
    // Generate your custom identifier here based on the updated newshead
    const randomComponent = Date.now().toString();
    return `${slugify(newshead, { lower: true })}-${randomComponent}`;
}

router.get('/newsByCategory/:categoryId', async (req, res, next) => {
    try {
        const categoryId = req.params.categoryId;

        // Find all news articles with the specified category ID
        const newsByCategory = await News.find({ category: categoryId }).sort({ createdAt: -1 }).populate('category');

        res.json(newsByCategory);
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

router.delete('/news/:id', async (req, res) => {
    try {
        const newsId = req.params.id;

        const news = await News.findById(newsId);
        if (!news) {
            return res.status(404).json({ status: 'failed', message: 'News not found' });
        }

        const imageFilePath = path.join('pics', news.image.split('/').pop());


        // Delete the image file from the storage
        fs.unlink(imageFilePath, (err) => {
            if (err) {
                console.error('Error deleting image file:', err);
            }
        });

        await News.findByIdAndRemove(newsId);

        res.status(200).json({ status: 'success', message: 'News and associated image deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 'failed', error: 'Server error' });
    }

});

router.get('/shared/:customIdentifier', async (req, res) => {
    const { customIdentifier } = req.params;
    
    try {
      const news = await News.findOne({ customIdentifier }).populate('category');
      if (!news) {
        return res.status(404).json({ error: 'News not found' });
      }
      return res.json(news);
    } catch (error) {
      return res.status(500).json({ error: 'Server error' });
    }
  });
  
module.exports = router;
