import React, { useContext, useState, useEffect } from 'react'
import './SeekerProfile.css'
import { UDContext } from '../../Context/User_details'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { FirebaseFirestore, FirebaseStorage } from '../../FIrebase/Configueration'
import { collection, getDocs, query, updateDoc, where } from 'firebase/firestore'

function SeekerProfile() {

    const [edit, setEdit] = useState(false)
    const [new_username, setNewUsername] = useState('')
    const [new_phonenumber, setNewPhonenumber] = useState('')
    const [location, setLocation] = useState('')
    const [age, setAge] = useState('')
    const [experience, setExperience] = useState('')
    const [summary, setSummary] = useState('')
    const [image, setImage] = useState()
    const [image_URL, setImageURL] = useState(null) // To store the URL of image

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
    const [certificate, setCertificate] = useState() // To store certificate image
    const [certificate_name, setCertificateName] = useState('No file has chosen') // Inorder to store the name of file while uploading
    const [certificate_title, setCertificateTitle] = useState('') // To store title of a certificate
    const [certificate_list, setCertificateList] = useState([]) // To store array of certificate
    const [certificate_url_list, setCertificateURLList] = useState([]) //To store the array of uploaded document url

    const [resume_name, setResumeName] = useState('')


    const { user_details } = useContext(UDContext); // This is the context in which the detials of user is stored
    const { setUserDetails } = useContext(UDContext)


    const enableEdit = () => { 
        
        if ( edit ) setEdit( false )
        else setEdit(true) 
    
    }
    
    const saveChanges = async () => {

        setEdit(false)
        setInputBox1(false)
        setInputBox2(false)
        setInputBox3(false)
        setInputBox4(false)
        setInputBox5(false)

        try {

            if (certificate_list) {

                const store_urls = []

                for (let certificate of certificate_list) { // This will upload the all certificates to firebase storage

                    const certificateRef = ref(FirebaseStorage, `Certificates/${user_details.email}/${certificate.text}`)
                    const response = await uploadBytes( certificateRef , certificate.preview )
                    const downloadURL = await getDownloadURL( response.ref )
                    store_urls.push( { url : downloadURL , text: certificate.text } )

                }

                setCertificateURLList( previous => [ ...previous , ...store_urls ] )

            }

            if (image) { // This will upload the profile picture to firebase storage

                const dpRef = ref(FirebaseStorage,
                    `Profile pictures/${user_details.user_type}/${user_details.email}/${image.name}`)
                
                const response = await uploadBytes(dpRef, image)
                const downloadURL = await getDownloadURL( response.ref )
                setImageURL( downloadURL )

            }

            console.log( 'Certificates = ' , certificate_url_list )
            console.log('Profile picture = ' , image_URL)

            const user_ref = collection(FirebaseFirestore, 'Users')  // Selects the collection
            const condition = where('email', '==', user_details.email) // Providing the condition for selecting the user
            const selected_user = query(user_ref, condition) // Selects the user from the total collection

            await getDocs(selected_user).then(async (user_document) => { // This code will upload the data to firebase firestore

                const userDocRef = user_document.docs[0].ref
                await updateDoc(userDocRef, {

                    username: new_username,
                    phone_number: new_phonenumber,
                    location: location,
                    age: age,
                    experience: experience,
                    summary: summary,
                    profile_picture: image_URL,
                    educational_qualification: edu_list,
                    skills: skill_list,
                    projects: project_list,
                    languages_known: language_list,
                    certificates: certificate_url_list,
                    job_applied: 0,
                    job_saved: 0,
                    profile_views: 0,


                }).then(alert('Profile is updated'))
                    .catch((error) => alert(error.message, 'Data are not updated'))

            }).catch((error) => console.log(error.message, 'Error with getdocs'))

        } catch (error) { console.log(error.message) }

    }


    const getUserData = async () => { // This function in used to fetch the user data after updating profile

        const user_ref = collection(FirebaseFirestore, 'Users')  // Selects the collection
        const condition = where('email', '==', user_details.email) // Providing the condition for selecting the user
        const selected_user = query(user_ref, condition) // Selects the user from the total collection

        await getDocs(selected_user).then((user_data) => {

            user_data.forEach(doc => {

                console.log(doc.data())
                setUserDetails(doc.data()) // The each fields of data are stored into user details context

            })

        })

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

        } else if (section === 'certificates') {

            setCertificateList([...certificate_list, { id: Date.now(), preview: certificate, text: certificate_title }])
            setCertificate(null)
            setCertificateTitle('')
            setCertificateName('No file has chosen')

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

        } else if (section === 'certificates') {

            setCertificateList(certificate_list.filter(selected => {

                if (selected.id === value) selected = null
                return selected

            }))

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
            // console.log(originalName);
            setResumeName(originalName)
        } catch (error) {
            console.error('Error decoding file name:', error);
            return 'Error decoding file name';
        }

    }

    useEffect(() => {

        decodeName()
        getUserData()

    }, [])

    return (

        <div id='root-body'>

            <div id="containers">

                <div id="top-container">

                    <div id="photo">

                        <div>

                            {
                                user_details.profile_picture ? <img src={user_details.profile_picture}
                                    className='dp' alt="DP" /> :
                                    image ? <img src={URL.createObjectURL(image)} alt="DP" className='dp' /> :
                                        <i className='bx bxs-user-circle profile-photo' ></i>

                            }

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
                                            onChange={(event) => setLocation(event.target.value)}
                                            placeholder={user_details.location ? user_details.location : 'Add your location'} /> :
                                            <p className='sub-heading' style={user_details.location ? {} : { color: 'grey' }}>
                                                {user_details.location ? user_details.location : 'Add your location'}</p>

                                    }


                                </section>
                                <section>

                                    <p className='heading'>Age</p>
                                    {

                                        edit ? <input className='inp-bx' type="number" value={age}
                                            onChange={(event) => setAge(event.target.value)}
                                            placeholder={user_details.age ? user_details.age : 'Add your age'} /> :
                                            <p className='sub-heading' style={user_details.age ? {} : { color: 'grey' }}>
                                                {user_details.age ? user_details.age : 'Add your age'}</p>

                                    }


                                </section>

                            </div>
                            <div>

                                <section>

                                    <p className='heading'>Experience</p>
                                    {

                                        edit ? <input className='inp-bx' type="text" value={experience}
                                            onChange={(event) => setExperience(event.target.value)}
                                            placeholder={user_details.experience ? user_details.experience
                                                : 'Add your experience'} /> :
                                            <p className='sub-heading' style={user_details.experience ? {} : { color: 'grey' }}>
                                                {user_details.experience ? user_details.experience : 'Add your experience'}</p>

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
                                <p className='sub-heading margin-left'>
                                    {user_details.job_applied ? user_details.job_applied : '0'}</p>

                            </section>
                            <section>

                                <p className='heading'>Job saved</p>
                                <p className='sub-heading margin-left'>
                                    {user_details.job_saved ? user_details.job_saved : '0'}</p>


                            </section>
                            <section>

                                <p className='heading'>Profile views</p>
                                <p className='sub-heading margin-left'>
                                    {user_details.profile_views ? user_details.profile_views : '0'}</p>

                            </section>

                        </div>

                    </div>

                </div>

                <div id="profile-summary">

                    <p className="heading">Profile summary</p>
                    <div className="summary">

                        {

                            edit ? <textarea className='text-area' value={summary}
                                onChange={(event) => setSummary(event.target.value)}
                                style={{ marginBottom: '-15px' }}
                                placeholder={user_details.summary ? user_details.summary : 'Tell us about yourself'}></textarea> :
                                <p className='sub-heading' style={user_details.summary ? { color: 'black' } :
                                    summary === '' ? { color: 'grey' } : {}} >
                                    {
                                        user_details.summary ? user_details.summary :
                                            summary === '' ? 'Add a profile summary' : summary

                                    }
                                </p>


                        }

                    </div>

                </div>

                <div className="summary">

                    { image_URL ? <p>{ image_URL }</p> : '' }
                    {

                        certificate_url_list ?
                        
                            certificate_url_list.map( ( objects , index ) => {

                                <div key={index}>

                                    <p >{ objects.url }</p>
                                    <p>{ objects.text }</p>

                                </div>
                                

                            } )
                        
                        : ''

                    }

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

                            (user_details.educational_qualification !== undefined &&
                                user_details.educational_qualification.length > 0) ?

                                user_details.educational_qualification.map((objects, index) => (

                                    <div className='objects' key={index}>
                                        <div>
                                            <p>{objects.text}</p>
                                            <p>{objects.institution}</p>
                                        </div>
                                        {input_box1 && <i class='bx bx-x' onClick={() => deleteItem('education', objects.id)}></i>}
                                    </div>

                                ))

                                :
                                edu_list.map((objects, index) => (

                                    <div className='objects' key={index}>
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

                            (user_details.skills !== undefined && user_details.skills.length > 0) ?

                                user_details.skills.map((objects, index) => (

                                    <div className='objects' key={index}>
                                        <p >{objects.text}</p>
                                        {input_box2 && <i class='bx bx-x' onClick={() => deleteItem('skill', objects.id)}></i>}
                                    </div>

                                ))

                                :

                                skill_list.map((objects, index) => (

                                    <div className='objects' key={index}>
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

                            <div style={{ display: 'grid', rowGap: '7px', marginTop: '5px' }}>

                                <div style={{ display: 'flex' }} >

                                    <button id='choose_certificate-btn'
                                        onClick={() => document.querySelector("#choose_certificate").click()}>

                                        <input type="file" name="" id="choose_certificate"
                                            onChange={

                                                (event) => {

                                                    setCertificate(event.target.files[0])
                                                    setCertificateName(event.target.files[0].name)

                                                }

                                            } hidden />
                                        Choose certificate

                                    </button>
                                    <p style={{ width: 'fit-content', height: 'fit-content', margin: '8.5px 0px 0px 10px' }}>
                                        {certificate_name}</p>

                                </div>
                                <input type="text" className="text-area" style={{ marginBottom: '15px' }} value={certificate_title}
                                    placeholder='Add title of certificate'
                                    onChange={(event) => setCertificateTitle(event.target.value)} />

                            </div>

                        }
                        <div id="certificate_listings">
                            {

                                (user_details.certificates !== undefined && user_details.certificates.length > 0) ?

                                    user_details.certificates.map((objects, index) => (

                                        <div className='objects' key={index}>

                                            <button className='certificate-listing-btn' onClick={() => {

                                                window.open(objects.url, '_blank')

                                            }} >{objects.text}</button>
                                            {input_box5 && <i class='bx bx-x'
                                                onClick={() => deleteItem('certificates', objects.id)}></i>}

                                        </div>

                                    ))

                                    :
                                    certificate_list.map((objects, index) => (

                                        <div className='objects' key={index}>

                                            {objects.preview ?

                                                <button className='certificate-listing-btn' onClick={() => {

                                                    window.open(URL.createObjectURL(objects.preview), '_blank')

                                                }} >{objects.text}</button> : ''

                                            }
                                            {input_box5 && <i class='bx bx-x' onClick={() => deleteItem('certificates', objects.id)}></i>}

                                        </div>

                                    ))

                            }
                        </div>
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

                            (user_details.projects !== undefined && user_details.projects.length > 0) ?

                                user_details.projects.map((objects, index) => (

                                    <div className='objects' key={index}>
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

                                :
                                project_list.map((objects, index) => (

                                    <div className='objects' key={index}>
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

                            (user_details.languages_known !== undefined && user_details.languages_known.length > 0) ?

                                user_details.languages_known.map((objects, index) => (

                                    <div className='objects' key={index}>
                                        <p>{objects.text}</p>
                                        {input_box4 && <i class='bx bx-x' onClick={() => deleteItem('language', objects.id)}></i>}
                                    </div>

                                ))

                            :

                            language_list.map((objects, index) => (

                                <div className='objects' key={index}>
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
                            <a rel='noreferrer' target='_blank' href={user_details.url}>{resume_name}</a>
                        </button>

                    </div>

                    {edit && <button id="save" onClick={saveChanges}>Save changes</button>}

                </div>

            </div>

        </div>

    )

}

export default SeekerProfile