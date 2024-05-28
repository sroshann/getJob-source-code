import React from 'react'
import './SHome.css'

function Listing( props ) {

    const { objects , index , saveJob , saveArray , pageView } = props

    return (

        <div>

            <div className="SHome-job-objects" key={index} onClick={() => pageView(objects.jobID)} >

                <section>

                    <div id='job-company-detail'>

                        <p id='SHome-job-title'>{objects.jobTitle}</p>
                        <p id='SHome-company-name'>{objects.companyName}</p>

                    </div>
                    <div id="other-details">

                        <div id="experience">

                            <i className='bx bx-briefcase-alt grey'></i>
                            <p className='SHome-grey'>{objects.experience}</p>

                        </div>
                        <p className="grey">|</p>
                        <div id="salary">

                            <i className='bx bx-rupee grey' ></i>
                            <p className='SHome-grey'>{objects.salary ? objects.salary : 'Not desclosed'}</p>

                        </div>
                        <p className="grey">|</p>
                        <div id="location">

                            <i className='bx bx-map grey'></i>
                            <p className='SHome-grey'>{objects.location}</p>

                        </div>

                    </div>
                    <div id="job-skills">

                        {

                            objects.skillsRequired.map((skillObj, index) => (

                                <div key={index}>

                                    {index === 0 ? <></> : <i className='bx bx-wifi-0 grey'></i>}
                                    <p className='SHome-grey'>{skillObj.text}</p>

                                </div>

                            ))

                        }

                    </div>
                    <div id="date-save">

                        <p className='SHome-grey' style={{ fontSize: '12px' }}>{objects.postedOn}</p>
                        <div onClick={(event) => {

                            saveJob(objects)
                            event.stopPropagation()

                        }}>

                            {saveArray && saveArray.some(saved => saved.jobID === objects.jobID) ?
                                <i className='bx bxs-bookmark SHome-grey' ></i> :
                                <i className='bx bx-bookmark SHome-grey'></i>}
                            <p className='SHome-grey'>
                                {saveArray && saveArray.some(saved => saved.jobID === objects.jobID) ? 'Saved' : 'Save'}
                            </p>

                            {/* .some check the provided condition is exist atleast one time in that array */}

                        </div>

                    </div>

                </section>

            </div>

        </div>

    )

}

export default Listing