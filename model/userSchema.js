let mongoose = require('mongoose')

let userSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    email:String,
    password:String,
    usertype:String
})

module.exports = mongoose.model('User',userSchema)