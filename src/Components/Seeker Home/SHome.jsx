import React, { useEffect, useState } from 'react'
import './SHome.css'
import toast, { Toaster } from 'react-hot-toast'
import { collection, getDocs, query, updateDoc, where } from 'firebase/firestore'
import { FirebaseFirestore } from '../../FIrebase/Configueration'
import { useNavigate } from 'react-router-dom'

function SHome() {

    const [saveArray, setSaveArray] = useState([])
    const [jobs, setJobs] = useState([])

    const [search, setSearch] = useState('')

    const [category, setCategory] = useState(false)
    const [addingId, setAddingId] = useState('')

    const [filteredJobs, setFilteredJobs] = useState([])

    const navigate = useNavigate()

    const saveJob = async (object) => {

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
        setFilteredJobs(allJobs)

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

        const userData = await getDocs(selectedUser)
        userData.forEach(doc => { setSaveArray(doc.data().savedJobs) })

    }

    const pageView = (ID) => {

        localStorage.setItem('jobID', JSON.stringify(ID))
        navigate('/view')

    }

    const searchJob = async (allJobs) => {

        console.log( allJobs )

        const searchedJobs = allJobs.filter(objects => {

            return objects.category.toLowerCase().includes(search.toLowerCase()) ||
                objects.jobTitle.toLowerCase().includes(search.toLowerCase()) ||
                objects.location.toLowerCase().includes(search.toLowerCase()) ||
                objects.qualification.toLowerCase().includes(search.toLowerCase())

        })

        if (searchedJobs.length === 0) toast.error('No jobs were found', { style: { fontSize: '14px' } })
        else setFilteredJobs(searchedJobs)

    }

    const categoriesListing = async (category, allJobs) => {

        const categorisedJobs = allJobs.filter(objects => objects.category.includes(category))
        if (categorisedJobs.length === 0) toast.error('No jobs were found', { style: { fontSize: '14px' } })
        else {

            setCategory(true)
            setFilteredJobs(categorisedJobs)

        }
        setAddingId(category)

    }

    useEffect(() => {

        getJobData()
        userAlreadySaved()

    }, [])


    return (

        <div id='home-root'>

            <section id='searching-area'>

                <div style={search ? { paddingRight: '6px' } : {}}>

                    <input type="text" id='input-search' placeholder='Find your job'
                        value={search}
                        onChange={(event) => setSearch(event.target.value)} />
                    {search && <i className='bx bx-x' style={{ cursor: 'pointer' }} onClick={() => {

                        setSearch('')
                        setFilteredJobs(jobs)

                    }}></i>}
                    <i className='bx bx-search search-icon' onClick={() => searchJob(jobs)} ></i>

                </div>

            </section>
            <section id='SHome-main-contents' >

                <section id="category">

                    <div id='catgory-listing'>

                        <section>

                            <div onClick={() => categoriesListing('Medical', jobs)}
                                className='category-object'
                                id={(addingId === 'Medical' && category) ? 'selected-category' : ''}>

                                <i class='bx bx-clinic'></i>
                                <p>Medical</p>
                                {
                                    (addingId === 'Medical' && category) && <i className='bx bx-x' id='x-hover'
                                        style={{ cursor: 'pointer' }}
                                        onClick={(event) => {

                                            event.stopPropagation()
                                            setAddingId('')
                                            setCategory(false)
                                            setFilteredJobs(jobs)

                                        }}></i>
                                }

                            </div>
                            <div onClick={() => categoriesListing('Education', jobs)}
                                className='category-object'
                                id={(addingId === 'Education' && category) ? 'selected-category' : ''}>

                                <i class='bx bxs-graduation'></i>
                                <p>Education</p>
                                {
                                    (addingId === 'Education' && category) && <i className='bx bx-x' id='x-hover'
                                        style={{ cursor: 'pointer' }}
                                        onClick={(event) => {

                                            event.stopPropagation()
                                            setAddingId('')
                                            setCategory(false)
                                            setFilteredJobs(jobs)

                                        }}></i>
                                }

                            </div>
                            <div onClick={() => categoriesListing('Engineering', jobs)}
                                className='category-object'
                                id={(addingId === 'Engineering' && category) ? 'selected-category' : ''}>

                                <i class='bx bx-cog'></i>
                                <p>Engineering</p>
                                {
                                    (addingId === 'Engineering' && category) && <i className='bx bx-x' id='x-hover'
                                        style={{ cursor: 'pointer' }}
                                        onClick={(event) => {

                                            event.stopPropagation()
                                            setAddingId('')
                                            setCategory(false)
                                            setFilteredJobs(jobs)

                                        }}></i>
                                }

                            </div>
                            <div onClick={() => categoriesListing('Hospitality', jobs)}
                                className='category-object'
                                id={(addingId === 'Hospitality' && category) ? 'selected-category' : ''}>

                                <i class='bx bx-restaurant'></i>
                                <p>Hospitality</p>
                                {
                                    (addingId === 'Hospitality' && category) && <i className='bx bx-x' id='x-hover'
                                        style={{ cursor: 'pointer' }}
                                        onClick={(event) => {

                                            event.stopPropagation()
                                            setAddingId('')
                                            setCategory(false)
                                            setFilteredJobs(jobs)

                                        }}></i>
                                }

                            </div>
                            <div onClick={() => categoriesListing('Finance', jobs)}
                                className='category-object'
                                id={(addingId === 'Finance' && category) ? 'selected-category' : ''}>

                                <i class='bx bx-wallet'></i>
                                <p>Finance</p>
                                {
                                    (addingId === 'Finance' && category) && <i className='bx bx-x' id='x-hover'
                                        style={{ cursor: 'pointer' }}
                                        onClick={(event) => {

                                            event.stopPropagation()
                                            setAddingId('')
                                            setCategory(false)
                                            setFilteredJobs(jobs)

                                        }}></i>
                                }

                            </div>
                            <div onClick={() => categoriesListing('Designing', jobs)}
                                className='category-object'
                                id={(addingId === 'Designing' && category) ? 'selected-category' : ''}>

                                <i class='bx bx-palette'></i>
                                <p>Designing</p>
                                {
                                    (addingId === 'Designing' && category) && <i className='bx bx-x' id='x-hover'
                                        style={{ cursor: 'pointer' }}
                                        onClick={(event) => {

                                            event.stopPropagation()
                                            setAddingId('')
                                            setCategory(false)
                                            setFilteredJobs(jobs)

                                        }}></i>
                                }

                            </div>
                            <div onClick={() => categoriesListing('Sales', jobs)}
                                className='category-object'
                                id={(addingId === 'Sales' && category) ? 'selected-category' : ''}>

                                <i class='bx bx-shopping-bag'></i>
                                <p>Sales</p>
                                {
                                    (addingId === 'Sales' && category) && <i className='bx bx-x' id='x-hover'
                                        style={{ cursor: 'pointer' }}
                                        onClick={(event) => {

                                            event.stopPropagation()
                                            setAddingId('')
                                            setCategory(false)
                                            setFilteredJobs(jobs)

                                        }}></i>
                                }

                            </div>
                            <div onClick={() => categoriesListing('Automotive', jobs)}
                                className='category-object'
                                id={(addingId === 'Automotive' && category) ? 'selected-category' : ''}>

                                <i class='bx bxs-car-mechanic' ></i>
                                <p>Automotive</p>
                                {
                                    (addingId === 'Automotive' && category) && <i className='bx bx-x' id='x-hover'
                                        style={{ cursor: 'pointer' }}
                                        onClick={(event) => {

                                            event.stopPropagation()
                                            setAddingId('')
                                            setCategory(false)
                                            setFilteredJobs(jobs)

                                        }}></i>
                                }

                            </div>
                            <div onClick={() => categoriesListing('Fashion', jobs)}
                                className='category-object'
                                id={(addingId === 'Fashion' && category) ? 'selected-category' : ''}>

                                <i class='bx bx-closet'></i>
                                <p>Fashion</p>
                                {
                                    (addingId === 'Fashion' && category) && <i className='bx bx-x' id='x-hover'
                                        style={{ cursor: 'pointer' }}
                                        onClick={(event) => {

                                            event.stopPropagation()
                                            setAddingId('')
                                            setCategory(false)
                                            setFilteredJobs(jobs)

                                        }}></i>
                                }

                            </div>
                            <div onClick={() => categoriesListing('Other', jobs)}
                                className='category-object'
                                id={(addingId === 'Other' && category) ? 'selected-category' : ''}>

                                <i class='bx bx-dots-horizontal-rounded'></i>
                                <p>Other</p>
                                {
                                    (addingId === 'Other' && category) && <i className='bx bx-x' id='x-hover'
                                        style={{ cursor: 'pointer' }}
                                        onClick={(event) => {

                                            event.stopPropagation()
                                            setAddingId('')
                                            setCategory(false)
                                            setFilteredJobs(jobs)

                                        }}></i>
                                }

                            </div>

                        </section>

                    </div>

                </section>
                <section id='jobs'>

                    <div id="job-listing">

                        {

                            jobs.length === 0 ? <div id="no-jobs"> <p>No jobs were found</p> </div> :

                                filteredJobs.length > 0 ? filteredJobs.map((objects, index) => (

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

                                )) : ''

                        }

                    </div>

                </section>

            </section>

            <Toaster />

        </div>

    )

}

export default SHome