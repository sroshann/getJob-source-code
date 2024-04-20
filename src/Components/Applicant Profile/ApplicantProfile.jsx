import React, { useEffect, useState } from 'react'
import './ApplicantProfile.css'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { FirebaseFirestore } from '../../FIrebase/Configueration'

function ApplicantProfile() {

    const [user, setUser] = useState([])

    const getUserData = async () => {

        const localStorageData = localStorage.getItem('applicantMail')
        if (localStorageData) {

            const parse = JSON.parse(localStorageData)

            const ref = collection(FirebaseFirestore, 'Users')
            const condition = where('email', '==', parse)
            const selectedUser = query(ref, condition)

            const userData = await getDocs(selectedUser)
            userData.forEach(doc => {

                setUser(doc.data())

            })

        }

    }

    useEffect(() => {

        getUserData()

    }, [])

    return (

        <div id='root-body'>

            <div id="containers">

                <div id="top-container">

                    <div id="photo">

                        <div>

                            {

                                user.profile_picture ? <img src={user.profile_picture}
                                    className='dp' alt="DP" /> :
                                    <i className='bx bxs-user-circle profile-photo' ></i>

                            }
                            <p id='name' >{user.username}</p>

                        </div>

                    </div>
                    <div id="details">

                        <div id='details-upper'>

                            <div>

                                <section>

                                    <p className='heading'>Phone</p>
                                    <p className='sub-heading'>{user.phone_number}</p>

                                </section>
                                <section>

                                    <p className='heading'>Location</p>
                                    <p className='sub-heading' style={user.location ? {} : { color: 'grey' }}>
                                        {user.location ? user.location : 'Add your location'}</p>


                                </section>
                                <section>

                                    <p className='heading'>Age</p>
                                    <p className='sub-heading' style={user.age ? {} : { color: 'grey' }}>
                                        {user.age ? user.age : 'Add your age'}</p>


                                </section>

                            </div>
                            <div>

                                <section>

                                    <p className='heading'>Experience</p>
                                    <p className='sub-heading' style={user.experience ? {} : { color: 'grey' }}>
                                        {user.experience ? user.experience : 'Add your experience'}</p>


                                </section>
                                <section id='margin-left'>

                                    <p className='heading'>Email</p>
                                    <p className='sub-heading'>{user.email}</p>

                                </section>

                            </div>

                        </div>

                    </div>

                </div>

                <div id="profile-summary">

                    <p className="heading">Profile summary</p>
                    <div className="summary">

                        <p className='sub-heading'> {user.summary} </p>

                    </div>

                </div>

                <div id="down-container">

                    <div id="educational-qualifications">

                        <p className="heading">Educational qualifications</p>
                        {

                            (user.educational_qualification !== undefined &&
                                user.educational_qualification.length > 0) &&

                            user.educational_qualification.map((objects, index) => (

                                <div className='objects' key={index}>
                                    <div>
                                        <p>{objects.text}</p>
                                        <p>{objects.institution}</p>
                                    </div>
                                </div>

                            ))

                        }

                    </div>

                    <hr className="yellow" />

                    <div id="skills">

                        <p className="heading">Skills</p>
                        {

                            (user.skills !== undefined && user.skills.length > 0) &&

                            user.skills.map((objects, index) => (

                                <div className='objects' key={index}>
                                    <p >{objects.text}</p>
                                </div>

                            ))

                        }

                    </div>

                    <hr className="yellow" />

                    <div id="certificates">

                        <p className="heading">Certificates</p>
                        <div id="certificate_listings">
                            {

                                (user.certificates !== undefined && user.certificates.length > 0) &&

                                user.certificates.map((objects, index) => (

                                    <div className='objects' key={index}>

                                        <button className='certificate-listing-btn' onClick={() => {

                                            window.open(objects.url, '_blank')

                                        }} >{objects.text}</button>

                                    </div>

                                ))

                            }
                        </div>

                    </div>

                    <hr className="yellow" />

                    <div id="projects">

                        <p className="heading">Projects</p>
                        {

                            (user.projects !== undefined && user.projects.length > 0) &&

                            user.projects.map((objects, index) => (

                                <div className='objects' key={index}>
                                    <div>
                                        <p>{objects.text}</p>
                                        <p style={{ wordBreak: 'break-all' }}>{objects.description}</p>
                                        <a rel='noreferrer' target='_blank' href={'https://' + objects.hosted_url}>
                                            <p style={{ color: 'grey', cursor: 'pointer' }}>{objects.hosted_url}</p>
                                        </a>
                                    </div>
                                </div>

                            ))
                        }

                    </div>

                    <hr className="yellow" />

                    <div id="languages">

                        <p className="heading">Languages known</p>
                        {

                            (user.languages_known !== undefined && user.languages_known.length > 0) &&

                                user.languages_known.map((objects, index) => (

                                    <div className='objects' key={index}>
                                        <p>{objects.text}</p>
                                    </div>

                                ))

                        }

                    </div>

                    <hr className="yellow" />

                    <div id="attatchments">

                        <p className="heading">Attatchments</p>
                        <button id='attatchment-btns' >
                            <a rel='noreferrer' target='_blank' href={user.url}>Resume</a>
                        </button>

                    </div>

                </div>

            </div>

        </div>

    )

}

export default ApplicantProfile