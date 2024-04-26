import React, { useEffect, useState } from 'react'
import './PostJob.css'
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore'
import { FirebaseFirestore } from '../../FIrebase/Configueration'
import toast, { Toaster } from 'react-hot-toast'
// import { useNavigate } from 'react-router-dom'

function PostJob() {

    const [jobTitle, setJobTitle] = useState('')
    const [category, setCategory] = useState('')
    const [qualification, setQualification] = useState('')
    const [salary, setSalary] = useState('')
    const [description, setDescription] = useState('')
    const [experience, setExperience] = useState('')
    const [location, setLocation] = useState('')
    const [companyName, setCompanyName] = useState('')
    const [dp, setDP] = useState('')
    const [workingType, setworkingType] = useState('')
    const [jobType, setJobType] = useState('')

    const [skills, setSkills] = useState('')
    const [skillArray, setSkillsArray] = useState([])

    const [responsibilities, setResponsibilities] = useState('')
    const [resArray, setResArray] = useState([])

    const [requirements, setrequirements] = useState('')
    const [reqArray, setreqArray] = useState([])

    // const navigate = useNavigate()

    const addItems = (section) => {

        if (section === 'responsibilities') {

            setResArray([...resArray, { id: Date.now(), text: responsibilities }])
            setResponsibilities('')

        } else if (section === 'skills') {

            setSkillsArray([...skillArray, { id: Date.now(), text: skills }])
            setSkills('')

        } else if (section === 'requirements') {

            setreqArray([...reqArray, { id: Date.now(), text: requirements }])
            setrequirements('')

        }

    }

    const deleteItems = (section, value) => {

        if (section === 'responsibilities') {

            setResArray(resArray.filter(selected => {

                if (selected.id === value) selected = null
                return selected

            }))

        } else if (section === 'skills') {

            setSkillsArray(skillArray.filter(selected => {

                if (selected.id === value) selected = null
                return selected

            }))

        } else if (section === 'requirements') {

            setreqArray(reqArray.filter(selected => {

                if (selected.id === value) selected = null
                return selected

            }))

        }

    }

    const handleSubmit = async (event) => {

        event.preventDefault()
        console.log(location)

        if (jobTitle === '' || category === '' || qualification === '' || salary === '' || description === '' ||
            experience === '' || skillArray.size === 0 || resArray.size === 0 || reqArray.size === 0)
            return toast.error('Complete all fields', { style: { fontSize: '14px' } })

        else {

            const loadingToast = toast.loading('Posting')
            const storedUserData = localStorage.getItem('userData')
            const date = new Date()

            if (storedUserData) {

                try {

                    const parsedUserData = JSON.parse(storedUserData)

                    
                    await addDoc(collection(FirebaseFirestore, 'Jobs'), {

                        jobID: Date.now(),
                        postedOn: date.toDateString(),
                        userEmail: parsedUserData.email,
                        jobTitle,
                        category,
                        qualification,
                        salary,
                        description,
                        experience,
                        location : location,
                        companyName,
                        dp,
                        workingType,
                        jobType,
                        skillsRequired: skillArray,
                        responsibilities: resArray,
                        requirements: reqArray,
                        appliedSeekers: []

                    }).then(() => {

                        toast.remove( loadingToast )
                        toast.success('Job posted successfully', { style: { fontSize: '14px' } })
                        setJobTitle('')
                        setCategory('')
                        setQualification('')
                        setSalary('')
                        setDescription('')
                        setExperience('')
                        setSkillsArray([])
                        setResArray([])
                        setreqArray([])

                    })
                        .catch((error) => {

                            toast.error('An error occured', { style: { fontSize: '14px' } })
                            console.log(error.message)

                        })

                } catch (error) { console.log(error) }

            }

        }

    }

    const getUser = async () => {

        const localStorageData = localStorage.getItem('userData')
        if (localStorageData) {

            const localJSON = JSON.parse(localStorageData)
            const user_ref = collection(FirebaseFirestore, 'Users')  // Selects the collection
            const condition = where('email', '==', localJSON.email) // Providing the condition for selecting the user
            const selected_user = query(user_ref, condition) // Selects the user from the total collection

            await getDocs(selected_user).then((userData) => {

                userData.forEach(doc => {

                    setLocation(doc.data().location)
                    setCompanyName(doc.data().username)
                    setDP(doc.data().profile_picture)

                })

            })

        }

    }

    useEffect(() => {

        getUser()

        //   return () => {
        //     second
        //   }

    }, [])


    return (

        <div>

            <div class="form-div">
                <h1>Post a Job</h1>
                <div class="jobForm" >

                    <div id='upper-section'>

                        <div class="side">

                            <label for="jobTitle">Title</label>
                            <input type="text" placeholder="Job Title" value={jobTitle}
                                onChange={(event) => { setJobTitle(event.target.value) }} />

                            <label for="jobQualif">Qualification</label>
                            <input type="text" placeholder="Qualification" value={qualification}
                                onChange={(event) => setQualification(event.target.value)} />

                            <label for="jobQualif">Job Type</label>
                            <select value={jobType} onChange={(event) => setJobType(event.target.value)} style={{appearance: 'none'}}>

                                <option value="" disabled selected>Choose job type</option>
                                <option value="Part time">Part time</option>
                                <option value="Full time">Full time</option>

                            </select>

                            <label for="jobDesc">Skills Required</label>
                            <div className="textAreaInput">

                                <input type="text" placeholder="Provide required skills" value={skills}
                                    onChange={(event) => setSkills(event.target.value)} />
                                <button id="add" onClick={(event) => {

                                    event.stopPropagation()
                                    addItems('skills')

                                }}>Add</button>

                            </div>

                        </div>

                        <div class="side">

                            <label for="jobCate">Category</label>
                            <select value={category} onChange={(event) => setCategory(event.target.value)} 
                                style={{appearance: 'none'}}> 

                                <option value="" disabled selected>Choose category</option>
                                <option value="Medical">Medical</option>
                                <option value="Education">Education</option>
                                <option value="Engineering">Engineering</option>
                                <option value="Hospitality">Hospitality</option>
                                <option value="Finance">Finance</option>
                                <option value="Designing">Designing</option>
                                <option value="Sales">Sales</option>
                                <option value="Automotive">Automotive</option>
                                <option value="Fashion">Fashion</option>
                                <option value="Other">Other</option>

                            </select>

                            <label for="jobSalary">Salary</label>
                            <input type="text" placeholder="Salary" value={salary}
                                onChange={(event) => setSalary(event.target.value)} />

                            <label for="jobQualif">Working Mode</label>
                            <select value={workingType} onChange={(event) => setworkingType(event.target.value)} 
                                style={{appearance: 'none'}}>

                                <option value="" disabled selected>Choose working mode</option>
                                <option value="On site">On site</option>
                                <option value="Remote">Remote</option>

                            </select>

                            <label for="jobSalary">Experience</label>
                            <input type="text" placeholder="Experience" value={experience}
                                onChange={(event) => setExperience(event.target.value)} />



                        </div>

                    </div>

                    <div id='middle-section' >

                        <div id='listSkills'>

                            {skillArray &&

                                skillArray.map((objects, index) => (

                                    <div key={index} className='postObjects' style={{ marginBottom: '0px' }}>

                                        <p>{objects.text}</p>
                                        <i class='bx bx-x x' style={{ cursor: 'pointer' }}
                                            onClick={() => deleteItems('skills', objects.id)}></i>

                                    </div>

                                ))

                            }

                        </div>

                    </div>

                    <div id='lower-section'>

                        <label for="jobDesc">Description</label>
                        <textarea name="description" placeholder="Description" id="" cols="30" rows="10"
                            value={description} onChange={(event) => setDescription(event.target.value)} ></textarea>

                        <label for="jobDesc">Key Responsibilities</label>
                        <div className='textAreaDiv'>

                            <textarea placeholder='Provide key responsibilities as points' value={responsibilities}
                                onChange={(event) => setResponsibilities(event.target.value)} ></textarea>
                            <button id='done' onClick={(event) => {

                                event.stopPropagation()
                                addItems('responsibilities')

                            }}>Add</button>

                        </div>

                        {resArray &&

                            resArray.map((objects, index) => (

                                <div key={index} className='postObjects'>

                                    <p>{objects.text}</p>
                                    <i class='bx bx-x x' style={{ cursor: 'pointer' }}
                                        onClick={() => deleteItems('responsibilities', objects.id)}></i>

                                </div>

                            ))

                        }

                        <label for="jobDesc">Requirements</label>
                        <div className='textAreaDiv'>

                            <textarea placeholder='Provide requirements as points' value={requirements}
                                onChange={(event) => setrequirements(event.target.value)} ></textarea>
                            <button id='done' onClick={(event) => {

                                event.stopPropagation()
                                addItems('requirements')

                            }}>Add</button>

                        </div>

                        {reqArray &&

                            reqArray.map((objects, index) => (

                                <div key={index} className='postObjects'>

                                    <p>{objects.text}</p>
                                    <i className='bx bx-x x' style={{ cursor: 'pointer' }}
                                        onClick={() => deleteItems('requirements', objects.id)}></i>

                                </div>

                            ))

                        }

                        <button type="submit" onClick={handleSubmit} id='post-a-job-done-btn'>Post</button>

                    </div>

                </div>
            </div>

            <Toaster />

        </div>

    )

}

export default PostJob