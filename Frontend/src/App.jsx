
import Navbar from './components/Navbar';
import { Route, Routes, useLocation } from 'react-router-dom';
import Home from './Pages/Home';
import MyBookings from './Pages/MyBooking';
import CarDetails from './Pages/CarDetail';
import Cars from './Pages/Cars';  
import Footer from './components/Footer';
import Layout from './Pages/owner/Layout';
import Dashboard from './Pages/owner/Dashboard';
import AddCar from './Pages/owner/AddCar';
import ManageCars from './Pages/owner/ManageCars';
import Managebooking from './Pages/owner/Managebooking';
import Login from './components/Login';
import { Toaster } from 'react-hot-toast';
import { UserAppContext } from './context/Appcontext';



const App = ()=>{

  const {showlogin} = UserAppContext();
  const isOwnerPath = useLocation().pathname.startsWith('/owner')
  return(
    <>
    < Toaster />
      {showlogin && <Login />}
      {!isOwnerPath && <Navbar/>}

      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/car-details/:id" element={<CarDetails />}/>
        <Route path="/cars" element={<Cars />}/>
        <Route path="/my-bookings" element={<MyBookings />}/>

        <Route path='/owner' element={ <Layout/>}>
          <Route index element={<Dashboard/>}/>
          <Route path='add-car' element={<AddCar/>}/>
          <Route path='manage-cars' element={<ManageCars/>}/>
          <Route path='manage-bookings' element={<Managebooking/>}/>
        </Route>
      </Routes>

      {!isOwnerPath && <Footer />}
    </>
  )
}
export default App;