import React, { useContext } from 'react'
import NavBar from '../Components/NavBar/NavBar'
import { AuthContext } from '../Context/User'
import Footer from '../Components/Footer/Footer'
import SHome from '../Components/Seeker Home/SHome'

function SeekerHome() {

  const { user } = useContext( AuthContext )

  return (

    <div>

      <NavBar />
      {/* <h1>{ user ? user.displayName : '' }</h1> */}
      <SHome />
      <Footer />

    </div>

  )

}

export default SeekerHome