import React, { useEffect, useState } from 'react'
import './Applied.css'
import toast, { Toaster } from 'react-hot-toast'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { FirebaseFirestore } from '../../FIrebase/Configueration'
import { useNavigate } from 'react-router-dom'

function Applied() {

    const [applied, setApplied] = useState([])

    const navigate = useNavigate()

    const getLocalEmail = () => {

        const localStorageData = localStorage.getItem('userData')
        if (localStorageData) {

            const parsedData = JSON.parse(localStorageData)
            return parsedData.email

        }

    }

    const getAppliedJobs = async () => {

        const email = getLocalEmail()
        const ref = collection(FirebaseFirestore, 'Users')
        const condition = where('email', '==', email)
        const selectedUser = query(ref, condition)

        const userData = await getDocs(selectedUser)
        userData.forEach(doc => { setApplied(doc.data().appliedJobs) })

    }

    const pageView = (ID) => {

        localStorage.setItem('jobID', JSON.stringify(ID))
        navigate('/view')
    
    }

    useEffect(() => {

        getAppliedJobs()

    }, [])


    return (

        <div id='applied-main'>

            <section id='jobs-applied'>

                <div id="job-applied-listing">

                    {

                        applied.length === 0 ? <div id="no-jobs"> <p>No jobs were found</p> </div>
                            :
                            applied.map((objects, index) => (

                                <div className="job-objects" key={index} onClick={ () => pageView( objects.jobID ) } >

                                    <section>

                                        <div id='job-company-detail'>

                                            <p id='job-title'>{objects.title}</p>
                                            <p id='company-name'>{objects.company}</p>

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

                                                objects.skills.map((skillObj, index) => (

                                                    <div key={index}>

                                                        {index === 0 ? <></> : <i className='bx bx-wifi-0 grey'></i>}
                                                        <p className='grey'>{skillObj.text}</p>

                                                    </div>

                                                ))

                                            }



                                        </div>
                                        <div id="date-save">

                                            <p className='grey' style={{ fontSize: '12px' }}>{objects.date}</p>

                                        </div>

                                    </section>

                                </div>

                            ))

                    }

                </div>

            </section>

            <Toaster />

        </div>

    )

}

export default Applied