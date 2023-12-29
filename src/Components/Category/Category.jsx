import React from 'react'
import './Category.css'

function Category() {

    return (

        <div id='categories'>

            <div class="top">

                <div class="remote">

                    <i class='bx bx-home-alt'></i>
                    <p>Remote</p>
                    <i class='bx bx-chevron-right' style={{marginTop:'3px'}}></i>

                </div>
                <div class="remote">

                    <i class='bx bx-buildings'></i>
                    <p>MNC</p>
                    <i class='bx bx-chevron-right' style={{marginTop:"3px"}}></i>

                </div>
                <div class="remote">

                    <i class='bx bx-shopping-bag'></i>
                    <p>Sales</p>
                    <i class='bx bx-chevron-right' style={{marginTop:"3px"}}></i>

                </div>
                <div class="remote">

                    <i class='bx bx-line-chart' ></i>
                    <p>Marketing</p>
                    <i class='bx bx-chevron-right' style={{marginTop:"3px"}}></i>

                </div>

            </div>
            <div class="bottom">

                <div class="remote">

                    <i class='bx bx-group'></i>
                    <p>HR</p>
                    <i class='bx bx-chevron-right' style={{marginTop:"3px"}}></i>

                </div>
                <div class="remote">

                    <i class='bx bx-rocket'></i>
                    <p>Startup</p>
                    <i class='bx bx-chevron-right' style={{marginTop:"3px"}}></i>

                </div>
                <div class="remote">

                    <i class='bx bx-cog'></i>
                    <p>Engineering</p>
                    <i class='bx bx-chevron-right' style={{marginTop:"3px"}}></i>

                </div>
                <div class="remote">

                    <i class='bx bx-package'></i>
                    <p>Supply Chain</p>
                    <i class='bx bx-chevron-right' style={{marginTop:"3px"}}></i>

                </div>

            </div>

        </div>

    )

}

export default Category