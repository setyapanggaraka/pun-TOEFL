const express = require('express')
const app = express()
const port = 3000
const session = require('express-session');

const course = require('./router/router')

app.set('view engine', 'ejs')
app.use(express.urlencoded({extended:false}));
app.use(session({
  secret: 'secret saja',
  resave: false,
  saveUninitialized: false,
  cookie: { 
    secure: false,
    sameSite: true 
  }
}));
app.use('/', course);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});