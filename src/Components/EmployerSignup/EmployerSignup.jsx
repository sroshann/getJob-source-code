import React, { useState } from 'react'
import './EmployerSignup.css'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { FirebaseAuth, FirebaseFirestore } from '../../FIrebase/Configueration'
import { addDoc, collection } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'

function EmployerSignup() {

  const [ company_name , setCompanyName ] = useState('')
  const [ email , setEmail ] = useState('')
  const [ contact_person , setContactPerson ] = useState('')
  const [ phone_number , setPhoneNumber ] = useState('')
  const [ password , setPassword ] = useState('')
  let [ radio , setRadio ] = useState('')

  // These states are used to store data from input boxes

  const navigate = useNavigate()

  const createUser = async ( event ) => { // This function is to create an user with firebase

    event.preventDefault()

    try {

      if ( company_name === '' || email === '' || contact_person === '' || phone_number === '' || password === '' ) return alert ('Please complete the form')
      else {
        
        const result = await createUserWithEmailAndPassword( FirebaseAuth , email , password )
        await updateProfile( result.user , { displayName : company_name } )
        alert ('You are signed in successfully')

        setCompanyName('')
        setContactPerson('')
        setEmail('')
        setPassword('')
        setPhoneNumber('')

        // These codes are used to create an user

        await addDoc( collection( FirebaseFirestore , 'Users' ) , { // This code is used to store the remaining details of an user in database

          id : result.user.uid,
          username : company_name,
          email : email,
          contact_person : contact_person,
          phone_number : phone_number,
          password : password,
          user_type : radio

        } ).then( () => { navigate('/login') } )
        
      }

    } catch ( error ) { alert( error.message ) }

  }


  return (

    <div id='seeker-content'>

      <div id="seeker-div">

        <p id='as-employer'>Register as Employer</p>
        <form id="seeker-frm" onSubmit={ createUser }>

          <p className='seeker-labels' >Company Name</p>
          <input type="text" name="" className='inputs' placeholder="Enter Company name" value={ company_name } onChange={

            ( event ) => setCompanyName( event.target.value )

          } />

          <p className='seeker-labels' >Email address</p>
          <input type="email" name="" className='inputs' placeholder="Enter email address" value={ email } onChange={

            ( event ) => setEmail( event.target.value )

          } />

          <p className='seeker-labels' >Contact Person</p>
          <input type="text" name="" className='inputs' placeholder="Enter contact person name" value={ contact_person } onChange={

            ( event ) => setContactPerson( event.target.value )

          } />

          <p className='seeker-labels' >Contact Number</p>
          <input type="number" name="" className='inputs' placeholder="Enter contact number" value={ phone_number } onChange={

            ( event ) => setPhoneNumber( event.target.value )

          } />

          <div id='seeker-frm-subdiv'>

            <div>

              <p id='seeker-labels-password' >Password</p>
              <input type="password" name="" className='seeker-inputs-half' placeholder="Create a strong password" value={ password } onChange={

                ( event ) => setPassword( event.target.value )

              } />

            </div>

            <div>

              <input type="radio" checked = { radio = 'Employer' } value={ radio } onChange={ ( event ) => setRadio( event.target.value ) } />
              <p id='radio'>Employer</p>

            </div>

          </div>

          <p id='seeker-accepting'>By clicking Sign Up you agree to the <span className='color'>Terms and Conditions</span> & <span className='color'>Privacy Policies</span> of getJOB</p>

          <button className='seeker-sign-btn'>Sign Up</button>

        </form>

      </div>

    </div>

  )

}

export default EmployerSignup