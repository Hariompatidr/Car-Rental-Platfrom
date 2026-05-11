import Booking from "../models/Booking.js";
import Car from "../models/car.js";

const checkAvailability = async (car, pickupDate, returnDate) => {
    const bookings = await Booking.find({
        car,
        pickupDate: { $lte: returnDate },
        returnDate: { $gte: pickupDate }
    });

    return bookings.length === 0;
};

export const checkCarAvailability = async (req, resp) => {
  try {
    const { location, pickupDate, returnDate } = req.body;

    const cars = await Car.find({ location, isAvailable: true });

    const availableCarsPromises = cars.map(async (car) => {
      const isAvailable = await checkAvailability(car._id, pickupDate, returnDate);
      return { ...car._doc, isAvailable };
    });

    // wait for promises
    let availableCars = await Promise.all(availableCarsPromises);

    // filter
    availableCars = availableCars.filter(car => car.isAvailable);

    resp.json({
      success: true,
      message: "Available cars fetched successfully",
      availableCars
    });

  } catch (error) {
    console.log(error.message);
    resp.json({ success: false, message: error.message });
  }
};

//API to book a car
export const bookCar = async(req,resp)=>{
    try{
        const {_id}=req.user;
        const{car,pickupDate,returnDate} = req.body

        const isAvailable = await checkAvailability(car, pickupDate, returnDate)
        if(!isAvailable){
            resp.json({success:false , message:"Car is not available"})
        }

        const carData = await Car.findById(car)

        const picked = new Date(pickupDate)
        const returned = new Date(returnDate);
        const noOFdays = Math.ceil((returned - picked)/(1000*60*60*24))
        const price = noOFdays * carData.pricePerDay;

        await Booking.create({car ,owner:carData.owner , user:_id , pickupDate , returnDate , price})
        resp.json({success:true , message:"Booked Created"})

    }catch(error){
        console.log(error.message);
        resp.json({success:false , message:error.message})
    }
}

// API to List user bookings
export const getUserBookings = async(req,resp)=>{
    try{
        const {_id} = req.user;
        const bookings = await Booking.find({user:_id}).populate("car").sort({createdAt: -1});
        resp.json({success:true ,bookings})


    }catch(error){
        console.log(error.message);
        resp.json({success:false , message:error.message})
    }
}

// API to get owner bookings
export const getOwnerBookings = async(req,resp)=>{
    try{
        if(req.user.role !== "owner"){
            resp.json({success:false , message:"Only owners can access this resource"})
        }
        const bookings = await Booking.find({owner:req.user._id}).populate("car user").select("-user.password").sort({createdAt: -1});
        resp.json({success:true ,bookings})

    }catch(error){
        console.log(error.message);
        resp.json({success:false , message:error.message})
    }
}

// API to change booking status
export const changeBookingStatus = async (req, resp) => {
  try {

    const { _id } = req.user;
    const { bookingId, status } = req.body;

    const booking = await Booking.findById(bookingId);

    if (!booking) {
      return resp.json({ success: false, message: "Booking not found" });
    }

    if (booking.owner.toString() !== _id.toString()) {
      return resp.json({ success: false, message: "Unauthorized" });
    }

    booking.status = status;
    await booking.save();

    resp.json({ success: true, message: "Booking status updated" });

  } catch (error) {
    console.log(error.message);
    resp.json({ success: false, message: error.message });
  }
};
