require('dotenv').config();
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const postRoute = require('./routes/post')
const authRoute = require('./routes/auth')
const mongoose = require('mongoose')
const cors = require('cors')
const port = process.env.PORT || 3000

app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())
app.use(bodyParser.json())

app.use('/post', postRoute)
app.use('/auth', authRoute)

mongoose.connect(process.env.DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}, () => {
  console.log('conected to DB');

})

app.listen(port, () => {
  console.log(`It works on ${port} =)`);

})