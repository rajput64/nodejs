let mongoose = require('mongoose')

let facultySchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    email:String,
    gender:String,
    subject:String
})

module.exports = mongoose.model('Faculty',facultySchema)