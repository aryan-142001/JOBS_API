const notfound=(req,res)=>{
    res.status(400).send('Route not found')
}
module.exports=notfound