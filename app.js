require('dotenv').config()
const express=require('express')
const app=express()
const AuthRouter=require('./routes/auth')
const JobRouter=require('./routes/jobs')
const connectDB=require('./db/connect')
const notfoundMiddleware=require('./middlewares/not-found')
const errorHandlerMiddleware=require('./middlewares/error-handler')
const authoriseUser=require('./middlewares/authentication')
const cors=require('cors')

//swagger
const swaggerUI=require('swagger-ui-express')
const YAML=require('yamljs')
const swaggerDocument=YAML.load('./swagger.yaml')

app.use(express.json())
const port=process.env.PORT || 5000

app.use('/api-docs',swaggerUI.serve,swaggerUI.setup(swaggerDocument))
app.get('/',(req,res)=>{
    res.send(`<h1>Jobs Api</h1> <a href="/api-docs">API Documentation</a>`)
})
app.use(cors())
app.use('/api/v1/auth',AuthRouter)
app.use('/api/v1/jobs',authoriseUser,JobRouter)
app.use(notfoundMiddleware)
app.use(errorHandlerMiddleware)

const start=async()=>{
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port,()=>{console.log(`server is listening on port ${port}`)})
    } catch (error) {
        console.log(error)
    }
}

start()