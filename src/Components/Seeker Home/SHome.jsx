import React, { useEffect, useState } from 'react'
import './SHome.css'
import toast, { Toaster } from 'react-hot-toast'
import { collection, getDocs, query, updateDoc, where } from 'firebase/firestore'
import { FirebaseFirestore } from '../../FIrebase/Configueration'
import { useNavigate } from 'react-router-dom'

function SHome() {

    const [saveArray, setSaveArray] = useState([])
    const [jobs, setJobs] = useState([])

    const navigate = useNavigate()

    const saveJob = async ( object) => {

        const index = saveArray.findIndex(value => value.jobID === object.jobID)
        let uploadArray = [] // Inorder to solve asynchronous nature, we cannot access state directly 
        // without the actual completion of the function. So this array is created to store the updations in saveArray
        // which is a state.

        if (index !== -1) {

            const newArray = [...saveArray]
            newArray.splice(index, 1)
            // the first parameter of splice is index of element and the 
            // second is how many elements to remove from the provided index
            setSaveArray(newArray)
            uploadArray = [...newArray]
            toast.error('Job removed from saved collections', { style: { fontSize: '14px' } })

        } else {

            setSaveArray([...saveArray, object])
            uploadArray = [...saveArray, object]
            toast.success('Job saved', { style: { fontSize: '14px' } })

        }

        // The saved job array is going to upload into user details 

        try {

            const email = localStorageEmail()
            const ref = collection(FirebaseFirestore, 'Users')
            const condition = where('email', '==', email)
            const selectedUser = query(ref, condition)

            await getDocs(selectedUser).then(async (userDocument) => {

                const userRef = userDocument.docs[0].ref
                await updateDoc(userRef, { savedJobs: uploadArray })

            })

        } catch (error) { console.log(error) }

    }

    const getJobData = async () => {

        const ref = collection(FirebaseFirestore, 'Jobs')
        const jobData = await getDocs(ref)
        const allJobs = jobData.docs.map(values => ({

            ...values.data()

        }))
        setJobs(allJobs)

    }

    const localStorageEmail = () => { // Inorder to get user data

        const localStorageData = localStorage.getItem('userData')
        if (localStorageData) {

            const parseToJSON = JSON.parse(localStorageData)
            return parseToJSON.email

        }
        
    }

    const userAlreadySaved = async () => { //Inorder to get already saved jobs in database to show in saved jobs

        const email = localStorageEmail()
        const ref = collection(FirebaseFirestore, 'Users')
        const condition = where('email', '==', email)
        const selectedUser = query(ref, condition)

        const userData = await getDocs( selectedUser )
        userData.forEach( doc => { setSaveArray( doc.data().savedJobs ) } )

    }

    const pageView = ( ID ) => {

        localStorage.setItem('jobID', JSON.stringify( ID ))
        navigate('/view')

    }

    useEffect(() => {

        getJobData()
        userAlreadySaved ()

        //   return () => {
        //     second
        //   }

    }, [])


    return (

        <div id='home-root'>

            <section id='searching-area'>

                <div>

                    <input type="text" id='input-search' placeholder='Find your job' />
                    <i class='bx bx-search search-icon'  ></i>

                </div>

            </section>
            <section id='main-contents' >

                <section id="category">

                    <div id='catgory-listing'>

                        <section>

                            <div>

                                <i class='bx bx-shopping-bag'></i>
                                <p>Sales</p>

                            </div>
                            <div>

                                <i class='bx bx-package'></i>
                                <p>Supply Chain</p>

                            </div>
                            <div>

                                <i class='bx bx-home-alt'></i>
                                <p>Remote</p>

                            </div>
                            <div>

                                <i class='bx bx-buildings'></i>
                                <p>MNC</p>

                            </div>
                            <div>

                                <i class='bx bx-line-chart' ></i>
                                <p>Marketing</p>

                            </div>
                            <div>

                                <i class='bx bx-group'></i>
                                <p>HR</p>

                            </div>
                            <div>

                                <i class='bx bx-rocket'></i>
                                <p>Startup</p>

                            </div>
                            <div>

                                <i class='bx bx-cog'></i>
                                <p>Engineering</p>

                            </div>
                            <div>

                                <i class='bx bx-package'></i>
                                <p>Other</p>

                            </div>

                        </section>

                    </div>

                </section>
                <section id='jobs'>

                    <div id="job-listing">

                        {

                            jobs.length === 0 ? <div id="no-jobs"> <p>No jobs were found</p> </div>

                                :
                                jobs.map((objects, index) => (

                                    <div className="job-objects" key={index} onClick={ ()=> pageView( objects.jobID ) } >

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
                                                <div onClick={( event ) => { 
                                                    
                                                    saveJob(objects) 
                                                    event.stopPropagation()
                                                    
                                                }}>

                                                    {saveArray.some(saved => saved.jobID === objects.jobID) ?
                                                        <i className='bx bxs-bookmark grey' ></i> :
                                                        <i className='bx bx-bookmark grey'></i>}
                                                    <p className='grey'>
                                                        {saveArray.some(saved => saved.jobID === objects.jobID) ? 'Saved' : 'Save'}
                                                    </p>

                                                    {/* .some check the provided condition is exist atleast one time in that array */}

                                                </div>

                                            </div>

                                        </section>

                                    </div>

                                ))

                        }

                    </div>

                </section>

            </section>

            <Toaster />

        </div>

    )

}

export default SHome