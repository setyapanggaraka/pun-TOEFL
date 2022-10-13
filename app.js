const express = require('express')
const app = express()
const port = 3000

const course = require('./router/router')

app.set('view engine', 'ejs')
app.use(express.urlencoded({extended:false}));
app.use('/', course)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})