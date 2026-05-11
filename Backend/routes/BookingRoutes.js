import e from "express";
import { bookCar, changeBookingStatus, checkCarAvailability , getOwnerBookings, getUserBookings} from "../controllers/Bookingcontroller.js";
import { protect } from "../middleware/auth.js";

const bookingRouter = e.Router();

bookingRouter.post('/check-availability',checkCarAvailability)
bookingRouter.post('/create', protect , bookCar)
bookingRouter.get('/user',protect, getUserBookings)
bookingRouter.get('/owner', protect, getOwnerBookings)
bookingRouter.post('/change-status', protect, changeBookingStatus)

export default bookingRouter;