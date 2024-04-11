import React, { useContext, useState } from 'react'
import './NavBar.css'
import { useNavigate } from 'react-router-dom' 
import { AuthContext } from '../../Context/User'
import { signOut } from 'firebase/auth'
import { FirebaseAuth } from '../../FIrebase/Configueration'
import toast, { Toaster } from 'react-hot-toast'

function NavBar() {

    const [ options , setOptions ] = useState( false )

    const { user } = useContext( AuthContext )

    const navigate = useNavigate()
    const navigateTo = ( destination ) => {

        if ( destination === 'home' ) navigate('/')
        else if ( destination === 'login' ) navigate('/login')
        else if ( destination === 'signup' ) navigate('/signup')
        else if ( destination === 'notification' ) navigate('/notification')
        else if ( destination === 'profile' ) navigate('/profile')

    }

    const handleLogout = () => {

        signOut( FirebaseAuth ).then( () => {
            
            localStorage.clear()
            navigate('/login')
        
        } )
        .catch( ( error ) => toast.error( error.message ) )

    }

  return (

    <div id='header'>   

        <button id='menu-button' onClick={ () => { setOptions( true ) } } >Menu</button>
        { options && <div id="menu">

            <button id='close-button' onClick={ () => { setOptions( false ) } } >Close</button>

            <div id="menu-options">

                <div className="menu-divs">

                    <button onClick={ () => { navigateTo('home') } } ><i class='bx bx-home-alt'></i>Home</button>
                    <button><i class='bx bx-message-square-detail'></i>About Us</button>
                    <button><i class='bx bx-buildings'></i>Companies</button>

                </div>
                <div className="menu-divs">

                    <button><i class='bx bx-conversation'></i>FAQ</button>
                    <button onClick={ () => { user ? navigateTo('notification') : navigateTo('login') } } > 
                        { user ? <><i class='bx bx-bell'></i>Notifications</> : <><i class='bx bx-log-in' ></i>Login</> } </button>
                    <button onClick={ () => { user ? handleLogout() : navigateTo('signup') } } >
                        { user ? <><i class='bx bx-log-out' ></i>Log out</> : <><i class='bx bx-user-plus'></i>Sign up</> }</button>

                </div>
                <div className="menu-divs">

                    <button id='post'><i class='bx bx-briefcase'></i>Post a job</button>
                    { user && <button onClick={ () => { navigateTo('profile') } } ><i class='bx bx-user'></i>
                    Profile</button> }

                </div>

            </div>

            <Toaster />

        </div>}

    </div>
  )

}

export default NavBar