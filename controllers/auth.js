const User=require('../Models/User')
const {BadRequestError,UnauthenticatedError}=require('../errors/index')


const register=async (req,res)=>{
    const {name,email,password}=req.body
    if(!name || !email || !password){
        throw new BadRequestError('Please provide name,email and password')
    }
    //console.log(User)
    const user=await User.create({...req.body})
    if(!user){
        throw new BadRequestError('Please provide a valid name,email and password')
    }
    const token=user.createToken()
    
    res.json({userName:user.name,token})
}

const login=async (req,res)=>{
    const {email,password}=req.body
    if(!email || !password){
        throw new BadRequestError('Please provide a valid email and password')
    }
    const user=await User.findOne({email})
    if(!user){
        throw new UnauthenticatedError('Authentication error,User not found')
    }
    const passwordMatches=await user.isMatch(password)
    if(!passwordMatches){
        throw new UnauthenticatedError('Authentication error,Incorrect password')
    }
    // const isMatch=await user.comparePassword(password)
    // if(!isMatch){
    //     throw new UnauthenticatedError('Invalid credentials')
    // }
    const token=user.createToken()
    res.json({userName:user.name,token})
}

module.exports={register,login}
