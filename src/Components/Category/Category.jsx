import React from 'react'
import './Category.css'

function Category() {

    return (

        <div id='categories'>

            <div className="top">

                <div className="remote">

                    <i className='bx bx-home-alt'></i>
                    <p>Remote</p>
                    <i className='bx bx-chevron-right' style={{marginTop:'3px'}}></i>

                </div>
                <div className="remote">

                    <i className='bx bx-buildings'></i>
                    <p>MNC</p>
                    <i className='bx bx-chevron-right' style={{marginTop:"3px"}}></i>

                </div>
                <div className="remote">

                    <i className='bx bx-shopping-bag'></i>
                    <p>Sales</p>
                    <i className='bx bx-chevron-right' style={{marginTop:"3px"}}></i>

                </div>
                <div className="remote">

                    <i className='bx bx-line-chart' ></i>
                    <p>Marketing</p>
                    <i className='bx bx-chevron-right' style={{marginTop:"3px"}}></i>

                </div>

            </div>
            <div className="bottom">

                <div className="remote">

                    <i className='bx bx-group'></i>
                    <p>HR</p>
                    <i className='bx bx-chevron-right' style={{marginTop:"3px"}}></i>

                </div>
                <div className="remote">

                    <i className='bx bx-rocket'></i>
                    <p>Startup</p>
                    <i className='bx bx-chevron-right' style={{marginTop:"3px"}}></i>

                </div>
                <div className="remote">

                    <i className='bx bx-cog'></i>
                    <p>Engineering</p>
                    <i className='bx bx-chevron-right' style={{marginTop:"3px"}}></i>

                </div>
                <div className="remote">

                    <i className='bx bx-package'></i>
                    <p>Supply Chain</p>
                    <i className='bx bx-chevron-right' style={{marginTop:"3px"}}></i>

                </div>

            </div>

        </div>

    )

}

export default Category