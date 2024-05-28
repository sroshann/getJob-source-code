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

        <div className="container-radio">

          <div className="switches-container">

            <input type="radio" id="switchMonthly" name="switchPlan" value="Monthly" checked={ seeker ? 'checked' : '' } />
            <input type="radio" id="switchYearly" name="switchPlan" value="Yearly" />
            <label className='radio-switch' htmlFor="switchMonthly" onClick={() => {

              setSeeker(true)
              setEmployer(false)

            }}>Register as job seeker</label>
            <label className='radio-switch' htmlFor="switchYearly" onClick={() => {

              setEmployer(true)
              setSeeker(false)

            }}>Register as employer</label>

            <div className="switch-wrapper">

              <div className="switch">

                <div>Register as job seeker</div>
                <div>Register as employer</div>

              </div>

            </div>

          </div>

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