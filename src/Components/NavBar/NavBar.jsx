import React, { useState } from 'react'
import './NavBar.css'
import { useNavigate } from 'react-router-dom' 

function NavBar() {

    const [ options , setOptions ] = useState( false )

    const navigate = useNavigate()

  return (

    <div id='header'>   

        <button id='menu-button' onClick={ () => { setOptions( true ) } } >Menu</button>
        { options && <div id="menu">

            <button id='close-button' onClick={ () => { setOptions( false ) } } >Close</button>

            <div id="menu-options">

                <div className="menu-divs">

                    <button onClick={ () => { navigate('/') } } >Home</button>
                    <button>About Us</button>
                    <button>Companies</button>

                </div>
                <div className="menu-divs">

                    <button>FAQ</button>
                    <button onClick={ () => { navigate('/login') } } >Login</button>
                    <button onClick={ () => { navigate('/signup') } } >Sign Up</button>

                </div>
                <div className="menu-divs">

                    <button id='post'>Post a job</button>

                </div>

            </div>

        </div>}

    </div>
  )

}

export default NavBar