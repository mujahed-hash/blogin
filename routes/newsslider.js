const express = require('express');
const storage2 = require('../helper/storage');
const newsController = require('../controller/newsslider');
const router = express.Router();
const News = require('../db/models/newsslider');
const fs = require('fs');
const path = require('path');

router.post('/newsslider', storage2, newsController.postNews);
router.get('/newsslider', newsController.getNews);
router.get('/newsslidercatid', newsController.getNewsByCategory);

// router.delete('/newsslider/:id', async (req, res) => {
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

router.get('/newsslider/:id', async (req, res) => {
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

router.put('/newsslider/:id', storage2, async (req, res) => {
    try {
        const news = await News.findById(req.params.id);
        if (!news) {
            return res.status(404).send('No news found to update');
        }

        let imagePath;
        const file = req.file;
        if (file) {
            const fileName = file.filename;
            const basePath = `${req.protocol}://${req.get('host')}/newsslider/`;
            imagePath = `${basePath}${fileName}`;
        } else {
            imagePath = news.image;
        }

        const updatedNews = await News.findByIdAndUpdate(
            req.params.id,
            {
                category: req.body.category,
                color:req.body.color,
                sliderTitle: req.body.sliderTitle,
                sliderHead: req.body.sliderHead,
                image: imagePath,
            },
            { new: true }
        );

        res.status(200).json(updatedNews);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});


// router.get('/newsByCategory/:categoryId', async (req, res, next) => {
//     try {
//         const categoryId = req.params.categoryId;

//         // Find all news articles with the specified category ID
//         const newsByCategory = await News.find({ category: categoryId });

//         res.json(newsByCategory);
//     } catch (err) {
//         res.status(500).json({ error: err });
//     }
// });


router.delete('/newsslider/:id', async (req, res) => {
         try {
             const newsId = req.params.id;
     
             const news = await News.findById(newsId);
             if (!news) {
                 return res.status(404).json({ status: 'failed', message: 'News not found' });
             }
     
             const imageFilePath = path.join('newsslider', news.image.split('/').pop());
     

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
module.exports = router;
