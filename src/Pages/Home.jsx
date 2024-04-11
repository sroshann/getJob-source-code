import React from 'react'
import NavBar from '../Components/NavBar/NavBar'
import Interface from '../Components/MainInterface/Interface'
import Category from '../Components/Category/Category'
import Carousel from '../Components/Carousel/Carousel'
import Footer from '../Components/Footer/Footer'

function Home() {

  return (

    <div>
        
      <NavBar/>
      <Interface/>
      <Category/>
      <Carousel/>
      <Footer />

    </div>

  )

}

export default Home