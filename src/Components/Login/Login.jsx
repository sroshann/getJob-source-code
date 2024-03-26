import React, { useContext, useState } from 'react'
import './Login.css'
import { useNavigate } from 'react-router-dom'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { FirebaseAuth, FirebaseFirestore } from '../../FIrebase/Configueration'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { UDContext } from '../../Context/User_details'
import toast, { Toaster } from 'react-hot-toast'

function Login() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const { setUserDetails } = useContext(UDContext)
    const navigate = useNavigate()

    const loginUser = async () => {

        try {

            signInWithEmailAndPassword(FirebaseAuth, email, password).then(async () => {

                const user_ref = collection(FirebaseFirestore, 'Users')  // Selects the collection
                const condition = where('email', '==', email) // Providing the condition for selecting the user
                const selected_user = query(user_ref, condition) // Selects the user from the total collection

                await getDocs(selected_user).then((user_data) => {

                    user_data.forEach(doc => {

                        // console.log( doc.data() )
                        setUserDetails(doc.data())

                        // save user datas on local storage
                        localStorage.setItem('userData', JSON.stringify(doc.data()));
                        const storedUserData = localStorage.getItem('userData');

                        if (storedUserData) {
                            const local_storage_data = JSON.parse(storedUserData);
                            console.log( local_storage_data.user_type )
                            if (local_storage_data.user_type === 'Seeker') navigate('/seekerhome')
                            else if (local_storage_data.user_type === 'Employer') navigate('/employerhome')
                        }

                    })

                })

            })
                .catch(() => toast.error('Password or email is not matching', { style: { fontSize: '14px' } }))

        } catch (error) { toast.error(error.message) }

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

            <Toaster />

        </div>
    )
}

export default Login