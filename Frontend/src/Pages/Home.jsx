import React from 'react'
import Hero from '../components/Hero'
import Featured from '../components/Featured'
import Banner from '../components/Banner'
import Testimonial from '../components/Testimonial'
import Newslater from '../components/Newslater'

const Home = () => {
  return (
    <>
      <Hero/>
      <Featured/>
      <Banner/>
      <Testimonial/> 
      <Newslater/>
    </>
  )
}

export default Home
