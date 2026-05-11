import React from 'react'
import Navabarowner from '../../components/owner/Navabarowner'
import Sidebar from '../../components/owner/Sidebar'
import { Outlet } from 'react-router-dom'
import { UserAppContext } from '../../context/Appcontext'
import { useEffect } from 'react'

const Layout = () => {
  const {isowner , navigate} = UserAppContext()

  useEffect(()=>{
    if(!isowner){
      navigate('/')
    }
  },[isowner])

  return (
    <div className='flex flex-col'>
        <Navabarowner/>
        <div className='flex'>
            <Sidebar/>
            <Outlet />
        </div>
    </div>
  )
}

export default Layout
