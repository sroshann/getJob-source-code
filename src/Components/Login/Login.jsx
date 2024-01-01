import React from 'react'
import './Login.css'
import { useNavigate } from 'react-router-dom' 

function Login() {

    const navigate = useNavigate()

    return (

        <div id="content">

            <div className='container'>

                <h2>Login</h2>
                <p className='item'>Registerd Email</p>
                <input type="text" placeholder='Enter your Email' />
                <p className='item'>Password</p>
                <input type="text" placeholder='Password' />
                <p id='forget'>Forgot Password?</p>

                <hr />

                <button id='log'>Login</button>
                <p id='alre'>Aleady have a account ?</p>
                <button id='reg' onClick={ () => { navigate('/signup') } } >Register</button>

            </div>

        </div>
    )
}

export default Login