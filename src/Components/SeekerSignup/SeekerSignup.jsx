import React, { useState } from 'react'
import './SeekerSignup.css'
import verified from '../../Images/verified.webp'
import signupImage from '../../Images/signupimage.png'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { FirebaseAuth, FirebaseFirestore, FirebaseStorage } from '../../FIrebase/Configueration'
import { addDoc, collection } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import toast, { Toaster } from 'react-hot-toast';

function SeekerSignup() {

  const [ full_name , setFullName ] = useState('')
  const [ email , setEmail ] = useState('')
  const [ phone_number , setPhoneNumber ] = useState('')
  const [ password , setPassword ] = useState('')
  let [ radio , setRadio ] = useState('')
  const [ resume , setResume ] = useState()

  // These states are used to store the data from each input boxes

  const navigate = useNavigate()

  const createUser = async ( event ) => { // This function is to create an user with firebase

    event.preventDefault()

    try{

      if( email === '' || password === '' || full_name === '' || phone_number === '' ) return toast.error('Please complete the form')
      else {


        const resumeRef = ref( FirebaseStorage , `Resumes/${ resume.name }` )
        uploadBytes( resumeRef , resume ).then( ( response ) => {

          getDownloadURL( response.ref ).then( async ( url ) => {

            await addDoc( collection( FirebaseFirestore , 'Users' ) , { // This code is used to store the remaining details of an user in database

              id : result.user.uid,
              email : email,
              username : full_name,
              phone_number : phone_number,
              password : password,
              user_type : radio,
              url,
              savedJobs : [],
              appliedJobs : []
    
            } )

          } ).then( () => { 
            
            setResume( null )
            navigate('/login')
          
          } )

        } )

        // These codes are used to store resume file in firebse storage and store the remaining details of user in firebase firestore

        const result = await createUserWithEmailAndPassword( FirebaseAuth , email , password )
        await updateProfile( result.user , { displayName : full_name } )
        // alert ( 'You are signed in successfully' )
        toast.success('You are signed in successfully' , { style : { fontSize: '14px' } })
         
        setFullName('')
        setEmail('')
        setPassword('')
        setPhoneNumber('')

        
        // In these code the user is created
    
      }

    } catch ( error ) { toast.error( error.message , { style : { fontSize: '14px' } } ) }
  
  }

  return (

    <div id='seeker-signup'>

      <div id="left">

        <div id="left-content">

          <div id="image"><img src={ signupImage } alt="" /></div>
          <div id="texts">

            <p id='bold-p' >On registration, you can</p>
            <div className="acheivements">

              <p><img id='verified-img' src={verified} alt="" /> Build your profile and let recruiters finds you</p>

            </div>
            <div className="acheivements">

              <p><img id='verified-img' src={verified} alt="" /> Get job postings delivered right to your email</p>

            </div>
            <div className="acheivements">

              <p><img id='verified-img' src={verified} alt="" /> Find job and build your career</p>

            </div>

          </div>

        </div>

      </div>
      <div id="right">

        <div id="right-content">

          <p id='grow'>Let's grow your career</p>
          <form id="frm" onSubmit={ createUser }>

            <p className='labels' >Full Name</p>
            <input type="text" name="" className='inputs' placeholder="What's your name ?" value={ full_name } onChange={

              ( event ) => setFullName( event.target.value )

            } />

            <p className='labels' >Email ID</p>
            <input type="email" name="" className='inputs' placeholder="Tell us your Email ID" value={ email } onChange={

              ( event ) => setEmail( event.target.value )

            } />

            <p className='labels' >Mobile</p>
            <input type="number" name="" className='inputs' placeholder="Mobile number" value={ phone_number } onChange={

              ( event ) => setPhoneNumber( event.target.value )

            } />

            <p className='labels' >Password</p>
            <input type="password" name="" className='inputs' placeholder="Create a strong password" value={ password } onChange={

              ( event ) => setPassword( event.target.value )

            } />

            <div id='frm-subdiv'>

              <div>

                <p className='labels' >Resume</p>
                <input type="file" name="" className='inputs-half' placeholder="Upload resume" onChange={

                  (event) => { setResume(event.target.files[0]) }

                } />

              </div>

              <div>

                <input type="radio" checked = { radio = 'Seeker' } value={ radio } onChange={ ( event ) => setRadio( event.target.value ) } />
                <p id='radio'>Job seeker</p>

              </div>

            </div>

            <p id='accepting'>By clicking Sign Up you agree to the <span className='color'>Terms and Conditions</span> & <span className='color'>Privacy Policies</span> of getJOB</p>

            <button className='sign-btn'>Sign Up</button>

          </form>

        </div>

      </div>

      <Toaster />

    </div>

  )

}

export default SeekerSignup