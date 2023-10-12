const Highnews = require('../db/models/highnews'); // Import your Highnews model

exports.getHighnews = async (req, res) => {
    try {
         const highnews = await Highnews.find();
         res.send(highnews);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
};

exports.postHighnews = async (req, res) => {
    try {


        const {
            color,
            highnewshead,
            highnewsdesc
        } = req.body;

    // Check the current count of highnews documents
    const highnewsCount = await Highnews.countDocuments();

    // Define the maximum allowed count
    const maxHighnewsCount = 2; // Adjust as needed

        // Check if the maximum count is reached
        if (highnewsCount >= maxHighnewsCount) {
            return res.status(400).json({ message: 'Maximum document count reached.' });
        }
        const highnews = new Highnews({
            color,
            highnewshead,
            highnewsdesc,
        });

        const highnewsData = await highnews.save();
        res.status(200).json(highnewsData);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
};
