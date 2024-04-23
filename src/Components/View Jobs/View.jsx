import React, { useEffect, useState } from 'react'
import './View.css'
import { collection, getDocs, query, updateDoc, where } from 'firebase/firestore'
import { FirebaseFirestore } from '../../FIrebase/Configueration'
import toast, { Toaster } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

function View() {

    const [job, setJob] = useState([])
    const [saved, setSaved] = useState(false)
    const [apply, setApply] = useState(false)
    const [ uploadApply , setUploadApply ] = useState({})
    // const [ alreadySaved , setAlreadySaved ] = useState( false )

    const [ userType , setUserType ] = useState('')
    const navigate = useNavigate()

    const getJobDetails = async () => {

        let array

        const localStorageData = localStorage.getItem('jobID')
        if (localStorageData) {

            const parsedData = JSON.parse(localStorageData)

            const ref = collection(FirebaseFirestore, 'Jobs')
            const condition = where('jobID', '==', parsedData)
            const selectedUser = query(ref, condition)

            const userData = await getDocs(selectedUser)
            userData.forEach(doc => {

                array = doc.data()
                setUploadApply({

                    title : doc.data().jobTitle,
                    id : doc.data().jobID , 
                    company : doc.data().companyName,
                    experience : doc.data().experience,
                    salary: doc.data().salary,
                    location : doc.data().location,
                    skills: doc.data().skillsRequired,
                    date : doc.data().postedOn

                })
                setJob(doc.data())

            })

        }

        const user = localStorageUser()
        setUserType( user )
        if ( user === 'Seeker' ) userAlreadyDone( array )

    }

    const localStorageEmail = () => { // Inorder to get user data

        const localStorageData = localStorage.getItem('userData')
        if (localStorageData) {

            const parseToJSON = JSON.parse(localStorageData)
            return parseToJSON.email

        }

    }

    const localStorageUser = () => {

        const localStorageUser = localStorage.getItem('userData')
        if ( localStorageUser ) {

            const parse = JSON.parse( localStorageUser )
            return parse.user

        }

    }

    const saveJob = async () => {

        // In here only the object should be added to savedJobs 
        // So on clicking the icon fetc the savedJob data of corresponding user
        // then check if the job is already saved or not by finding the index of object from fetched data
        // if it not found fetched data destructured and stored into new array (uploadArray inorder to prevent crash) and the 
        // current object is apended behind it
        // if it found it is removed from the savedArray by splicing it and stored into uploadArray by desconstructing.

        // After all the process the uploadArray is uploaded to the database

        let savedArray = []
        let uploadArray = []

        try {

            const email = localStorageEmail()
            const ref = collection(FirebaseFirestore, 'Users')
            const condition = where('email', '==', email)
            const selectedUser = query(ref, condition)

            await getDocs(selectedUser).then(async (userDocument) => {

                userDocument.forEach(doc => { savedArray = [...doc.data().savedJobs] })

                const index = savedArray.findIndex(value => value.jobID === job.jobID)

                if (index !== -1) {

                    savedArray.splice(index, 1)
                    uploadArray = [...savedArray]
                    // setAlreadySaved( false )
                    toast.error('Job removed from saved collections', { style: { fontSize: '14px' } })

                } else {

                    uploadArray = [...savedArray, job]
                    toast.success('Job saved', { style: { fontSize: '14px' } })

                }

                const userRef = userDocument.docs[0].ref
                await updateDoc(userRef, { savedJobs: uploadArray })

            })

        } catch (error) { console.log(error) }

        if (saved) setSaved(false)
        else { setSaved(true) }

    }

    const userAlreadyDone = async (object) => { //Inorder to get already saved jobs in database to show in saved jobs

        let saveArray = []
        let applyArray = []

        const email = localStorageEmail()
        const ref = collection(FirebaseFirestore, 'Users')
        const condition = where('email', '==', email)
        const selectedUser = query(ref, condition)

        const userData = await getDocs(selectedUser)
        userData.forEach(doc => {

            saveArray = [...doc.data().savedJobs]
            applyArray = [...doc.data().appliedJobs]

        })

        const saveExist = saveArray.some(value => value.jobID === object.jobID)
        const applyExist = applyArray.some(value => value.id === object.jobID)

        if (saveExist) setSaved(true)
        else setSaved(false)

        if (applyExist) setApply(true)
        else setApply(false)

    }

    const applyJob = async () => {

        if (apply) return toast.success('You already applied for this job', { style: { fontSize: '14px' } })
        else {

            let savedArray = []
            let uploadArray = []

            let jobArray = []
            let uploadJobArray = []
            let userDetails 

            try {

                const loadingToast = toast.loading('Applying for this job')

                // This section add job details into corresponding user database 
                const email = localStorageEmail()
                const ref = collection(FirebaseFirestore, 'Users')
                const condition = where('email', '==', email)
                const selectedUser = query(ref, condition)

                await getDocs(selectedUser).then(async (userDocument) => {

                    userDocument.forEach(doc => { 
                        
                        savedArray = [...doc.data().appliedJobs] 
                        userDetails = { // Inorder to store the user details in corresponding job details

                            name: doc.data().username,
                            phoneNumber : doc.data().phone_number,
                            email : doc.data().email,
                            dp : doc.data().profile_picture,
                            resume : doc.data().url

                        }
                    
                    })
                    uploadArray = [...savedArray, uploadApply]
                    const userRef = userDocument.docs[0].ref
                    await updateDoc(userRef, { appliedJobs: uploadArray })

                })

                

                // This section add the user details into jobs database
                const reference = collection( FirebaseFirestore , 'Jobs' )
                const jobCondition = where( 'jobID' , '==' , job.jobID )
                const selectedJob = query( reference , jobCondition )

                await getDocs( selectedJob ).then( async (jobDocument) => {

                    jobDocument.forEach( doc => {

                        jobArray = [ ...doc.data().appliedSeekers ]

                    } )

                    uploadJobArray = [ ...jobArray , userDetails ]
                    const jobRef = jobDocument.docs[0].ref
                    await updateDoc( jobRef , { appliedSeekers : uploadJobArray } )

                } ).then(() => {
                    toast.remove( loadingToast )
                    toast.success('You have successfully applied for this job', { style: { fontSize: '14px' } })
                })
                .catch((error) => console.log(error.message) )


            } catch (error) { console.log(error.message) }

            if (apply) setApply(false)
            else setApply(true)

        }

    }

    useEffect(() => {

        getJobDetails()

    }, [])


    return (

        <div id='view-main'>

            <div className="job-title">
                <div className="job-prim">
                    <img src={job.dp} alt="" />
                    <div className="job-prim-dtl">
                        <p className="job-name">{job.jobTitle}</p>
                        <span className="jdtls mob">
                            <p className="jComp"><span><i className='bx bx-buildings' style={{ fontSize: 'large' }}></i></span>{job.companyName}</p>
                            <p className="jLoc"><span><i className='bx bx-map' style={{ fontSize: 'large' }}></i></span>{job.location}</p>
                            <p className="jSalary"><span><i className='bx bx-money' style={{ fontSize: 'large' }}></i></span>{job.salary}</p>
                        </span>
                        <span className="jdtls">
                            <p className="jType">{job.workingType}</p>
                            <p className="jCat">{job.category}</p>
                        </span>
                    </div>
                </div>

                <div className="job-btns">
                    { userType === 'Seeker' ? <button className="afj" onClick={applyJob}>{apply ? 'Applied' : 'Apply for job'}</button> :
                        <button className="afj" onClick={ () => navigate('/applicants') }>View applicants</button>
                    }
                    {

                        userType === 'Seeker' ? (saved ? <i className='bx bxs-bookmark view-save' onClick={saveJob}></i> :
                            <i className='bx bx-bookmark view-save' onClick={saveJob}></i>) :
                            <button className="afj">Delete</button>

                    }
                </div>

            </div>

            <div className="job-descriptions">

                <div className="descriptions">
                    <div className="job-desc">
                        <p className="jhead">Job Description</p>
                        <p>{job.description}</p>
                    </div>
                    <div className="key-respon">
                        <p className="jhead">{job.skillsRequired && job.skillsRequired.length === 1 ? 'Skill' : 'Skills'}</p>
                        {job.skillsRequired && job.skillsRequired.map((objects, index) => (

                            <div key={index} style={{ display: 'flex', columnGap: '3px' }}>

                                <i className='bx bx-wifi-0' style={{ fontSize: 'x-large', marginTop: '-3.5px' }}></i>
                                <p>{objects.text}</p>

                            </div>

                        ))}
                    </div>
                    <div className="key-respon">
                        <p className="jhead">Key Responsibilties</p>
                        {job.responsibilities && job.responsibilities.map((objects, index) => (

                            <div key={index} style={{ display: 'flex', columnGap: '3px' }}>

                                <i className='bx bx-wifi-0' style={{ fontSize: 'x-large', marginTop: '-3.5px' }}></i>
                                <p>{objects.text}</p>

                            </div>

                        ))}
                    </div>
                    <div className="skill-exp">
                        <p className="jhead">Requirements</p>
                        {job.requirements && job.requirements.map((objects, index) => (

                            <div key={index} style={{ display: 'flex', columnGap: '3px' }}>

                                <i className='bx bx-wifi-0' style={{ fontSize: 'x-large', marginTop: '-3.5px' }}></i>
                                <p>{objects.text}</p>

                            </div>

                        ))}
                    </div>
                </div>

                <div className="job-overview">
                    <p className="head">Job Overview</p>

                    <span className="view">
                        <i className='bx bx-calendar-event' style={{ fontSize: 'x-large' }} ></i>
                        <span>
                            <p className="head">Date Posted:</p>
                            <p>{job.postedOn}</p>
                        </span>
                    </span>

                    <span className="view">
                        <i className='bx bx-category' style={{ fontSize: 'x-large' }}></i>
                        <span>
                            <p className="head">Job Type:</p>
                            <p>{job.jobType}</p>
                        </span>
                    </span>

                    <span className="view">
                        <i className='bx bx-spreadsheet' style={{ fontSize: 'x-large' }}></i>
                        <span>
                            <p className="head">Qualification:</p>
                            <p>{job.qualification}</p>
                        </span>
                    </span>

                    <span className="view">
                        <i className='bx bx-briefcase' style={{ fontSize: 'x-large' }}></i>
                        <span>
                            <p className="head">Experience:</p>
                            <p>{job.experience}</p>
                        </span>
                    </span>

                </div>

            </div>

            <Toaster />

        </div>

    )

}

export default View