import express from 'express'
import 'dotenv/config'
import cors from 'cors'
import connectDB from './configs/db.js';
import userRouter from './routes/userRoutes.js';
import ownerRouter from './routes/OwnerRoutes.js';
import bookingRouter from './routes/BookingRoutes.js';


const app = express();
await connectDB()
app.use(cors())
app.use(express.json()) 

app.get('/',(req,resp)=>{
    resp.send("Added Successfully")
})
app.use('/api/user', userRouter)
app.use('/api/owner', ownerRouter)
app.use('/api/bookings', bookingRouter)


const PORT = process.env.PORT || 3200
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})

