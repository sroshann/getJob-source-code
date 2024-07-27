import React, { useEffect, useState } from 'react'
import './Applicants.css'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { FirebaseFirestore } from '../../FIrebase/Configueration'
import { useNavigate } from 'react-router-dom'
import ApplicantShimmer from '../Applicant Shimmer/ApplicantShimmer'

function Applicants() {

    const [applicants, setApplicants] = useState([])
    const [shimmer, setShimmer] = useState(false)

    const navigate = useNavigate()

    const getApplicants = async () => {

        setShimmer(true)

        const jobID = localStorage.getItem('jobID')
        if (jobID) {

            const parse = JSON.parse(jobID)

            const ref = collection(FirebaseFirestore, 'Jobs')
            const condition = where('jobID', '==', parse)
            const selectedJob = query(ref, condition)

            const userData = await getDocs(selectedJob)
            userData.forEach(doc => { setApplicants(doc.data().appliedSeekers) })

        }

        setShimmer(false)

    }

    const viewProfile = (email) => {

        localStorage.setItem('applicantMail', JSON.stringify(email))
        navigate('/applicant-profile')

    }

    useEffect(() => {

        getApplicants()

    }, [])


    return (

        <div id='applicants-main'>


            <section id="applicants-listing">

                {

                    shimmer ? <ApplicantShimmer /> :
                    applicants.length === 0 ? <p>Currently no one applied</p> :

                        applicants.map((objects, index) => (

                            <div id="objects" key={index} onClick={() => viewProfile(objects.email)}>

                                <div id="applicant-image">

                                    <img src={objects.dp} alt="Profile" />

                                </div>
                                <div id="applicant-texts">

                                    <p id='applicant-name'>{objects.name}</p>
                                    <p className='txt'>{objects.phoneNumber}</p>
                                    <p className='txt txt-email'>{objects.email}</p>
                                    <div id="resume">

                                        <button><a rel='noreferrer' target='_blank' href={objects.resume} onClick={

                                            (event) => event.stopPropagation()

                                        }>Resume</a></button>

                                    </div>

                                    <p className='go-to-profile'>Click to view complete profile</p>

                                </div>

                            </div>

                        ))

                }

            </section>

        </div>

    )

}

export default Applicants