import React, { useState } from 'react'
import './PostJob.css'
import { addDoc, collection } from 'firebase/firestore'
import { FirebaseFirestore } from '../../FIrebase/Configueration'
import toast, { Toaster } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

function PostJob() {

    const [jobTitle, setJobTitle] = useState('')
    const [category, setCategory] = useState('')
    const [qualification, setQualification] = useState('')
    const [salary, setSalary] = useState('')
    const [description, setDescription] = useState('')

    const [skills, setSkills] = useState('')
    const [skillArray, setSkillsArray] = useState([])

    const [responsibilities, setResponsibilities] = useState('')
    const [resArray, setResArray] = useState([])

    const [experience, setExperience] = useState('')
    const [expArray, setExpArray] = useState([])

    const navigate = useNavigate()

    const addItems = ( section) => {

        if (section === 'responsibilities') {

            setResArray([...resArray, { id: Date.now(), text: responsibilities }])
            setResponsibilities('')

        } else if (section === 'skills') {

            setSkillsArray([...skillArray, { id: Date.now(), text: skills }])
            setSkills('')

        } else if (section === 'experience') {

            setExpArray([...expArray, { id: Date.now(), text: experience }])
            setExperience('')

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

        } else if (section === 'experience') {

            setExpArray(expArray.filter(selected => {

                if (selected.id === value) selected = null
                return selected

            }))

        }

    }

    const handleSubmit = async (event) => {

        event.preventDefault()

        if (jobTitle === '' || category === '' || qualification === '' || salary === '' || description === '' ||
            skillArray.size === 0 || resArray.size === 0 || expArray.size === 0)
            return toast.error('Complete all fields', { style: { fontSize: '14px' } })

        else {

            const storedUserData = localStorage.getItem('userData')

            if (storedUserData) {

                const parsedUserData = JSON.parse(storedUserData)

                await addDoc(collection(FirebaseFirestore, 'Jobs'), {

                    jobID: Date.now(),
                    userEmail: parsedUserData.email,
                    jobTitle,
                    category,
                    qualification,
                    salary,
                    description,
                    skillsRequired: skillArray,
                    responsibilities: resArray,
                    experience: expArray

                }).then(() => {
                    
                    toast.success('Job posted successfully', { style: { fontSize: '14px' } })
                    navigate('/home')
                
                })
                    .catch((error) => {

                        toast.error('An error occured', { style: { fontSize: '14px' } })
                        console.log(error.message)

                    })

            }

        }

    }

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
                            <input type="text" placeholder="Category" value={category}
                                onChange={(event) => setCategory(event.target.value)} />

                            <label for="jobSalary">Salary</label>
                            <input type="text" placeholder="Salary" value={salary}
                                onChange={(event) => setSalary(event.target.value)} />


                        </div>

                    </div>

                    <div id='middle-section' >

                        <div id='listSkills'>

                            {skillArray &&

                                skillArray.map((objects, index) => (

                                    <div key={index} className='postObjects'>

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

                        <label for="jobDesc">Experiences</label>
                        <div className='textAreaDiv'>

                            <textarea placeholder='Provide experience required as points' value={experience}
                                onChange={(event) => setExperience(event.target.value)} ></textarea>
                            <button id='done' onClick={(event) => { 
                                
                                event.stopPropagation()
                                addItems('experience') 
                                
                            }}>Add</button>

                        </div>

                        {expArray &&

                            expArray.map((objects, index) => (

                                <div key={index} className='postObjects'>

                                    <p>{objects.text}</p>
                                    <i class='bx bx-x x' style={{ cursor: 'pointer' }}
                                        onClick={() => deleteItems('experience', objects.id)}></i>

                                </div>

                            ))

                        }

                        <button type="submit" onClick={handleSubmit} >Post</button>

                    </div>

                </div>
            </div>

            <Toaster />

        </div>

    )

}

export default PostJob