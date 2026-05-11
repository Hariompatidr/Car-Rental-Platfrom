import imagekit from "../configs/imagekit.js";
import Car from "../models/car.js";
import User from "../models/User-model.js";
import fs from 'fs';
import Booking from "../models/Booking.js";

export const changeRoleToOwner = async(req , resp)=>{
    try{
        const{_id} = req.body;
        await User.findByIdAndUpdate(_id , {role:"owner"})
        resp.json({success:true , message:"Role changed to owner"})
    }catch(error){
        console.log(error.message);
        resp.json({success:false , message:"Error changing role"})
    }
}

// Api to list car

export const addcar = async(req , resp)=>{
    try{
        const {_id} = req.user;
        let carData = JSON.parse(req.body.carData);

        const imagefile = req.file;
        //upload image to imagekit
        const fileBuffer = fs.readFileSync(imagefile.path);
        const response = await imagekit.upload({
            file: fileBuffer,
            fileName: imagefile.originalname,
            folder: "/cars"
        })

        // for url generation works for both images and videos

        var optimizedImageURL = imagekit.url({
            path:response.filePath,
            transformation : [
                {quality: 'auto'}, // auto comparession
                {width: '1280'}, // width resizing
                {format:'webp'}  // convert to webp format
            ]
        });


        const image = optimizedImageURL;
        await Car.create({
            ...carData , owner:_id , image})
            resp.json({success:true , message:"Car added successfully"})

        

    }catch(error){
        console.log(error.message);
        resp.json({success:false , message:"Error adding car"})
    }
}

// API to list cars of owner

export const getOwnerCars = async(req , resp)=>{
    try{
        const {_id} = req.user;
        const cars = await Car.find({owner:_id})
        resp.json({success:true , message:"Cars fetched successfully" , cars})
    }catch(error){
        console.log(error.message);
        resp.json({success:false , message:"Error fetching cars"})

    }
}

// API to toggle car availability
export const toggleCarAvailability = async (req, resp) => {
  try {

    const { _id } = req.user;
    const { carId } = req.body;

    const car = await Car.findById(carId);

    if (!car) {
      return resp.json({ success:false, message:"Car not found" });
    }

    // check ownership
    if (car.owner.toString() !== _id.toString()) {
      return resp.json({success:false , message:"Not authorized to update this car"});
    }

    car.isAvailable = !car.isAvailable;

    await car.save();

    resp.json({
      success:true,
      message:"Car availability toggled successfully"
    });

  } catch (error) {
    console.log(error.message);
    resp.json({success:false , message:"Error updating car"});
  }
};


// API to delete car
export const deleteCar = async (req, resp) => {
  try {

    const { _id } = req.user;
    const { carId } = req.body;

    const car = await Car.findById(carId);

    if (!car) {
      return resp.json({ success: false, message: "Car not found" });
    }

    // check if car belongs to the user
    if (car.owner.toString() !== _id.toString()) {
      return resp.json({ success: false, message: "Unauthorized" });
    }

    car.owner = null;
    car.isAvailable = false;

    await car.save();

    resp.json({
      success: true,
      message: "Car Removed"
    });

  } catch (error) {
    console.log(error.message);
    resp.json({ success: false, message: error.message });
  }
};

// Api to get dashboard data 
export const getDashboardData = async(req , resp)=>{
    try{
        const {_id , role} = req.user;
        
        if(role !== "owner"){
            return resp.json({success:false , message:"Unauthorized"})
        }
        const cars = await Car.find({owner:_id})
        const bookings = await Booking.find({owner:_id}).populate('car').sort({createdAt: -1})

        const pendingBookings = await Booking.find({owner:_id ,status:"pending"})
        const completeBookings = await Booking.find({owner:_id ,status:"confirmed"})

        const monthlyRevenue = bookings.slice().filter(booking => booking.status ==="confirmed").reduce((acc,booking)=> acc + booking.price , 0)

        const dashboardData = {
            totalCars : cars.length,
            totalBookings : bookings.length,
            pendingBookings : pendingBookings.length,
            completeBookings : completeBookings.length,
            recentBookings : bookings.slice(0,3),
            monthlyRevenue
        }
        resp.json({success:true , dashboardData})

    }catch(error){
        console.log(error.message);
        resp.json({success:false , message:error.message})
    }
}

// API to change the image 
export const updateUserImage = async(req , resp)=>{
    try{
        const {_id} = req.user;
        const imagefile = req.file;
        //upload image to imagekit
        const fileBuffer = fs.readFileSync(imagefile.path);
        const response = await imagekit.upload({
            file: fileBuffer,
            fileName: imagefile.originalname,
            folder: "/users"
        })

        // for url generation works for both images and videos

        var optimizedImageURL = imagekit.url({
            path:response.filePath,
            transformation : [
                {quality: 'auto'}, // auto comparession
                {width: '400'}, // width resizing
                {format:'webp'}  // convert to webp format
            ]
        });


        const image = optimizedImageURL;

        await User.findByIdAndUpdate(_id , {image});
        resp.json({success:true , message:"Image updated"})

    }catch(error){
        console.log(error.message);
        resp.json({success:false , message:error.message})
    }
}
