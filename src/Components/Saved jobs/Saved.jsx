import React, { useEffect, useState } from 'react'
import './Saved.css'
import { collection, getDocs, query, updateDoc, where } from 'firebase/firestore'
import { FirebaseFirestore } from '../../FIrebase/Configueration'
import toast, { Toaster } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

function Saved() {

  const [savedJobs, setSavedJobs] = useState([])

  const navigate = useNavigate()

  const getLocalEmail = () => {

    const localStorageData = localStorage.getItem('userData')
    if (localStorageData) {

      const parsedData = JSON.parse(localStorageData)
      return parsedData.email

    }

  }

  const getSavedJobs = async () => {

    const email = getLocalEmail()
    const ref = collection(FirebaseFirestore, 'Users')
    const condition = where('email', '==', email)
    const selectedUser = query(ref, condition)

    const userData = await getDocs(selectedUser)
    userData.forEach(doc => { setSavedJobs(doc.data().savedJobs) })

  }

  const unSave = async (object) => {

    const index = savedJobs.findIndex(value => value.jobID === object)
    let uploadArray = []

    const newArray = [...savedJobs]
    newArray.splice(index, 1)
    setSavedJobs(newArray)
    uploadArray = [...newArray]

    try {

      const email = getLocalEmail()
      const ref = collection(FirebaseFirestore, 'Users')
      const condition = where('email', '==', email)
      const selectedUser = query(ref, condition)

      await getDocs(selectedUser).then(async (userDocument) => {

        const userRef = userDocument.docs[0].ref
        await updateDoc(userRef, { savedJobs: uploadArray })
          .then(() => {

            toast.success('Job removed from saved collections', { style: { fontSize: '14px' } })

          })

      })

    } catch (error) { console.log(error) }

    getSavedJobs()

  }

  const pageView = (ID) => {

    localStorage.setItem('jobID', JSON.stringify(ID))
    navigate('/view')

  }

  useEffect(() => {

    getSavedJobs()

  }, [])


  return (

    <div id='main'>

      <section id='jobs-saved'>

        <div id="job-saved-listing">

          {

            savedJobs.length === 0 ? <div id="no-jobs"> <p>No jobs were found</p> </div>
              :
              savedJobs.map((objects, index) => (

                <div className="saved-job-objects" key={index} onClick={ () => pageView( objects.jobID ) }>

                  <section>

                    <div id='job-company-detail'>

                      <p id='saved-job-title'>{objects.jobTitle}</p>
                      <p id='saved-company-name'>{objects.companyName}</p>

                    </div>
                    <div id="other-details">

                      <div id="experience">

                        <i className='bx bx-briefcase-alt saved-grey'></i>
                        <p className='saved-grey'>{objects.experience}</p>

                      </div>
                      <p className="saved-grey">|</p>
                      <div id="salary">

                        <i className='bx bx-rupee saved-grey' ></i>
                        <p className='saved-grey'>{objects.salary ? objects.salary : 'Not desclosed'}</p>

                      </div>
                      <p className="saved-grey">|</p>
                      <div id="location">

                        <i className='bx bx-map saved-grey'></i>
                        <p className='saved-grey'>{objects.location}</p>

                      </div>

                    </div>
                    <div id="job-skills">

                      {

                        objects.skillsRequired.map((skillObj, index) => (

                          <div key={index}>

                            {index === 0 ? <></> : <i className='bx bx-wifi-0 saved-grey'></i>}
                            <p className='saved-grey'>{skillObj.text}</p>

                          </div>

                        ))

                      }

                    </div>
                    <div id="date-save">

                      <p className='saved-grey' style={{ fontSize: '12px' }}>{objects.postedOn}</p>
                      <div onClick={( event ) => {
                        
                        event.stopPropagation()
                        unSave(objects.jobID)
                        
                      }}>

                        <i className='bx bxs-bookmark saved-grey' ></i>
                        <p className='saved-grey'>Saved</p>
                        {/* .some check the provided condition is exist atleast one time in that array */}

                      </div>

                    </div>

                  </section>

                </div>

              ))

          }

        </div>

      </section>

      <Toaster />

    </div>

  )

}

export default Saved