const express = require('express')
const app = express()
const contactRouter = require('./routes/contacts')
const port = 3000
//Connect with Database
const mongoose = require('mongoose')
var mongoDB = 'mongodb://127.0.0.1/my_database'
mongoose.connect(mongoDB, { useUnifiedTopology: true,useNewUrlParser: true  })
const db = mongoose.connection
db.on('error',function(error){console.error(error)})
db.once('open',function(){
    console.log('Database is connected.')
})

app.use(express.json())
app.use('/',contactRouter)


app.listen(3000, function(){
    console.log('Server is running in port 3000')
})