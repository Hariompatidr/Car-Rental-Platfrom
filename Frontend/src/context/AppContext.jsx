import { useContext } from "react";
import { createContext } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";    
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
//import { useCallback } from "react";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

// eslint-disable-next-line react-refresh/only-export-components
export const AppContext = createContext();

export const AppProvider = ({ children })=>{
    const navigate = useNavigate();
    const currency = import.meta.env.VITE_CURRENCY
    const [token , setToken] = useState(() => localStorage.getItem('token'));
    const [user , setUser] = useState(null);
    const [isowner , setIsOwner] = useState(false);
    const [showlogin , setShowLogin] = useState(false);
    const [pickupDate , setPickupDate] = useState('');
    const [returnDate , setReturnDate] = useState('');

    const [cars , setCars] = useState([]);

    // Function to check if the user  is logged in
     
    const fetchUser = async()=>{
        try{
            const{data} = await axios.get('/api/user/data')
            if(data.success){
                setUser(data.user);
                setIsOwner(data.user.role === 'owner');
            }else{
                navigate('/');
            }
        }catch(error){
            toast.error(error.message)
        }
    }

    //Function to fetch all cars from the server 
    
    const fetchCars = async()=>{
        try{
            const {data} = await axios.get('/api/user/cars')
            data.success ? setCars(data.cars):toast.error(data.message)
        }catch(error){
            toast.error(error.message)
        }
    }

    // Logout user

    const logout = ()=>{
        localStorage.removeItem('token')
        setToken(null)
        setUser(null)
        setIsOwner(false)
        axios.defaults.headers.common['Authorization']= ''
        toast.success('You have been logget out ')
    }


    // useEffect to retrieve user data  from localstorage

    useEffect(()=>{
        const token = localStorage.getItem('token')
         
        setToken(token)
        fetchCars();
        
    },[])

// useEffect to fetch user data when token is available

useEffect(()=>{
        if(token){
            axios.defaults.headers.common['Authorization'] = `${token}`;
             
            fetchUser();
    };
// eslint-disable-next-line react-hooks/exhaustive-deps
},[token])
    const value = {
        navigate,currency, axios, user, setUser , token , setToken, isowner , setIsOwner , fetchUser , showlogin , setShowLogin , logout , fetchCars , cars , setCars , pickupDate , setPickupDate ,returnDate , setReturnDate
    }
    return(
    <AppContext.Provider value={value}>
        { children }
    </AppContext.Provider>
    )
}

export const UserAppContext = ()=>{
    return useContext(AppContext);
};