const mongoose=require('mongoose')

const JobSchema=new mongoose.Schema({
    company:{
        type:String,
        required:[true,'Please provide a company name'],
        minlength:5,
        maxlength:50
    },
    position:{
        type:String,
        required:[true,'Please provide a position'],
    },
    status:{
        type:String,
        enum:['interview','pending','declined']
    },
    createdBy:{
        type:mongoose.Types.ObjectId,
        ref:'User',
        required:[true,'Please provide user']
    }

},{timestamps:true})

module.exports=mongoose.model('Job',JobSchema)