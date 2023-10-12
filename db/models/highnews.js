const mongoose = require('mongoose');

const highnewSchema = mongoose.Schema({

    color: {
         type:String,
         default:'black'
    },
    highnewshead: String,
    highnewsdesc: String,


});
highnewSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

highnewSchema.set('toJSON', {
    virtuals: true,
});

module.exports = mongoose.model('highnews', highnewSchema);