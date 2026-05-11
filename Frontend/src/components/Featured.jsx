import React from 'react'
import Title from './Title'
import { assets } from '../assets/assets'
import CarCard from './CarCard'
import { useNavigate } from 'react-router-dom'
import { UserAppContext } from '../context/Appcontext'
import { motion } from "framer-motion";

const Featured = () => {
  const navigate = useNavigate()
  const { cars } = UserAppContext()

  return (
    <motion.div
    initial={{opacity:0,y:40}} 
    whileInView={{opacity:1,y:0}} 
    transition={{ duration:1 , ease:'easeOut' }} 
    className='flex flex-col items-center py-24 px-6 md:px-16 lg:px-24 xl:px-32'>
      <motion.div
        initial={{opacity:0, y:20}} 
        whileInView={{opacity:1, y:0}} 
        transition={{ duration:1 , delay:0.5}}>
        <Title title="Featured Cars" subtitle="Discover our premium selection of luxury vehicles" align="center" />
      </motion.div>

      <motion.div 
      initial={{opacity:0,y:100}} 
      whileInView={{opacity:1,y:0}} 
      transition={{ duration:1 , delay:0.5 }} 
      className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-18'>
      {
        cars.slice(0, 6).map((car) => (
        <motion.div 
        key={car._id}
        initial={{opacity:0, scale: 0.95 }} 
        whileInView={{opacity:1, scale: 1 }} 
        transition={{ duration:0.4 , ease:'easeOut' }} 
        >
          <CarCard car={car}/>
          
        </motion.div>
        ))
      }
      </motion.div>
      <motion.button 
      initial={{opacity:0 ,y:0}} 
      whileInView={{opacity:1 ,y:0}}
      transition={{delay:0.6 ,duration:0.4}} 
      onClick={()=>{
        navigate('/cars'); scrollTo(0,0)
      }}
      className='flex items-center justify-center gap-12 px-6 py-2 border-borderColor hover:bg-gray-50 rounded-md mt-18 cursor-pointer'>
        Explore all cars <img src={assets.arrow_icon} alt="arrow" />
      </motion.button>
    </motion.div>
  )

}
export default Featured

 