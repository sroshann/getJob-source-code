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

                const toastID = toast.loading('Loading')
                const user_ref = collection(FirebaseFirestore, 'Users')  // Selects the collection
                const condition = where('email', '==', email) // Providing the condition for selecting the user
                const selected_user = query(user_ref, condition) // Selects the user from the total collection

                await getDocs(selected_user).then((user_data) => {

                    user_data.forEach(doc => {

                        setUserDetails(doc.data()) // Storing datas into a context containing user details for further usage

                        const dataToStore = { // Create an object containing only the required data inorder to store into localstorage

                            email: doc.data().email,
                            user: doc.data().user_type,
                            resume: doc.data().url

                        }

                        toast.dismiss(toastID)
                        // save user datas on local storage
                        localStorage.setItem('userData', JSON.stringify(dataToStore));
                        const storedUserData = localStorage.getItem('userData');

                        if (storedUserData) {
                            const local_storage_data = JSON.parse(storedUserData);
                            if (local_storage_data.user === 'Seeker') navigate('/seekerhome')
                            else if (local_storage_data.user === 'Employer') navigate('/employerhome')
                        }

                    })

                })

            })
                .catch((error) => toast.error(error.message, { style: { fontSize: '13px' } }))

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
                <input type="password" placeholder='Password' value={password} onChange={

                    (event) => setPassword(event.target.value)

                } />

                <p id='forget'>Forgot Password?</p>

                <hr />

                <button id='log' onClick={() => {

                    loginUser()

                }} >Login</button>
                <p id='alre'>Don't have an account ?</p>
                <button id='reg' onClick={() => { navigate('/signup') }} >Register</button>

            </div>

            <Toaster />

        </div>
    )
}

export default Login