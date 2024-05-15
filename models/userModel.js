const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name:{
        type:String,
        required: [true,'name is mandatory'],
    },
    email:{
        type:String,
        required:[true,'email is mandatory']
    },
    password:{
        type: String,
        required: [true, 'password is mandatory']
    },
    isAdmin:{
        type:Boolean,
        required: true,
        default:false
    }
},{timestamps: true})

module.exports = mongoose.model('User',userSchema)