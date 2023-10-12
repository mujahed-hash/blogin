const express = require('express');
const router = express.Router();
const highnewsController = require('../controller/highnews')
const Highnews = require('../db/models/highnews');


router.get('/', highnewsController.getHighnews);
router.get('/:id', async (req,res)=>{
    const highnews = await Highnews.findById(req.params.id);

    if(!highnews){
        return res.status(500).json({messaage:"Highnews with the given ID is not found"})
    }
    else{
        res.status(200).send(highnews);
    }
})
router.post('/', highnewsController.postHighnews);

router.delete('/:id', (req,res)=>{
     Highnews.findByIdAndRemove(req.params.id).then( highnews =>{
       if(highnews){
           res.status(201).json({status: "success", message: "highnews is deleted successfully"});   
          }
          else{
           return res.status(404).json({error: 'could not find highnews'})
          }
     }).catch(err=>{
         return res.status(400).json({error:err});
     });
});



router.put('/:id', async (req, res, next) => {
    try {
        const updatedHighnews = await Highnews.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedHighnews);
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

module.exports = router;