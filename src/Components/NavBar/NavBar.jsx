import React from 'react'
import './NavBar.css'

function NavBar() {

  return (
    <div id='header'>

        <div id="logo">

            <p><span id='get'>get</span><span id='job'>JOB</span></p>

        </div>
        <div id="menu">

            <ul>

                <li>Home</li>
                <li>About Us</li>
                <li>Companies</li>
                <li>FAQ</li>

            </ul>

        </div>
        <div id="buttons">

            <div id='options'>

                <button id='login'>Login</button>
                <button id='sign'>Sign Up</button>
                <button id='post' >Post a job</button>

            </div>

        </div>

    </div>
  )

}

export default NavBar