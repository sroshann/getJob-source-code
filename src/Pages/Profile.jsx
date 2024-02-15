import React, { useContext, useEffect, useState } from 'react'
import NavBar from '../Components/NavBar/NavBar'
import { UDContext } from '../Context/User_details'
import SeekerProfile from '../Components/SeekerProfile/SeekerProfile'
import EmployerProfile from '../Components/EmployerProfile/EmployerProfile'

function Profile() {

  const [ seeker , setSeeker ] = useState( false )
  const [ employer , setEmployer ] = useState( false )

  const { user_details } = useContext(UDContext)

  useEffect(() => {

    console.log( user_details.user_type )
    if ( user_details.user_type === 'Seeker' ) setSeeker( true )
    else setEmployer( true )
    
  }, [])
  
  
  return (

    <div>

      <NavBar />
      { seeker && <SeekerProfile /> }
      { employer && <EmployerProfile /> }

    </div>

  )

}

export default Profile