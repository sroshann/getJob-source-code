import React from 'react'
import './SHome.css'

function Listing( props ) {

    const { objects , index , saveJob , saveArray , pageView } = props

    return (

        <div>

            <div className="job-objects" key={index} onClick={() => pageView(objects.jobID)} >

                <section>

                    <div id='job-company-detail'>

                        <p id='job-title'>{objects.jobTitle}</p>
                        <p id='company-name'>{objects.companyName}</p>

                    </div>
                    <div id="other-details">

                        <div id="experience">

                            <i className='bx bx-briefcase-alt grey'></i>
                            <p className='grey'>{objects.experience}</p>

                        </div>
                        <p className="grey">|</p>
                        <div id="salary">

                            <i className='bx bx-rupee grey' ></i>
                            <p className='grey'>{objects.salary ? objects.salary : 'Not desclosed'}</p>

                        </div>
                        <p className="grey">|</p>
                        <div id="location">

                            <i className='bx bx-map grey'></i>
                            <p className='grey'>{objects.location}</p>

                        </div>

                    </div>
                    <div id="job-skills">

                        {

                            objects.skillsRequired.map((skillObj, index) => (

                                <div key={index}>

                                    {index === 0 ? <></> : <i className='bx bx-wifi-0 grey'></i>}
                                    <p className='grey'>{skillObj.text}</p>

                                </div>

                            ))

                        }

                    </div>
                    <div id="date-save">

                        <p className='grey' style={{ fontSize: '12px' }}>{objects.postedOn}</p>
                        <div onClick={(event) => {

                            saveJob(objects)
                            event.stopPropagation()

                        }}>

                            {saveArray && saveArray.some(saved => saved.jobID === objects.jobID) ?
                                <i className='bx bxs-bookmark grey' ></i> :
                                <i className='bx bx-bookmark grey'></i>}
                            <p className='grey'>
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