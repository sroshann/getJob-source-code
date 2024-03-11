import React, { useContext, useState, useEffect } from 'react'
import './SeekerProfile.css'
import { UDContext } from '../../Context/User_details'

function SeekerProfile() {

    const [edit, setEdit] = useState(false)
    const [new_username, setNewUsername] = useState('')
    const [new_phonenumber, setNewPhonenumber] = useState('')
    const [location, setLocation] = useState('')
    const [age, setAge] = useState('')
    const [experience, setExperience] = useState('')
    const [summary, setSummary] = useState('')
    const [image, setImage] = useState()

    const [input_box1, setInputBox1] = useState(false) // To get a new input box
    const [education, setEducation] = useState('') // To store educational qualifaication from input box 
    const [institution, setInstitution] = useState('')
    const [edu_list, setEduList] = useState([]) // To store array of educational qualification

    const [input_box2, setInputBox2] = useState(false) // To get a new input box
    const [skill, setSkills] = useState('') // To store skill from input box 
    const [skill_list, setSkillList] = useState([]) // To store array of skills

    const [input_box3, setInputBox3] = useState(false) // To get a new input box
    const [project, setProjects] = useState('') // To store project from input box 
    const [project_list, setProjectList] = useState([]) // To store array of skills
    const [description, setDescription] = useState('') //To store description about the project
    const [hosted_url, setHostedURL] = useState('') // To store the hosted url

    const [input_box4, setInputBox4] = useState(false) // To get a new input box
    const [language, setLanguages] = useState('') // To store language from input box 
    const [language_list, setLanguageList] = useState([]) // To store array of languages

    const [input_box5, setInputBox5] = useState(false) // To get a new input box
    const [ certificate_img , setCertificateImg ] = useState() // To store certificate image
    const [certificate_desc, setCertificateDesc] = useState('') // To store description of a certificate
    const [certificate_list, setCertificateList] = useState([]) // To store array of certificate

    const [resume_name, setResumeName] = useState('')


    const { user_details } = useContext(UDContext); // This is the context in which the detials of user is stored

    const enableEdit = () => { setEdit(true) }
    const saveChanges = () => {

        setEdit(false)
        setInputBox1(false)
        setInputBox2(false)
        setInputBox3(false)
        setInputBox4(false)
        setInputBox5(false)

    }




    const addItems = (section) => { // This function is to add lists of education to edu_list array

        if (section === 'education') {

            setEduList([...edu_list, { id: Date.now(), text: education, institution: institution }])
            // During adding the existing elements will destructured and added the new element with an id
            setEducation('') // The existing value in input box is cleared
            setInstitution('')

        } else if (section === 'skill') {

            setSkillList([...skill_list, { id: Date.now(), text: skill }])
            setSkills('')

        } else if (section === 'project') {

            setProjectList([...project_list, { id: Date.now(), text: project, description: description, hosted_url: hosted_url }])
            setProjects('')
            setDescription('')
            setHostedURL('')

        } else if (section === 'language') {

            setLanguageList([...language_list, { id: Date.now(), text: language }])
            setLanguages('')

        } else if ( section === 'certificates' ) {

            setCertificateList([...certificate_list , { id: Date.now() , image : certificate_img , text : certificate_desc  }])
            setCertificateDesc('')

        }

    }

    const deleteItem = (section, value) => { // This function is to remove an educational qualification from array

        if (section === 'education') {

            setEduList(edu_list.filter(selected => {

                if (selected.id === value) selected = null
                return selected

            }))

            // In this function the id of the element which must be cleared in received as parameter.
            // and the id of the selected educational qualification with the id of deletion value using 'filter'.
            // and when it become equal the selected qualification becomes null

        } else if (section === 'skill') {

            setSkillList(skill_list.filter(selected => {

                if (selected.id === value) selected = null
                return selected

            }))

        } else if (section === 'project') {

            setProjectList(project_list.filter(selected => {

                if (selected.id === value) selected = null
                return selected

            }))

        } else if (section === 'language') {

            setLanguageList(language_list.filter(selected => {

                if (selected.id === value) selected = null
                return selected

            }))

        } else if ( section === 'certificates' ) {

            setCertificateList( certificate_list.filter( selected => {

                if ( selected.id === value ) selected = null
                return selected

            } ) )

        }

    }

    const decodeName = () => { // This function is used to get the filename from the url

        try {
            const url = new URL(user_details.url);
            const pathArray = url.pathname.split('/');
            const fileName = pathArray[pathArray.length - 1];
            const final = decodeURIComponent(fileName);
            const name = final.split('Resumes/')
            const originalName = name[name.length - 1]
            console.log(originalName);
            setResumeName(originalName)
        } catch (error) {
            console.error('Error decoding file name:', error);
            return 'Error decoding file name';
        }

    }

    useEffect(() => {

        decodeName()

    }, [])



    return (

        <div id='root-body'>

            <div id="containers">

                <div id="top-container">

                    <div id="photo">

                        <div>

                            {image ? <img src={URL.createObjectURL(image)} alt="DP" id='dp' /> :
                                <i className='bx bxs-user-circle profile-photo' ></i>}
                            {edit && <input type="file" name="" id="change-dp"
                                onChange={(event) => setImage(event.target.files[0])} />}
                            {
                                edit ? <input style={{ textAlign: 'center', marginTop: '5px', marginBottom: '5px' }}
                                    className='inp-bx' type="text" value={new_username}
                                    onChange={(event) => setNewUsername(event.target.value)} placeholder={user_details.username} /> :
                                    <p id='name' style={edit ? {} : { marginTop: '-8px' }} >{user_details.username}</p>

                            }
                            <p id='username'>username</p>

                        </div>

                    </div>
                    <div id="details">

                        <div id='details-upper'>

                            <div>

                                <section>

                                    <p className='heading'>Phone</p>
                                    {

                                        edit ? <input className='inp-bx' type="number" value={new_phonenumber}
                                            onChange={(event) => setNewPhonenumber(event.target.value)}
                                            placeholder={user_details.phone_number} /> :
                                            <p className='sub-heading'>+91{user_details.phone_number}</p>

                                    }

                                </section>
                                <section>

                                    <p className='heading'>Location</p>
                                    {

                                        edit ? <input className='inp-bx' type="text" value={location}
                                            onChange={(event) => setLocation(event.target.value)} placeholder='Enter your location' /> :
                                            <p className='sub-heading'>ADD</p>

                                    }

                                </section>
                                <section>

                                    <p className='heading'>Age</p>
                                    {

                                        edit ? <input className='inp-bx' type="number" value={age}
                                            onChange={(event) => setAge(event.target.value)} placeholder='Enter your age' /> :
                                            <p className='sub-heading'>0</p>

                                    }

                                </section>

                            </div>
                            <div>

                                <section>

                                    <p className='heading'>Experience</p>
                                    {

                                        edit ? <input className='inp-bx' type="text" value={experience}
                                            onChange={(event) => setExperience(event.target.value)}
                                            placeholder='Enter your experience' /> :
                                            <p className='sub-heading'>ADD</p>

                                    }

                                </section>
                                <section id='margin-left'>

                                    <p className='heading'>Email</p>
                                    <p className='sub-heading'>{user_details.email}</p>

                                </section>

                            </div>

                            <i class='bx bxs-edit edit' onClick={enableEdit}></i>

                        </div>
                        <div id="details-lower">

                            <section>

                                <p className='heading'>Job applied</p>
                                <p className='sub-heading margin-left'>0</p>

                            </section>
                            <section>

                                <p className='heading'>Job saved</p>
                                <p className='sub-heading margin-left'>0</p>

                            </section>
                            <section>

                                <p className='heading'>Profile views</p>
                                <p className='sub-heading margin-left'>0</p>

                            </section>

                        </div>

                    </div>

                </div>

                <div id="profile-summary">

                    <p className="heading">Profile summary</p>
                    <div id="summary">

                        {

                            edit ? <textarea className='text-area' value={summary}
                                onChange={(event) => setSummary(event.target.value)}
                                style={{ marginBottom: '-15px' }} placeholder='Tell us about yourself'></textarea> :
                                <p className='sub-heading' style={summary === '' ? { color: 'grey' } : {}} >
                                    {summary === '' ? 'Add a profile summary' : summary}
                                </p>

                        }

                    </div>

                </div>

                <div id="down-container">

                    {/* <p>Profile summary</p>
                <p>Educational qualification</p>
                <p>Skills</p>
                <p>Projects</p>
                <p>Languages known</p>
                <p>Attatchements</p> */}

                    <div id="educational-qualifications">

                        <p style={edit ? { marginBottom: '-15px' } : {}} className="heading">Educational qualifications</p>
                        {/* when clicking the plus button input_box becomes true inorder to get a new input box */}
                        {edit && <i onClick={() => setInputBox1(true)} class='bx bx-plus plus-btn'></i>}
                        {input_box1 &&

                            <div style={{ display: 'grid' }}>
                                <input type="text" name="" id="" className='inp-bx'
                                    value={education} onChange={(event) => setEducation(event.target.value)}
                                    placeholder='Add education' />
                                <input type="text" name="" id="" className='inp-bx'
                                    value={institution} onChange={(event) => setInstitution(event.target.value)}
                                    placeholder='Add institution' />
                            </div>

                            // when creating a new input box its value is stored in state education
                            // When clicking the + button addItems function is invoked

                        }
                        {

                            edu_list.map((objects, index) => (

                                <div className='objects'>
                                    <div>
                                        <p>{objects.text}</p>
                                        <p>{objects.institution}</p>
                                    </div>
                                    {input_box1 && <i class='bx bx-x' onClick={() => deleteItem('education', objects.id)}></i>}
                                </div>

                            ))

                            // This is used to remove educational qualification during editing 
                            // The x button is visible only when it is editable
                            // When clicking the x button the id of selected button is transfered ti deleteItem function

                        }

                        {input_box1 &&

                            <div id='edu-btns'>
                                <button className='done-btn' onClick={() => addItems('education')}>Add</button>
                                <button className='done-btn' onClick={() => setInputBox1(false)} >Done</button>
                            </div>

                        }

                    </div>

                    <hr className="yellow" />

                    <div id="skills">

                        <p style={edit ? { marginBottom: '-15px' } : {}} className="heading">Skills</p>
                        {edit && <i onClick={() => setInputBox2(true)} class='bx bx-plus plus-btn'></i>}
                        {input_box2 &&

                            <div>
                                <input type="text" name="" id="" className='inp-bx'
                                    value={skill} onChange={(event) => setSkills(event.target.value)}
                                    placeholder='Add skill' />
                                <i class='bx bx-check' onClick={() => addItems('skill')}></i>
                            </div>

                        }
                        {

                            skill_list.map((objects, index) => (

                                <div className='objects'>
                                    <p>{objects.text}</p>
                                    {input_box2 && <i class='bx bx-x' onClick={() => deleteItem('skill', objects.id)}></i>}
                                </div>

                            ))

                        }

                        {input_box2 && <button style={{ position: 'relative', left: '943px' }} className='done-btn'
                            onClick={() => setInputBox2(false)} >Done</button>}

                    </div>

                    <hr className="yellow" />

                    <div id="certificates">

                        <p style={edit ? { marginBottom: '-15px' } : {}} className="heading">Certificates</p>
                        {edit && <i onClick={() => setInputBox5(true)} class='bx bx-plus plus-btn'></i>}
                        {input_box5 &&

                            <div style={{ display: 'grid' , rowGap: '10px' }}>

                                <input type="file" name="" id="choode_certificate"
                                onChange={ ( event ) => setCertificateImg( event.target.files[0] ) } />
                                <textarea className='text-area' style={ { marginBottom: '10px' } } name="" id="" value={certificate_desc}
                                    placeholder='Add description about the certificate'
                                    onChange={(event) => setCertificateDesc(event.target.value)} ></textarea>

                            </div>

                        }
                        {

                            certificate_list.map( ( objects , index ) => (

                                <div className='objects'>

                                    { objects.image ? <img src={URL.createObjectURL(objects.image)} alt="" /> : ''}
                                    <p style={{ wordBreak: 'break-all' }}>{ objects.text }</p>
                                    { input_box5 && <i class='bx bx-x' onClick={() => deleteItem('certificates', objects.id)}></i>}

                                </div>

                            ) )

                        }
                        {input_box5 &&

                            <div id="certificate-btns">

                                <button className='done-btn' onClick={() => addItems('certificates')} >Add</button>
                                <button className='done-btn' onClick={() => setInputBox5(false)} >Done</button>

                            </div>

                        }

                    </div>

                    <hr className="yellow" />

                    <div id="projects">

                        <p style={edit ? { marginBottom: '-15px' } : {}} className="heading">Projects</p>
                        {edit && <i onClick={() => setInputBox3(true)} class='bx bx-plus plus-btn'></i>}
                        {input_box3 &&

                            <div style={{ display: 'grid' }}>
                                <input type="text" name="" id="" className='inp-bx'
                                    value={project} onChange={(event) => setProjects(event.target.value)}
                                    placeholder='Add project' />
                                <textarea className='text-area' name="" value={description}
                                    placeholder='Provide more details about the project'
                                    onChange={(event) => setDescription(event.target.value)}></textarea>
                                <input type="text" name="" className="inp-bx" value={hosted_url}
                                    placeholder='Provide a hosted url of the project'
                                    onChange={(event) => setHostedURL(event.target.value)} />
                            </div>

                        }
                        {

                            project_list.map((objects, index) => (

                                <div className='objects'>
                                    <div>
                                        <p>{objects.text}</p>
                                        <p style={{ wordBreak: 'break-all' }}>{objects.description}</p>
                                        <a rel='noreferrer' target='_blank' href={objects.hosted_url}>
                                            <p style={{ color: 'grey', cursor: 'pointer' }}>{objects.hosted_url}</p>
                                        </a>
                                    </div>
                                    {input_box3 && <i class='bx bx-x' onClick={() => deleteItem('project', objects.id)}></i>}
                                </div>

                            ))

                        }

                        {input_box3 &&

                            <div id="project-btns">

                                <button className='done-btn' onClick={() => addItems('project')} >Add</button>
                                <button className='done-btn' onClick={() => setInputBox3(false)} >Done</button>

                            </div>

                        }

                    </div>

                    <hr className="yellow" />

                    <div id="languages">

                        <p style={edit ? { marginBottom: '-15px' } : {}} className="heading">Languages known</p>
                        {edit && <i onClick={() => setInputBox4(true)} class='bx bx-plus plus-btn'></i>}
                        {input_box4 &&

                            <div>
                                <input type="text" name="" id="" className='inp-bx'
                                    value={language} onChange={(event) => setLanguages(event.target.value)}
                                    placeholder='Add language' />
                                <i class='bx bx-check' onClick={() => addItems('language')}></i>
                            </div>

                        }
                        {

                            language_list.map((objects, index) => (

                                <div className='objects'>
                                    <p>{objects.text}</p>
                                    {input_box4 && <i class='bx bx-x' onClick={() => deleteItem('language', objects.id)}></i>}
                                </div>

                            ))

                        }

                        {input_box4 && <button style={{ position: 'relative', left: '943px' }} className='done-btn'
                            onClick={() => setInputBox4(false)} >Done</button>}

                    </div>

                    <hr className="yellow" />

                    <div id="attatchments">

                        <p className="heading">Attatchments</p>
                        <button id='attatchment-btns' >
                            <a rel='noreferrer' href={user_details.url} target='_blank'>{resume_name}</a>
                        </button>

                    </div>

                    {edit && <button id="save" onClick={saveChanges}>Save changes</button>}

                </div>

            </div>

        </div>

    )

}

export default SeekerProfile