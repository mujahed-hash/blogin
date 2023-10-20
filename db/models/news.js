const mongoose = require('mongoose');

const newSchema = mongoose.Schema({

    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    },
    newshead: String,
    newsdesc: String,
    image: {
        type: String,
        require: true
    },
    color:{
        type: String,
        default: "#3b3b3b",
    },
    customIdentifier: {
        type: String,
        unique: true,
        required: true
      },
    
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
 

});
newSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

newSchema.set('toJSON', {
    virtuals: true,
});

module.exports = mongoose.model('news', newSchema);