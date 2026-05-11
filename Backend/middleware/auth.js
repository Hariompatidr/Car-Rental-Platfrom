import jwt from "jsonwebtoken";
import User from "../models/User-model.js";


export const protect = async(req ,resp , next)=>{
    const token = req.headers.authorization;
    if(!token){
        return resp.json({success:false , message:"Not Authorized"})
    }
    try{
        const userID = jwt.decode(token, process.env.JWT_SECRET)
        if(!userID){
            return resp.json({success:false , message:"Not Authorized"})
        }
        req.user = await User.findById(userID).select("-password")
        next();
    }catch(error){
        return resp.json({success:false , message:"Not Authorized"})
    }
}