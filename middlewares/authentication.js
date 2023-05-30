const {BadRequestError,UnauthenticatedError}=require('../errors/index')
const jwt=require('jsonwebtoken')

const authoriseUser=async (req,res,next)=>{
    const authorisationHeader=req.headers.authorization
    
    if(!authorisationHeader || !authorisationHeader.startsWith('Bearer ')){
        throw new BadRequestError('Token not recieved')
    }
    const token=authorisationHeader.split(' ')[1]
    
    try {
        const payload=jwt.verify(token,process.env.JWT_SECRET)
        const tempUser={userID:payload.userID,userName:payload.userName}
        req.user=tempUser
        //console.log(tempUser)
        next()
    } catch (error) {
        throw new UnauthenticatedError('Invalid token')
    }
}

module.exports=authoriseUser