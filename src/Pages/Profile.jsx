import React, { useContext } from 'react'
import NavBar from '../Components/NavBar/NavBar'
import { AuthContext } from '../Context/User'
import { UDContext } from '../Context/User_details'

function Profile() {

    const { user } = useContext( AuthContext )
    const { user_details } = useContext( UDContext )

  return (

    <div>
        
        <NavBar/>
        <button onClick={ () => { 
            
            console.log( user ) 
            console.log( user_details )
        
        } } >Click</button>
        Profile Page
        
    </div>

  )

}

export default Profile