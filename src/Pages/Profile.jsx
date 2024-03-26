import React, { useEffect, useState } from 'react'
import NavBar from '../Components/NavBar/NavBar'
// import { UDContext } from '../Context/local_storage_data'
import SeekerProfile from '../Components/SeekerProfile/SeekerProfile'
import EmployerProfile from '../Components/EmployerProfile/EmployerProfile'

function Profile() {

  const [ seeker , setSeeker ] = useState( false )
  const [ employer , setEmployer ] = useState( false )

  // const { local_storage_data } = useContext(UDContext)

  useEffect(() => {

    // console.log( local_storage_data.user_type )
    // if ( local_storage_data.user_type === 'Seeker' ) setSeeker( true )
    // else setEmployer( true )

    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      const local_storage_data = JSON.parse(storedUserData);
      if (local_storage_data.user === 'Seeker') setSeeker( true )
      else setEmployer( true )
  }
    
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