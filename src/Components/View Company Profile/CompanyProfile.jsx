import React, { useEffect, useState } from 'react'
import './CompanyProfile.css'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { FirebaseFirestore } from '../../FIrebase/Configueration'

function CompanyProfile() {

    const [userData, setUserData] = useState([])


    const getUserData = async () => {

        try {

            const localStorageData = localStorage.getItem('companyProfile')
            if (localStorageData) {

                const companyEmail = JSON.parse(localStorageData)

                const ref = collection(FirebaseFirestore, 'Users')
                const condition = where('email', '==', companyEmail)
                const selectedUser = query(ref, condition)

                const userDetails = await getDocs(selectedUser)
                userDetails.forEach(doc => { setUserData(doc.data()) })

            }

        } catch (error) { console.log(error.message) }

    }

    useEffect(() => {

        getUserData()

    }, [])

    return (

        <div id='main-company'>

            <div id="company-container">

                <section id="company-upper-container">

                    <section id="company-photo">

                        <div>

                            <img src={userData.profile_picture} alt="company-DP" className='company-dp' />

                        </div>

                    </section>
                    <section id="company-details">

                        <section id='company-section-username'>

                            <p id="company-profile-name">{userData.username}</p>

                        </section>
                        <div id='company-details-content'>

                            <section id='company-upper-details-content'>

                                <div>

                                    <p className="heading">Email</p>
                                    <p className="sub-heading">{userData.email}</p>

                                </div>
                                <div>

                                    <p className="heading">Contact Person</p>
                                    <p className="sub-heading">{userData.contact_person}</p>

                                </div>
                                <div>

                                    <p className="heading">Contact number</p>
                                    <p className="sub-heading">{userData.phone_number}</p>

                                </div>

                            </section>
                            <section id='company-lower-details-content'>

                                <div style={{ width: '305px' }}>

                                    <p className="heading">Location</p>
                                    <p className="sub-heading">{userData.location}</p>

                                </div>

                                <div>

                                    <p className='heading'>Website</p>
                                    <a href={'https://' + userData.website}
                                        rel='noreferrer' target='_blank'>
                                        <p className="sub-heading" style={{ cursor: 'pointer' }}>
                                            {<><i className='bx bx-link'></i> {userData.website}</>}</p>
                                    </a>

                                </div>

                            </section>

                        </div>

                    </section>

                </section>
                <section id="company-middle-container">

                    <p className="heading">Profile summary</p>
                    <div id="company-summary">

                        <p className='sub-heading'>{userData.summary}</p>

                    </div>

                </section>
                <section id="company-lower-container">

                    <div id="company-working-domains">

                        <p className="heading">Working domains</p>

                        {

                            userData.workingDomains && userData.workingDomains.map((objects, index) => (

                                <div className="company-objects" key={index}>

                                    <p>{objects.text}</p>

                                </div>

                            ))

                        }

                    </div>

                </section>

            </div>

        </div>

    )

}

export default CompanyProfile