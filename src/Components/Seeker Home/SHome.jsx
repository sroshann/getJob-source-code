import React, { useEffect, useState } from 'react'
import './SHome.css'
import toast, { Toaster } from 'react-hot-toast'
import { collection, getDocs, query, updateDoc, where } from 'firebase/firestore'
import { FirebaseFirestore } from '../../FIrebase/Configueration'
import { useNavigate } from 'react-router-dom'
import Listing from './Listing'

function SHome() {

    const [saveArray, setSaveArray] = useState([])
    const [jobs, setJobs] = useState([])

    const [search, setSearch] = useState('')
    const [searchedJobs, setSearchedJobs] = useState([])

    const [category, setCategory] = useState([])
    const [addingId, setAddingId] = useState('')

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

    const searchJob = async () => {

        try {

            const loadingId = toast.loading('Searching')
            const reference = collection(FirebaseFirestore, 'Jobs')

            const queries = [ //Inorder to handle multiple queries

                where('category', '==', search),
                where('jobTitle', '==', search),
                where('location', '==', search),
                where('qualification', '==', search)

            ]

            let array = []
            const promises = queries.map(async (objects) => { // Firebase provides AND operation as default 
                // to avoid that we can use this method creating promise and iterationg among them

                const selectedJob = query(reference, objects)
                const jobDetails = await getDocs(selectedJob)
                jobDetails.forEach((doc) => {

                    array.push({

                        jobTitle: doc.data().jobTitle,
                        jobID: doc.data().jobID,
                        companyName: doc.data().companyName,
                        experience: doc.data().experience,
                        salary: doc.data().salary,
                        location: doc.data().location,
                        skillsRequired: doc.data().skillsRequired,
                        postedOn: doc.data().postedOn

                    })

                })

            })

            await Promise.all(promises) // Wait for all queries to complete

            if (array.length === 0) toast.error('No jobs were found', { style: { fontSize: '14px' } })
            else setSearchedJobs(array)

            toast.remove(loadingId)

        } catch (error) { console.log(error.message) }

    }

    const categoriesListing = async (category) => {

        try {

            setCategory([]) // Palcing it emply whenever it calls

            const loadingId = toast.loading('Loading')
            const reference = collection(FirebaseFirestore, 'Jobs')
            const condition = where('category', '==', category)
            const selectedJob = query(reference, condition)

            const jobData = await getDocs(selectedJob)
            const allJobs = jobData.docs.map(values => ({

                ...values.data()

            }))

            if (allJobs.length === 0) toast.error('No jobs were found', { style: { fontSize: '14px' } })
            else setCategory(allJobs)

            setAddingId(category)
            toast.remove(loadingId)

        } catch (error) { toast.error(error.message, { style: { fontSize: '14px' } }) }

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
                        setSearchedJobs([])

                    }}></i>}
                    <i className='bx bx-search search-icon' onClick={searchJob} ></i>

                </div>

            </section>
            <section id='SHome-main-contents' >

                <section id="category">

                    <div id='catgory-listing'>

                        <section>

                            <div onClick={() => categoriesListing('Medical')}
                                className='category-object'
                                id={(addingId === 'Medical' && category.length > 0) ? 'selected-category' : ''}>

                                <i class='bx bx-clinic'></i>
                                <p>Medical</p>
                                {
                                    (addingId === 'Medical' && category.length > 0) && <i className='bx bx-x' id='x-hover'
                                    style={{ cursor: 'pointer' }}
                                    onClick={(event) => {

                                        event.stopPropagation()
                                        setAddingId('')
                                        setCategory([])

                                    }}></i>
                                }

                            </div>
                            <div onClick={() => categoriesListing('Education')}
                                className='category-object'
                                id={(addingId === 'Education' && category.length > 0) ? 'selected-category' : ''}>

                                <i class='bx bxs-graduation'></i>
                                <p>Education</p>
                                {
                                    (addingId === 'Education' && category.length > 0) && <i className='bx bx-x' id='x-hover'
                                    style={{ cursor: 'pointer' }}
                                    onClick={(event) => {

                                        event.stopPropagation()
                                        setAddingId('')
                                        setCategory([])

                                    }}></i>
                                }

                            </div>
                            <div onClick={() => categoriesListing('Engineering')}
                                className='category-object'
                                id={(addingId === 'Engineering' && category.length > 0) ? 'selected-category' : ''}>

                                <i class='bx bx-cog'></i>
                                <p>Engineering</p>
                                {
                                    (addingId === 'Engineering' && category.length > 0) && <i className='bx bx-x' id='x-hover'
                                    style={{ cursor: 'pointer' }}
                                    onClick={(event) => {

                                        event.stopPropagation()
                                        setAddingId('')
                                        setCategory([])

                                    }}></i>
                                }

                            </div>
                            <div onClick={() => categoriesListing('Hospitality')}
                                className='category-object'
                                id={(addingId === 'Hospitality' && category.length > 0) ? 'selected-category' : ''}>

                                <i class='bx bx-restaurant'></i>
                                <p>Hospitality</p>
                                {
                                    (addingId === 'Hospitality' && category.length > 0) && <i className='bx bx-x' id='x-hover'
                                    style={{ cursor: 'pointer' }}
                                    onClick={(event) => {

                                        event.stopPropagation()
                                        setAddingId('')
                                        setCategory([])

                                    }}></i>
                                }

                            </div>
                            <div onClick={() => categoriesListing('Finance')}
                                className='category-object'
                                id={(addingId === 'Finance' && category.length > 0) ? 'selected-category' : ''}>

                                <i class='bx bx-wallet'></i>
                                <p>Finance</p>
                                {
                                    (addingId === 'Finance' && category.length > 0) && <i className='bx bx-x' id='x-hover'
                                    style={{ cursor: 'pointer' }}
                                    onClick={(event) => {

                                        event.stopPropagation()
                                        setAddingId('')
                                        setCategory([])

                                    }}></i>
                                }

                            </div>
                            <div onClick={() => categoriesListing('Designing')}
                                className='category-object'
                                id={(addingId === 'Designing' && category.length > 0) ? 'selected-category' : ''}>

                                <i class='bx bx-palette'></i>
                                <p>Designing</p>
                                {
                                    (addingId === 'Designing' && category.length > 0) && <i className='bx bx-x' id='x-hover'
                                    style={{ cursor: 'pointer' }}
                                    onClick={(event) => {

                                        event.stopPropagation()
                                        setAddingId('')
                                        setCategory([])

                                    }}></i>
                                }

                            </div>
                            <div onClick={() => categoriesListing('Sales')}
                                className='category-object'
                                id={(addingId === 'Sales' && category.length > 0) ? 'selected-category' : ''}>

                                <i class='bx bx-shopping-bag'></i>
                                <p>Sales</p>
                                {
                                    (addingId === 'Sales' && category.length > 0) && <i className='bx bx-x' id='x-hover'
                                    style={{ cursor: 'pointer' }}
                                    onClick={(event) => {

                                        event.stopPropagation()
                                        setAddingId('')
                                        setCategory([])

                                    }}></i>
                                }

                            </div>
                            <div onClick={() => categoriesListing('Automotive')}
                                className='category-object'
                                id={(addingId === 'Automotive' && category.length > 0) ? 'selected-category' : ''}>

                                <i class='bx bxs-car-mechanic' ></i>
                                <p>Automotive</p>
                                {
                                    (addingId === 'Automotive' && category.length > 0) && <i className='bx bx-x' id='x-hover'
                                    style={{ cursor: 'pointer' }}
                                    onClick={(event) => {

                                        event.stopPropagation()
                                        setAddingId('')
                                        setCategory([])

                                    }}></i>
                                }

                            </div>
                            <div onClick={() => categoriesListing('Fashion')}
                                className='category-object'
                                id={(addingId === 'Fashion' && category.length > 0) ? 'selected-category' : ''}>

                                <i class='bx bx-closet'></i>
                                <p>Fashion</p>
                                {
                                    (addingId === 'Fashion' && category.length > 0) && <i className='bx bx-x' id='x-hover'
                                    style={{ cursor: 'pointer' }}
                                    onClick={(event) => {

                                        event.stopPropagation()
                                        setAddingId('')
                                        setCategory([])

                                    }}></i>
                                }

                            </div>
                            <div onClick={() => categoriesListing('Other')}
                                className='category-object'
                                id={(addingId === 'Other' && category.length > 0) ? 'selected-category' : ''}>

                                <i class='bx bx-dots-horizontal-rounded'></i>
                                <p>Other</p>
                                {
                                    (addingId === 'Other' && category.length > 0) && <i className='bx bx-x' id='x-hover'
                                    style={{ cursor: 'pointer' }}
                                    onClick={(event) => {

                                        event.stopPropagation()
                                        setAddingId('')
                                        setCategory([])

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
                                searchedJobs.length > 0 ? searchedJobs.map((objects, index) => (

                                    <Listing objects={objects} key={index} saveJob={saveJob} saveArray={saveArray} pageView={pageView} />

                                )) :
                                    category.length > 0 ? category.map((objects, index) => (

                                        <Listing objects={objects} key={index} saveJob={saveJob} saveArray={saveArray} pageView={pageView} />

                                    )) :
                                        jobs.map((objects, index) => (

                                            <Listing objects={objects} key={index} saveJob={saveJob} saveArray={saveArray} pageView={pageView} />

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