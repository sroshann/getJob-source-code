import React, { useState } from 'react'
import './Login.css'
import { useNavigate } from 'react-router-dom'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { FirebaseAuth, FirebaseFirestore } from '../../FIrebase/Configueration'
import { collection, getDocs, query, where } from 'firebase/firestore'

function Login() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()

    const loginUser = async () => {

        try {

            signInWithEmailAndPassword(FirebaseAuth, email, password)
            .catch((error) => alert(error.message))

            const user_ref = collection(FirebaseFirestore, 'Users')  // Selects the collection
            const condition = where('email', '==', email) // Providing the condition for selecting the user
            const selected_user = query(user_ref, condition) // Selects the user from the total collection

            await getDocs(selected_user).then((user_data) => {

                user_data.forEach(doc => {

                    console.log( doc.data() )

                    if ( doc.data().user_type === 'Seeker' ) navigate('/seekerhome')
                    else if ( doc.data().user_type === 'Employer' ) navigate('/employerhome')

                })

            })

        } catch (error) { alert(error.message); }

    }

    return (

        <div id="content">

            <div className='container'>

                <h2>Login</h2>
                <p className='item'>Registerd Email</p>
                <input type="email" placeholder='Enter your Email' value={email} onChange={

                    (event) => setEmail(event.target.value)

                } />

                <p className='item'>Password</p>
                <input type="text" placeholder='Password' value={password} onChange={

                    (event) => setPassword(event.target.value)

                } />

                <p id='forget'>Forgot Password?</p>

                <hr />

                <button id='log' onClick={() => {

                    loginUser()

                }} >Login</button>
                <p id='alre'>Aleady have a account ?</p>
                <button id='reg' onClick={() => { navigate('/signup') }} >Register</button>

            </div>

        </div>
    )
}

export default Login