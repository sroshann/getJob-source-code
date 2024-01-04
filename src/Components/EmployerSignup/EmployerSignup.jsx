import React from 'react'
import './EmployerSignup.css'

function EmployerSignup() {

  return (

    <div id='seeker-content'>

      <div id="seeker-div">

        <p id='as-employer'>Register as Employer</p>
        <div id="seeker-frm">

          <p className='seeker-labels' >Company Name</p>
          <input type="text" name="" className='inputs' placeholder="Enter Company name" />
          <p className='seeker-labels' >Email address</p>
          <input type="text" name="" className='inputs' placeholder="Enter email address" />
          <p className='seeker-labels' >Contact Person</p>
          <input type="number" name="" className='inputs' placeholder="Enter contact person name" />
          <p className='seeker-labels' >Contact Number</p>
          <input type="number" name="" className='inputs' placeholder="Enter contact number" />
          <div id='seeker-frm-subdiv'>

            <div>

              <p id='seeker-labels-password' >Password</p>
              <input type="text" name="" className='seeker-inputs-half' placeholder="Create a strong password" />

            </div>

            <div>

              <input type="radio" checked />
              <p id='radio'>Employer</p>

            </div>

          </div>

          <p id='seeker-accepting'>By clicking Sign Up you agree to the <span className='color'>Terms and Conditions</span> & <span className='color'>Privacy Policies</span> of getJOB</p>

          <button className='sign-btn'>Sign Up</button>

        </div>

      </div>

    </div>

  )

}

export default EmployerSignup