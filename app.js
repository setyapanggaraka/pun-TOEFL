const express = require('express')
const app = express()
const port = 3000
const multer = require("multer");
const path = require("path");
const course = require('./router/router')
const fileUpload = require('express-fileupload');

app.set('view engine', 'ejs')
app.use(express.urlencoded({extended:false}));
app.use('/', course)

app.use(fileUpload());
app.use('/form', express.static(__dirname + '/index.html'));

// default options


app.get('/ping', function(req, res) {
  res.send('pong');
});

app.post('/upload', async (req, res) => {

});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})