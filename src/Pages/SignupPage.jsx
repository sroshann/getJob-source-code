import React, { useState } from 'react'
import SeekerSignup from '../Components/SeekerSignup/SeekerSignup'
import EmployerSignup from '../Components/EmployerSignup/EmployerSignup'
import './SignupPage.css'

function SignupPage() {

  const [seeker, setSeeker] = useState(true)
  const [employer, setEmployer] = useState(false)

  return (
    <div id='bdy'>

      <div id="button-div">

        <div id="seeker">

          <button onClick={() => {

            setSeeker(true)
            setEmployer(false)

          }} >Register as job seeker</button>

        </div>

        <div id="employer">

          <button onClick={() => {

            setEmployer(true)
            setSeeker(false)

          }} >Register as employer</button>

        </div>

      </div>

      <div>

        {seeker && <SeekerSignup />}
        {employer && <EmployerSignup />}

      </div>

    </div>
  )
}

export default SignupPage