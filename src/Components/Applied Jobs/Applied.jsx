import React, { useEffect, useState } from 'react'
import './Applied.css'
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
        // console.log( ID )
    
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

                                <div className="applied-job-objects" key={index} onClick={ () => pageView( objects.id ) } >

                                    <section>

                                        <div id='job-company-detail'>

                                            <p id='applied-job-title'>{objects.title}</p>
                                            <p id='applied-company-name'>{objects.company}</p>

                                        </div>
                                        <div id="other-details">

                                            <div id="experience">

                                                <i className='bx bx-briefcase-alt applied-grey'></i>
                                                <p className='applied-grey'>{objects.experience}</p>

                                            </div>
                                            <p className="applied-grey">|</p>
                                            <div id="salary">

                                                <i className='bx bx-rupee applied-grey' ></i>
                                                <p className='applied-grey'>{objects.salary ? objects.salary : 'Not desclosed'}</p>

                                            </div>
                                            <p className="applied-grey">|</p>
                                            <div id="location">

                                                <i className='bx bx-map applied-grey'></i>
                                                <p className='applied-grey'>{objects.location}</p>

                                            </div>

                                        </div>
                                        <div id="job-skills">

                                            {

                                                objects.skills.map((skillObj, index) => (

                                                    <div key={index}>

                                                        {index === 0 ? <></> : <i className='bx bx-wifi-0 applied-grey'></i>}
                                                        <p className='applied-grey'>{skillObj.text}</p>

                                                    </div>

                                                ))

                                            }



                                        </div>
                                        <div id="date-save">

                                            <p className='applied-grey' style={{ fontSize: '12px' }}>{objects.date}</p>

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

export default Applied