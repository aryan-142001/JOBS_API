const mongoose=require('mongoose')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')

const UserSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Please provide a name'],
        minlength:3,
        maxlength:50
    },
    email:{
        type:String,
        required:[true,'Please provide an email'],
        match:[
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please provide valid email'
        ],
        unique:true
    },
    password:{
        type:String,
        required:[true,'Please provide a password'],
        minlength:6,
        maxlength:100
    }
})

UserSchema.pre('save',async function(){
    const salt=await bcrypt.genSalt(10)
    const hashedPass=await bcrypt.hash(this.password,salt)
    this.password=hashedPass
})

UserSchema.methods.createToken= function(){
    const token= jwt.sign({userID:this._id,userName:this.name},process.env.JWT_SECRET,{expiresIn:'30d'})
    return token
}

UserSchema.methods.isMatch=async function(password){
    const passwordMatches=await bcrypt.compare(password,this.password)
    return passwordMatches
}

module.exports=mongoose.model('User',UserSchema)