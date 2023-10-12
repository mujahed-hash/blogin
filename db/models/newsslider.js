const mongoose = require('mongoose');

const newssliderSchema = mongoose.Schema({
         category: {
                  type: mongoose.Schema.Types.ObjectId,
                  ref: 'Category'
              },
        color:{
            type:String,
            default:'black'
        },
         sliderTitle:String,
         sliderHead: String,
         image:String,
         createdAt: {
            type: Date,
            default: Date.now
        },
        updatedAt: {
            type: Date,
            default: Date.now
        },
});
newssliderSchema.virtual('id').get(function(){
         return this._id.toHexString();
     });
     
     
newssliderSchema.set('toJSON',{
         virtuals: true,
     });
module.exports = mongoose.model('newslider', newssliderSchema )