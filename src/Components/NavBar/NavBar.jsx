import React, { useContext, useEffect, useState } from 'react'
import './NavBar.css'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../Context/User'
import { signOut } from 'firebase/auth'
import { FirebaseAuth } from '../../FIrebase/Configueration'
import toast, { Toaster } from 'react-hot-toast'

function NavBar() {

    const [options, setOptions] = useState(false)
    const [ userType ,setUserType ] = useState('')
    const { user } = useContext(AuthContext)

    const navigate = useNavigate()
    const navigateTo = (destination) => {

        // let userType

        // const storedUserData = localStorage.getItem('userData')
        // if ( storedUserData ) {

        //     const parsedUserData = JSON.parse( storedUserData )
        //     userType = parsedUserData.user

        // }

        if (destination === 'home') {

            if ( userType === 'Seeker' ) navigate('/seekerhome')
            else if ( userType === 'Employer' ) navigate('/employerhome')
            else navigate('/')

        }
        else if (destination === 'login') navigate('/login')
        else if (destination === 'signup') navigate('/signup')
        else if (destination === 'notification') navigate('/notification')
        else if (destination === 'profile') navigate('/profile')
        else if (destination === 'postjob') {

            if (userType === 'Employer') navigate('/postjob')
            else navigate('/signup')

        } else if ( destination === 'saved' ) navigate('/saved')
        else if ( destination === 'applied' ) navigate('/applied')
        else if ( destination === 'posted' ) navigate('/posted')

    }

    const handleLogout = () => {

        signOut(FirebaseAuth).then(() => {

            localStorage.clear()
            navigate('/login')

        })
            .catch((error) => toast.error(error.message))

    }

    const getUserData = () => {

        const storedUserData = localStorage.getItem('userData')
        if ( storedUserData ) {

            const parsedUserData = JSON.parse( storedUserData )
            setUserType( parsedUserData.user )

        }

    }

    useEffect(() => {
      
        getUserData()
      
    }, [])
    

    return (

        <div id='header'>

            <button id='menu-button' onClick={() => { setOptions(true) }} >Menu</button>
            {options && <div id="menu">

                <button id='close-button' onClick={() => { setOptions(false) }} >Close</button>

                <div id="menu-options">

                    <div className="menu-divs">

                        <button onClick={() => { navigateTo('home') }} ><i class='bx bx-home-alt'></i>Home</button>
                        <button><i class='bx bx-message-square-detail'></i>About Us</button>
                        <button><i class='bx bx-buildings'></i>Companies</button>

                    </div>
                    <div className="menu-divs">

                        <button><i class='bx bx-conversation'></i>FAQ</button>
                        <button onClick={() => { user ? navigateTo('notification') : navigateTo('login') }} >
                            {user ? <><i class='bx bx-bell'></i>Notifications</> : <><i class='bx bx-log-in' ></i>Login</>} </button>
                        <button onClick={() => { user ? handleLogout() : navigateTo('signup') }} >
                            {user ? <><i class='bx bx-log-out' ></i>Log out</> : <><i class='bx bx-user-plus'></i>Sign up</>}</button>

                    </div>
                    <div className="menu-divs">

                        { userType === 'Seeker' ? <button onClick={() => { navigateTo('applied') }}><i class='bx bx-accessibility'></i>Applied jobs</button> :
                             <button id='post' onClick={() => { navigateTo('postjob') }}><i class='bx bx-briefcase'></i>Post a job</button>}
                        { userType == 'Seeker' ? <button onClick={ () => navigateTo('saved') }><i class='bx bx-bookmarks' ></i>Saved jobs</button> :
                            userType == 'Employer' ? <button onClick={ () => navigateTo('posted') }>Posted jobs</button> : <></>}
                        {user && <button onClick={() => { navigateTo('profile') }} ><i class='bx bx-user'></i>
                            Profile</button>}

                    </div>

                </div>

                <Toaster />

            </div>}

        </div>
    )

}

export default NavBar