const Job=require('../Models/Job')
const {BadRequestError,UnauthenticatedError}=require('../errors/index')

const getAllJobs=async(req,res)=>{
    const user=req.user
    const allJobs=await Job.find({createdBy:user.userID})
    res.send({allJobs})
}
const getJob=async(req,res)=>{
    const userID=req.user.userID
    const jobID=req.params.id
    const job=await Job.find({createdBy:userID,_id:jobID})
    if(!job){
        throw new BadRequestError('Job not found')
    }
    res.send({job})
}
const CreateJob=async(req,res)=>{
    const user=req.user
    const job=await Job.create({...req.body,createdBy:user.userID})
    res.send({job})
}
const UpdateJob=async(req,res)=>{
    const userID=req.user.userID
    const jobID=req.params.id
    const job=await Job.findByIdAndUpdate({createdBy:userID,_id:jobID},{...req.body})
    if(!job){
        throw new BadRequestError('Job not found')
    }
    res.send({job})
}
const DeleteJob=async(req,res)=>{
    const userID=req.user.userID
    const jobID=req.params.id

    const job=await Job.findByIdAndDelete({createdBy:userID,_id:jobID})
    if(!job){
        throw new NotFoundError('No job found')
    }
    res.send({job})
}

module.exports={getAllJobs,getJob,CreateJob,UpdateJob,DeleteJob}