import cors from 'cors'
import 'dotenv/config'
import express from 'express'
import connectCloudinary from './config/cloudinary.js'
import connectDB from './config/mongodb.js'
import cartRouter from './routes/cartRoute.js'
import orderRouter from './routes/orderRoute.js'
import productRouter from './routes/productRoute.js'
import userRouter from './routes/userRoute.js'

// App config
 const app = express()

 const port = process.env.PORT || 4000
 connectDB()
 connectCloudinary()


 // middlewares

 app.use(express.json())
 app.use(cors())

 // api endpoints
 app.use('/api/user',userRouter)
 app.use('/api/product',productRouter)
 app.use('/api/cart',cartRouter)
 app.use('/api/order',orderRouter)

 app.get('/',(req,res)=>{
    res.send("YASH RANA ")
 })
 


 app.listen(port,()=>console.log('Server is running on PORT : '+ port));
 