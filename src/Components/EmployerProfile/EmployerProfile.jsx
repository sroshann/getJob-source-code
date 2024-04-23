import React, { useEffect, useState } from 'react'
import './EmployerProfile.css'
import { collection, getDocs, query, updateDoc, where } from 'firebase/firestore';
import { FirebaseFirestore, FirebaseStorage } from '../../FIrebase/Configueration';
import toast, { Toaster } from 'react-hot-toast'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

function EmployerProfile() {

  const [user_data, setUserData] = useState([]) // Inorder to store details of user 

  const [updated_username, setUdatedUsername] = useState('') // To store new username
  const [contact_person, setContactPerson] = useState('') //To store name of contact person
  const [updated_number, setUPdatedNumber] = useState('') //To store new phone number
  const [location, setlocation] = useState('') //To store location
  const [website, setWebsite] = useState('') // To store website URL
  const [summary, setSummary] = useState('') // To store summary
  const [image, setImage] = useState(null) // Inorder to store profile image
  const [imageURL, setImageURL] = useState('') // To store profile pictire URL
  const [jobsPosted, setJobPosted] = useState(0)
  const [applicants, setApplicants] = useState(0)


  const [edit, setEdit] = useState(false)
  const [profileEdit, setProfileEdit] = useState(false)

  const [wrdm, setWRDM] = useState(false)
  const [working_domain, setWorkinDomain] = useState('') // To store working domain
  const [wrdm_list, setWRDMList] = useState([]) // To store array of working domains


  const getUserData = async () => { // This function in used to fetch the user data after updating profile

    const storedUserData = localStorage.getItem('userData'); // fetching data from localstorage
    if (storedUserData) {

      const parsedUserData = JSON.parse(storedUserData);

      const user_ref = collection(FirebaseFirestore, 'Users')  // Selects the collection
      const condition = where('email', '==', parsedUserData.email) // Providing the condition for selecting the user
      const selected_user = query(user_ref, condition) // Selects the user from the total collection

      await getDocs(selected_user).then((user_data) => {

        user_data.forEach(doc => {

          setUserData(doc.data()) // The each fields of data are stored into a state
          // console.log( doc.data() )

        })

      })


      // This will find number of jobs posted by the user
      const jobRef = collection(FirebaseFirestore, 'Jobs')
      const jobCondition = where('userEmail', '==', parsedUserData.email)
      const selectedJobs = query(jobRef, jobCondition)

      const jobData = await getDocs(selectedJobs)
      const allJobs = jobData.docs.map(values => ({

        ...values.data()

      }))
      setJobPosted(allJobs.length)

      let sum = 0
      allJobs.map((objects) => { sum = sum + objects.appliedSeekers.length })
      setApplicants( sum )

    }

  }


  const emoloyerAddItems = () => {

    if (user_data.workingDomains !== undefined && user_data.workingDomains.length > 0) {

      const updatedWorkingDomains = [...user_data.workingDomains, { id: Date.now(), text: working_domain }]
      setWRDMList(updatedWorkingDomains)
      setWorkinDomain('')

      setUserData((prevData) => ({ // To render on deletion

        ...prevData,
        workingDomains: updatedWorkingDomains

      }))

    } else {

      setWRDMList([...wrdm_list, { id: Date.now(), text: working_domain }])
      setWorkinDomain('')

    }

  }

  const employerDeleteItems = (section, value) => {

    if (section === 'databaseList') {

      let updatedWorkingDomains = user_data.workingDomains.filter(selected => {

        if (selected.id === value) selected = null
        return selected

      })

      setWRDMList(updatedWorkingDomains)

      setUserData((prevData) => ({ // To render on deletion

        ...prevData,
        workingDomains: updatedWorkingDomains

      }))

    } else if (section === 'localList') {

      setWRDMList(wrdm_list.filter(selected => {

        if (selected.id === value) selected = null
        return selected

      }))

    }

  }

  const applyChanges = async () => {

    if (profileEdit) { // Inorder to avoid direct uploading of existing docs when clicking apply
      // changes button without making any changes in profile picture

      try {

        if (image === null)
          return toast.error('Image is not selected', { style: { fontSize: '14px' } })

        else {

          const loadingToast = toast.loading('Please wait this will take seconds')
          const dpRef = ref(FirebaseStorage,
            `Profile pictures/${user_data.user_type}/${user_data.email}/${image.name}`)

          const response = await uploadBytes(dpRef, image)
          const imageLink = await getDownloadURL(response.ref)
          setImageURL(imageLink)
          console.log(imageLink)
          toast.remove(loadingToast)
          toast.success('Profile is updated', { style: { fontSize: '14px' } })

        }

      } catch (error) { toast.error(error.message, { style: { fontSize: '14px' } }) }

    } else { toast.success('Profile is updated', { style: { fontSize: '14px' } }) }

  }

  const saveChanges = async () => {

    try {

      if (updated_username === '' || contact_person === '' || updated_number === '' || location === '' || summary === '' ||
        imageURL === '' || wrdm_list.size === 0) return toast.error('Complete all fields', { style: { fontSize: '14px' } })

      else {

        const loadingToast = toast.loading('Saving changes')
        const user_ref = collection(FirebaseFirestore, 'Users')  // Selects the collection
        const condition = where('email', '==', user_data.email) // Providing the condition for selecting the user
        const selected_user = query(user_ref, condition) // Selects the user from the total collection

        await getDocs(selected_user).then(async (userDocument) => {

          const userDocRef = userDocument.docs[0].ref
          const changingObject = {

            profile_picture: imageURL,
            username: updated_username,
            contact_person: contact_person,
            phone_number: updated_number,
            location,
            website,
            summary,
            workingDomains: wrdm_list,
            job_posted: 0,
            applications: 0,
            hired: 0

          }

          await updateDoc(userDocRef, changingObject).then(() => {

            setEdit(false)
            setProfileEdit(false)
            setWRDM(false)
            getUserData()
            toast.remove(loadingToast)
            toast.success('Changes applied', { style: { fontSize: '14px' } })

          }).catch((error) => toast.error('Data are not updated', { style: { fontSize: '14px' } }))

        }).catch((error) => console.log(error.message, 'Error with getdocs'))

      }

    } catch (error) { toast.error(error.message, { style: { fontSize: '14px' } }) }

    // console.log( location )

  }

  useEffect(() => {

    getUserData()

    // avoidDataLoseOnEdit
    setUdatedUsername(user_data.username)
    setContactPerson(user_data.contact_person)
    setUPdatedNumber(user_data.phone_number)
    if (user_data.profile_picture) setImageURL(user_data.profile_picture)
    if (user_data.location) setlocation(user_data.location)
    if (user_data.website) setWebsite(user_data.website)
    if (user_data.summary) setSummary(user_data.summary)

    if (user_data.workingDomains && user_data.workingDomains.length > 0)
      setWRDMList(previous => [...previous, ...user_data.workingDomains])

    // return () => {
    //   second
    // }


  }, [user_data.username, user_data.contact_person, user_data.phone_number, user_data.location, user_data.website, user_data.summary])

  return (

    <section id='root-body'>

      <div id="employer-container">

        <section id="upper-container">

          <section id="photo">

            <div>

              {

                user_data.profile_picture ? <img src={user_data.profile_picture} alt="DP" className='employer-dp' /> :
                  image ? <img src={URL.createObjectURL(image)} alt="DP" className='employer-dp' /> :
                    <i className='bx bxs-user-circle profile-icon' ></i>

              }

              {

                edit && <p id='choose-dp-text' style={image ? {} : { marginTop: '-13px' }}
                  onClick={() => {

                    document.querySelector("#choose-dp").click()
                    setProfileEdit(true)

                  }} >

                  <input type="file" name="" id="choose-dp" accept="image/*" hidden
                    onChange={(event) => {

                      user_data.profile_picture = null
                      setImage(event.target.files[0])
                    }

                    } />
                  Choose profile picture

                </p>

              }

              {/* <p id='username'>Username</p> */}

            </div>

          </section>
          <section id="details">

            <section id='section-username'>

              {

                edit ? <input type="text" name="" id="" value={updated_username}
                  className='inp-bx-username'
                  onChange={(event) => setUdatedUsername(event.target.value)}
                  placeholder='Full name' /> :
                  <p id="employer-name">{user_data.username}</p>

              }

            </section>
            <div id='details-content'>

              <section id='upper-details-content'>

                <div>

                  <p className="heading">Email</p>
                  <p className="sub-heading">{user_data.email}</p>

                </div>
                <div>

                  <p className="heading">Contact Person</p>
                  {

                    edit ? <input type="text" name="" value={contact_person}
                      className='inp-bx'
                      placeholder='Add name'
                      onChange={(event) => setContactPerson(event.target.value)} /> :
                      <p className="sub-heading">{user_data.contact_person}</p>

                  }

                </div>
                <div>

                  <p className="heading">Contact number</p>
                  {

                    edit ? <input type="number" name="" value={updated_number}
                      className='inp-bx'
                      placeholder='Add phone number'
                      onChange={(event) => setUPdatedNumber(event.target.value)} /> :
                      <p className="sub-heading">{user_data.phone_number}</p>

                  }

                </div>

              </section>
              <section id='lower-details-content'>

                <div style={{ width: '305px' }}>

                  <p className="heading">Location</p>
                  {

                    edit ? <input type='text' value={location}
                      className='inp-bx'
                      placeholder='Add location'
                      onChange={(event) => setlocation(event.target.value)} /> :
                      <p className="sub-heading" style={user_data.location ? {} : { color: 'grey' }}>
                        {user_data.location ? user_data.location : 'Provide your location'}</p>

                  }

                </div>

                <div>

                  <p className='heading'>Website</p>
                  {

                    edit ? <input type="url" name="" value={website}
                      className='inp-bx'
                      placeholder='Add website URL'
                      onChange={(event) => setWebsite(event.target.value)} /> :
                      <a href={'https://' + user_data.website}
                        rel='noreferrer' target='_blank'>
                        <p className="sub-heading" style={user_data.website ? { cursor: 'pointer' } : { color: 'grey' }}>
                          {user_data.website ? <><i className='bx bx-link'></i> {user_data.website}</> :
                            'Add your website URL for more information'}</p>
                      </a>

                  }

                </div>

              </section>

            </div>

          </section>

          <i className='bx bxs-edit employer-edit' onClick={() => {

            if (edit) setEdit(false)
            else setEdit(true)

          }} ></i>

        </section>
        <section id="middle-container">

          <p className="heading">Profile summary</p>
          <div id="employer-summary">

            {

              edit ? <textarea name="" value={summary}
                className='employer-text-area'
                style={{ width: '100%', marginBottom: '-15px' }}
                placeholder='Add profile summary'
                onChange={(event) => setSummary(event.target.value)}></textarea> :
                <p className='sub-heading' style={user_data.summary ? {} : { color: 'grey' }}>
                  {user_data.summary ? user_data.summary : 'Tell us about yourself'}
                </p>

            }

          </div>

        </section>
        <section id="lower-container">

          <div id="working-domains">

            <p style={edit ? { marginBottom: '-15px' } : {}} className="heading">Working domains</p>
            {edit && <i onClick={() => setWRDM(true)} class='bx bx-plus employer-plus-btn'></i>}
            {wrdm &&

              <div style={{ display: 'flex', columnGap: '5px' }}>

                <input type="text" value={working_domain}
                  className='inp-bx'
                  style={{ width: '180px' }}
                  placeholder='Add your working domain'
                  onChange={(event) => setWorkinDomain(event.target.value)} />
                <i class='bx bx-check tick' onClick={emoloyerAddItems}></i>

              </div>

            }

            {

              (user_data.workingDomains !== undefined && user_data.workingDomains.length > 0) ?

                user_data.workingDomains.map((objects, index) => (

                  <div className="employer-objects" key={index}>

                    <p>{objects.text}</p>
                    {wrdm &&
                      <i class='bx bx-x x' onClick={() => employerDeleteItems('databaseList', objects.id)}></i>
                    }

                  </div>

                ))

                :
                wrdm_list.map((objects, index) => (

                  <div className="employer-objects" key={index}>

                    <p>{objects.text}</p>
                    {wrdm &&
                      <i class='bx bx-x x' onClick={() => employerDeleteItems('localList', objects.id)}></i>
                    }

                  </div>

                ))

            }

            {wrdm &&

              <button className='employer-done-btn'
                onClick={() => setWRDM(false)}
              >Done</button>

            }

          </div>

          <hr className="employer-yellow" />

          <div id="job-details">

            <section>

              <div>
                <p className="heading">Job posted</p>
                <p className="sub-heading">{jobsPosted}</p>
              </div>

            </section>
            <section>

              <div>
                <p className="heading">Total applicants</p>
                <p className="sub-heading">{applicants}</p>
              </div>

            </section>
            <section>

              <div>
                <p className='heading'>Hired</p>
                <p className="sub-heading">{user_data.hired ? user_data.hired : '0'}</p>
              </div>

            </section>

          </div>

          {edit &&

            <div id="employer-save-changes">

              <button className='employer-save' onClick={applyChanges}>Apply changes</button>
              <button className="employer-save" onClick={saveChanges}>Save changes</button>

            </div>

          }

        </section>

      </div>

      <Toaster />

    </section>

  )

}

export default EmployerProfile