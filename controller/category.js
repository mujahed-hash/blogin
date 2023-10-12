const Category = require('../db/models/category');

exports.getCategory= async (req,res)=>{
  try{
    const categories = await Category.find();

    res.status(201).json(categories);
  }
  catch(error){
    console.error(error)
    console.log('caused error', error);
    res.send(error)
  }
}

exports.postCategory = async (req,res)=>{
 try{
    const {name} = req.body;
    const {color} = req.body;
    const customIdentifier = `${slugify(name, { lower: true })}-${randomComponent}`;

    const createCategory = new Category({
        name,
        color,
        customIdentifier
    });

   const createdCategory= await createCategory.save();

   res.status(201).json({
       createCategory:{
            ...createdCategory._doc
       }
   })
 }
 catch(error){
   console.error(error)
   console.log('caused error', error);
   res.send(error)
 }
}