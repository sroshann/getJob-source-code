import React, { useContext, useState } from 'react'
import './NavBar.css'
import { useNavigate } from 'react-router-dom' 
import { AuthContext } from '../../Context/User'
import { signOut } from 'firebase/auth'
import { FirebaseAuth } from '../../FIrebase/Configueration'

function NavBar() {

    const [ options , setOptions ] = useState( false )

    const { user } = useContext( AuthContext )

    const navigate = useNavigate()
    const navigateTo = ( destination ) => {

        if ( destination === 'home' ) navigate('/')
        else if ( destination === 'login' ) navigate('/login')
        else if ( destination === 'signup' ) navigate('/signup')
        else if ( destination === 'notification' ) navigate('/notification')

    }

    const handleLogout = () => {

        signOut( FirebaseAuth ).then( () => navigate('/login') )
        .catch( ( error ) => alert( error.message ) )

    }

  return (

    <div id='header'>   

        <button id='menu-button' onClick={ () => { setOptions( true ) } } >Menu</button>
        { options && <div id="menu">

            <button id='close-button' onClick={ () => { setOptions( false ) } } >Close</button>

            <div id="menu-options">

                <div className="menu-divs">

                    <button onClick={ () => { navigateTo('home') } } >Home</button>
                    <button>About Us</button>
                    <button>Companies</button>

                </div>
                <div className="menu-divs">

                    <button>FAQ</button>
                    <button onClick={ () => { user ? navigateTo('notification') : navigateTo('login') } } > { user ? 'Notifications' : 'Login' } </button>
                    <button onClick={ () => { user ? handleLogout() : navigateTo('signup') } } >{ user ? 'Log out' : 'Sign up' }</button>

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