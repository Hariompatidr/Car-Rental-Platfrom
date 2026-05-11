import React from 'react'
import { assets } from '../../assets/assets'
import { Link } from 'react-router-dom'
import { UserAppContext } from '../../context/Appcontext'

const Navabarowner = () => {
const {user} =  UserAppContext()

  return (
    <div className='flex items-center justify-between px-6 md:px-10 py-2 text-gray-500 border-b border-borderColor relative transition-all'>
      <Link to="/">
      <img src={assets.logo} alt="" className='h-9'/>
      </Link>
      <p className="text-xl font-bold">Welcome, {user.name|| "Owner"}</p>
    </div>
  )
}

export default Navabarowner
