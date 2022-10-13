const express = require('express')
const app = express()
const port = 3000
const course = require('./router/router')

const multer  = require('multer')
const path = require('path')

app.post('/upload', function(req, res) {
  console.log(req.files.foo); // the uploaded file object
});

// const upload = multer({ storage: storage })
// app.use(upload);


app.set('view engine', 'ejs')
app.use(express.urlencoded({extended:false}));
app.use('/', course)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})