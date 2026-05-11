import User from "../models/User-model.js"
import bcrypt from "bcrypt" 
import jwt from "jsonwebtoken"
import Car from "../models/car.js"; 

// Generate JWT token

const generateToken = (userID) => {
    const payload = userID;
    return jwt.sign(payload , process.env.JWT_SECRET)
}

// Register User 
export const registerUser = async (req, resp) => 
    {
    try{ 
        const{name,email,password} = req.body
        if(!name || ! email || !password || password.length < 8){
            return resp.json({success:false, message:" Fill all the fields properly"})
        }

        const userExists = await User.findOne({email})
        if(userExists){
            return resp.json({success:false, message:"User already exists"})
        }     
        
        if(email==="admin@gmail.com"){  
        const hashpassword = await bcrypt.hash(password,10) 
        const user = await User.create({name , email , password:hashpassword,role:"owner"});
        const token = generateToken(user._id.toString())
        resp.json({success:true, message:"Admin registered successfully", token})
        }
    } catch(error){
        console.log(error.message);
        resp.json({success:false, message:error.message})
    }
}

// Login User

export const LoginUser = async (req, resp) => {
    try{
        const {email,password} = req.body
        const user = await User.findOne({email})
        if(!user){
            return resp.json({success:false, message:"User not found"})
        }
          

        const isMatch = await bcrypt.compare(password,user.password) 

        if(!isMatch){
            return resp.json(
                { 
                    status:401,
                    success:false, message:"Invalid credentials"
                })
        }
        const token = generateToken(user._id.toString())
        resp.json({success:true, message:"Login successfully", token})
        

    }catch(error){
        console.log(error.message);
        resp.json({success:false, message:error.message})
    } 
}

// Get user data using Token(JWT)

export const getUserData = async(req,resp)=>{
    try{
        const {user} = req;
        resp.json({success:true , user})
    } catch(error){
        console.log(error.message);
        resp.json({success:false , message:error.message})
    }
}

// Get all cars for the frotend 
export const getCars = async(req,resp)=>{
    try{
        const cars  = await Car.find({isAvailable: true})
        resp.json({success:true , cars})
    } catch(error){
        console.log(error.message);
        resp.json({success:false , message:error.message})
    }
}
