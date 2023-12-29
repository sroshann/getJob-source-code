import React from 'react'
import NavBar from '../Components/NavBar/NavBar'
import Interface from '../Components/MainInterface/Interface'
import Category from '../Components/Category/Category'
import Carousel from '../Components/Carousel/Carousel'

function Home() {

  return (

    <div>
        
      <NavBar/>
      <Interface/>
      <Category/>
      <Carousel/>

    </div>

  )

}

export default Home