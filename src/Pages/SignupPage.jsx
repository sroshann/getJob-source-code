import React, { useState } from 'react'
import SeekerSignup from '../Components/SeekerSignup/SeekerSignup'
import EmployerSignup from '../Components/EmployerSignup/EmployerSignup'

function SignupPage() {

  const [ seeker , setSeeker ] = useState( true )
  const [ employer , setEmployer ] = useState( false )

  return (
    <div>

      <button onClick={ () => {

        setSeeker( true )
        setEmployer( false )

      } } >Register as job seeker</button>

      <button onClick={ () => {

        setEmployer( true )
        setSeeker( false )

      } } >Register as employer</button>

      { seeker && <SeekerSignup/> }
      { employer && <EmployerSignup/> }

    </div>
  )
}

export default SignupPage