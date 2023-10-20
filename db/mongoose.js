const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

// mongoose.connect('mongodb://127.0.0.1:27017/newsDB',
// {useNewUrlParser:true, useUnifiedTopology:true}).then(()=>{
//     console.log('connected to database')
// }).catch((e)=>{
//     console.log('error connetcing mongoDB');
//     console.log(e)
// });
mongoose.connect('mongodb://localhost:27017/newsDB',
{useNewUrlParser:true, useUnifiedTopology:true}).then(()=>{
    console.log('connected to database')
}).catch((e)=>{
    console.log('error connetcing mongoDB');
    console.log(e)
});
module.exports = {
    mongoose
}