import React, { useEffect, useState } from 'react'
import './Posted.css'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { FirebaseFirestore } from '../../FIrebase/Configueration'
import { useNavigate } from 'react-router-dom'

function Posted() {

    const [postedJobs, setPostedJobs] = useState([])

    const navigate = useNavigate()

    const getLocalEmail = () => {

        const localStorageData = localStorage.getItem('userData')
        if (localStorageData) {

            const parsedData = JSON.parse(localStorageData)
            return parsedData.email

        }

    }

    const getPostedJobs = async () => {

        const email = getLocalEmail()
        const ref = collection(FirebaseFirestore, 'Jobs')
        const condition = where('userEmail', '==', email)
        const selectedJobs = query(ref, condition)

        const jobData = await getDocs(selectedJobs)
        const allJobs = jobData.docs.map( values => ({

            ...values.data()

        }) )
        console.log( allJobs )
        setPostedJobs( allJobs )

    }

    const pageView = (ID) => {

        localStorage.setItem('jobID', JSON.stringify(ID))
        navigate('/view')

    }

    useEffect(() => {

        getPostedJobs()

    }, [])


    return (

        <div id='posted-main'>

            <section id='jobs-posted'>

                <div id="job-posted-listing">

                    {

                        postedJobs.length === 0 ? <div id="no-jobs"> <p>No jobs were found</p> </div>
                            :
                            postedJobs.map((objects, index) => (

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

                                        </div>

                                    </section>

                                </div>

                            ))

                    }

                </div>

            </section>

        </div>

    )

}

export default Posted