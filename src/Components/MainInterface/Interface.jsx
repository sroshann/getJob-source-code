import React from 'react'
import './Interface.css'

function Interface() {

  return (

    <div>

        <div id="bg_image"></div>
        <p id='build'>Build your dream</p>
        <p id='with_gj'>with get<span id='job'>JOB</span></p>
        <div id="search_box">

            <i class='bx bx-search'></i>
            <input type="text" name="" id="search" placeholder="find job"></input>
            <button>Search</button>

        </div>

    </div>

  )

}

export default Interface