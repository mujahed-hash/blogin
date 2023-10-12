const express = require('express');
const app = express()
const cors = require('cors');
const {mongoose} = require('./db/mongoose');
const newsRoute = require('./routes/news');
const highnewsRoute = require('./routes/highnews');

const newsSlider = require('./routes/newsslider');

const categoryRoute = require('./routes/category'); 
var path = require('path');


app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}));

app.use('/pics', express.static(path.join('pics')));
app.use('/newsslider', express.static(path.join('newsslider')))

app.use('/api', newsRoute);
app.use('/api', newsSlider);

app.use('/api/highnews', highnewsRoute);

app.use('/api/category', categoryRoute);

app.use(express.static(path.join(__dirname, 'public')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});
app.listen(3000,function(){
  console.log('server running')
} )