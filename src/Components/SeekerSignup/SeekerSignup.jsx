import React from 'react'
import './SeekerSignup.css'
import verified from '../../Images/verified.webp'
import signupImage from '../../Images/signupimage.png'

function SeekerSignup() {

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
          <div id="frm">

            <p className='labels' >Full Name</p>
            <input type="text" name="" className='inputs' placeholder="What's your name ?" />
            <p className='labels' >Email ID</p>
            <input type="text" name="" className='inputs' placeholder="Tell us your Email ID" />
            <p className='labels' >Mobile</p>
            <input type="number" name="" className='inputs' placeholder="Mobile number" />
            <p className='labels' >Password</p>
            <input type="text" name="" className='inputs' placeholder="Create a strong password" />
            <div id='frm-subdiv'>

              <div>

                <p className='labels' >Resume</p>
                <input type="file" name="" className='inputs-half' placeholder="Upload resume" />

              </div>

              <div>

                <input type="radio" checked />
                <p id='radio'>Job seeker</p>

              </div>

            </div>

            <p id='accepting'>By clicking Sign Up you agree to the <span className='color'>Terms and Conditions</span> & <span className='color'>Privacy Policies</span> of getJOB</p>

            <button className='sign-btn'>Sign Up</button>

          </div>

        </div>

      </div>

    </div>

  )

}

export default SeekerSignup