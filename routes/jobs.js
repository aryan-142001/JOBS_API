const express=require('express')
const router=express.Router()
const {getAllJobs,getJob,CreateJob,UpdateJob,DeleteJob}=require('../controllers/jobs')

router.get('/',getAllJobs)
router.get('/:id',getJob)
router.post('/',CreateJob)
router.patch('/:id',UpdateJob)
router.delete('/:id',DeleteJob)

module.exports=router