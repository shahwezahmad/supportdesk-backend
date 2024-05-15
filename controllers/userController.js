const User = require('../models/userModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const register =  async (req, res) => {
    const {name, email, password} = req.body
    
    // check if field is empty
    if(!name || !email || !password){
        res.status(400).send('Kindly fill mandatory fields')
        

    }

    // check user exists
    const userExist = await User.findOne({email})
    if(userExist){
        res.status(400).send('User already exist')
        return;
    }

    // store user data
    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(password, salt)
    const user = await User.create({name, email, password:hashPassword})
    if(user){
        console.log(user)
        res.status(200).json({
            _id:user._id,
            name:user.name,
            email:user.email,
            token:generateToken(user._id)
        })
    }
}
const login = async (req, res) => {
   // empty fields
   const {email, password} = req.body
   if(!email || !password) {
    console.log('Kindly fill mandatory fields');
    return
   }

    const user = await User.findOne({email})
    if(!user){
        res.status(400).send('No user exist')
        return
    }
{}    if(user && (await bcrypt.compare(password,user.password))){
        res.status(200).json({
            _id:user._id,
            name:user.name,
            email:user.email,
            token:generateToken(user._id)

        })
    }else {
        res.status(400).send('User not found')
    }

}

const generateToken = (id)=> {
    return jwt.sign({id},process.env.TOKEN_KEY,{expiresIn: '30d'})
}

module.exports = {register, login}