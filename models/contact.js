const mongoose = require('mongoose')

const contactSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true

    },
    address:{
        type: String,
        required: true

    },
    email:{
        type: String,
        required: true

 ,   },
 phone:{
     type: Number,
     required: true

 },
 company:{
     type: String,
     required:true

 },
 date:{
     type:Date,
     required:true,
     default: Date.now()
     
 }
})

module.exports = mongoose.model('Contact',contactSchema)