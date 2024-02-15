import React, { useContext } from 'react'
import NavBar from '../Components/NavBar/NavBar'
import { AuthContext } from '../Context/User'

function EmployerHome() {

  const { user } = useContext( AuthContext )

  return (
    <div>

      <NavBar />
      <h1> { user ? user.displayName : '' } </h1>

    </div>
  )
}

export default EmployerHome