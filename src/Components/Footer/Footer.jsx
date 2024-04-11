import React from 'react'
import './Footer.css'

function Footer() {

  return (

    <div id='footer'>
        
        <div className="name-copy">
            <h1>get<span id='job'>Job</span></h1>
            <p>© 2024 getJob. All Right Reserved.</p>
        </div>

        <div className="links">
            <i class='bx bxl-instagram'></i>
            <i class='bx bxl-meta'></i>
            <i class='bx bxl-github'></i>
            <i class='bx bxl-linkedin'></i>
        </div>

    </div>
  )

}

export default Footer