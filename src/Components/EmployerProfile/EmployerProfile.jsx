import React, { useEffect, useState } from 'react'
import './EmployerProfile.css'
import { collection, getDocs, query, where } from 'firebase/firestore';
import { FirebaseFirestore } from '../../FIrebase/Configueration';


function EmployerProfile() {

  const [user_data, setUserData] = useState([]) // Inorder to store details of user 

  const [updated_username, setUdatedUsername] = useState('') // To store new username
  const [contact_person, setContactPerson] = useState('') //To store name of contact person
  const [updated_number, setUPdatedNumber] = useState('') //To store new phone number
  const [address, setAddress] = useState('') //To store address
  const [website, setWebsite] = useState('') // To store website URL
  const [summary, setSummary] = useState('') // To store summary
  const [image, setImage] = useState(null) // Inorder to store profile image


  const [edit, setEdit] = useState(false)

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

        })

      })

    }

  }


  const emoloyerAddItems = () => {

    setWRDMList([...wrdm_list, { id: Date.now(), text: working_domain }])
    setWorkinDomain('')

  }

  const employerDeleteItems = (value) => {

    setWRDMList(wrdm_list.filter(selected => {

      if (selected.id === value) selected = null
      return selected

    }))

  }


  useEffect(() => {

    getUserData()


    // avoidDataLoseOnEdit
    setUdatedUsername(user_data.username)
    // This also should be added for PROFILE PICTURE after uploading it into firestore
    setContactPerson(user_data.contact_person)
    setUPdatedNumber(user_data.phone_number)
    // ADDRESS
    // WEBSITE
    // SUMMARY

    // return () => {
    //   second
    // }


  }, [user_data.username, user_data.contact_person, user_data.phone_number])

  return (

    <section id='root-body'>

      <div id="container">

        <section id="upper-container">

          <section id="photo">

            <div>

              {

                image ? <img src={URL.createObjectURL(image)} alt="DP" className='employer-dp' /> :
                  <i className='bx bxs-user-circle profile-icon' ></i>

              }

              {

                edit && <p id='choose-dp-text' style={image ? {} : { marginTop: '-13px' }}
                  onClick={() => { document.querySelector("#choose-dp").click() }} >

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

                <div>

                  <p className="heading">Address</p>
                  {

                    edit ? <textarea name="" value={address}
                      className='employer-text-area'
                      placeholder='Add address'
                      onChange={(event) => setAddress(event.target.value)}></textarea> :
                      <p className="sub-heading" style={user_data.address ? {} : { color: 'grey' }}>
                        {user_data.address ? user_data.address : 'Provide your address'}</p>

                  }

                </div>

                <div>

                  <p className='heading'>Website</p>
                  {

                    edit ? <input type="url" name="" value={website}
                      className='inp-bx'
                      placeholder='Add website URL'
                      onChange={(event) => setWebsite(event.target.value)} /> :
                      <a href={user_data.website}
                        rel='noreferrer' target='_blank'>
                        <p className="sub-heading" style={user_data.website ? {} : { color: 'grey' }}>
                          {user_data.website ? <><i class='bx bx-link'></i> {user_data.website}</> :
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
                  style={{ width: '175px' }}
                  placeholder='Add your working domain'
                  onChange={(event) => setWorkinDomain(event.target.value)} />
                <i class='bx bx-check tick' onClick={emoloyerAddItems}></i>

              </div>

            }

            {

              wrdm_list.map((objects, index) => (

                <div className="employer-objects" key={index}>

                  <p>{objects.text}</p>
                  {wrdm &&
                    <i class='bx bx-x x' onClick={() => employerDeleteItems(objects.id)}></i>
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
                <p className="sub-heading">{ user_data.job_posted ? user_data.job_posted : '0' }</p>
              </div>

            </section>
            <section>

              <div>
                <p className="heading">Applications</p>
                <p className="sub-heading">{user_data.applications?user_data.applications:'0'}</p>
              </div>

            </section>
            <section>

              <div>
                <p className='heading'>Hired</p>
                <p className="sub-heading">{ user_data.hired ? user_data.hired : '0' }</p>
              </div>

            </section>

          </div>

          { edit &&

            <div id="employer-save-changes">

              <button className='employer-save'>Apply changes</button>
              <button className="employer-save">Save changes</button>

            </div>

          }

        </section>

      </div>

    </section>

  )

}

export default EmployerProfile