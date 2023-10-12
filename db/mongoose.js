const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/newsDB').then(()=>{
    console.log('connected to database')
}).catch((e)=>{
    console.log('error connetcing mongoDB');
    console.log(e)
});

// mongoose.connect('mongodb://52.15.214.181/newsDB', { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => {
//     console.log('Connected to the MongoDB database');
//   })
//   .catch((err) => {
//     console.error('Error connecting to the MongoDB database:', err);
//   });

module.exports = {
    mongoose
}