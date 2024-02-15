import React, { useContext, useState } from 'react'
import './SeekerProfile.css'
import { UDContext } from '../../Context/User_details'

function SeekerProfile() {

    const [ edit , setEdit ] = useState( false )
    const [ new_username , setNewUsername ] = useState('')
    const [ new_phonenumber , setNewPhonenumber ] = useState('')
    const [ location , setLocation ] = useState('')
    const [ age , setAge ] = useState('')
    const [ experience , setExperience ] = useState('')
    const [ summary , setSummary ] = useState('')

    const { user_details } = useContext(UDContext);

    const enableEdit = () => {

        setEdit( true )

    }

  return (

    <div id='root-body'>
        
        <div id="containers">

            <div id="top-container">

                <div id="photo">

                    <div>

                        <i className='bx bxs-user-circle profile-photo' ></i>
                        { edit && <a href="" id='change-pic'>Change profile picture</a>}
                        { 
                            edit ? <input style={ { textAlign : 'center' , marginTop : '5px' , marginBottom : '5px' } } className = 'inp-bx' type="text" value={ new_username } onChange={ ( event ) => setNewUsername( event.target.value ) } placeholder={ user_details.username } /> : 
                            <p id='name' style={ edit ? {} : { marginTop: '-8px' } } >{ user_details.username }</p> 
                            
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
                                    
                                    edit ? <input className = 'inp-bx' type="number" value={ new_phonenumber } onChange={ ( event ) => setNewPhonenumber( event.target.value ) } placeholder={ user_details.phone_number } /> :
                                    <p className='sub-heading'>+91{ user_details.phone_number }</p>
                                    
                                }

                            </section>
                            <section>

                                <p className='heading'>Location</p>
                                {
                                    
                                    edit ? <input className = 'inp-bx' type="text" value={ location } onChange={ ( event ) => setLocation( event.target.value ) } placeholder='Enter your location' /> :
                                    <p className='sub-heading'>ADD</p>
                                    
                                }

                            </section>
                            <section>

                                <p className='heading'>Age</p>
                                {
                                    
                                    edit ? <input className = 'inp-bx' type="number" value={ age } onChange={ ( event ) => setAge( event.target.value ) } placeholder='Enter your age' /> :
                                    <p className='sub-heading'>0</p>
                                
                                }

                            </section>

                        </div>
                        <div>

                            <section>

                                <p className='heading'>Experience</p>
                                {
                                    
                                    edit ? <input className = 'inp-bx' type="text" value={ experience } onChange={ ( event ) => setExperience( event.target.value ) } placeholder='Enter your experience' /> :
                                    <p className='sub-heading'>ADD</p>
                                
                                }

                            </section>
                            <section id='margin-left'>

                                <p className='heading'>Email</p>
                                <p className='sub-heading'>{ user_details.email }</p>

                            </section>

                        </div>

                        <i class='bx bxs-edit edit' onClick={ enableEdit }></i>

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
            <div id="down-container">

                {/* <p>Profile summary</p>
                <p>Educational qualification</p>
                <p>Skills</p>
                <p>Projects</p>
                <p>Languages known</p>
                <p>Attatchements</p> */}

                <div id="profile-summary">

                    <p className="heading">Profile summary</p>
                    <div id="summary">

                        {
                            
                            edit ? <textarea id='text-area' value={ summary } onChange={ ( event ) => setSummary( event.target.value ) } 
                            style={ { marginBottom: '-15px' } } placeholder='Enter your summary'></textarea> :
                            <p className='sub-heading' >Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer 
                                took a galley of type and scrambled it to make a type specimen book. It has survived not only five 
                                centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
                            </p>

                        }

                    </div>

                </div>

                <hr className="yellow" />

                <div id="educational-qualifications">

                    <p style={ edit ? { marginBottom: '-15px' } : {} } className="heading">Educational qualifications</p>
                    { edit && <i class='bx bx-plus plus-btn'></i>}
                    <p>Govt Boys Higher Secondary School Manjeri</p>
                    <p>Seethi Sahib Memorial Polytechnic College Tirur</p>

                </div>

                <hr className="yellow" />

                <div id="skills">

                    <p style={ edit ? { marginBottom: '-15px' } : {} } className="heading">Skills</p>
                    { edit && <i class='bx bx-plus plus-btn'></i>}
                    <p>Wed development</p>
                    <p>Git</p>

                </div>

                <hr className="yellow" />

                <div id="projects">

                    <p style={ edit ? { marginBottom: '-15px' } : {} } className="heading">Projects</p>
                    { edit && <i class='bx bx-plus plus-btn'></i>}
                    <p><a href="https://sroshann.github.io/Netflix-Clone/">Netflix clone - https://sroshann.github.io/Netflix-Clone/</a></p>
                    <p><a href="https://sroshann.github.io/ToDo-List/">To-Do List - https://sroshann.github.io/ToDo-List/</a></p>

                </div>

                <hr className="yellow" />

                <div id="languages">

                    <p style={ edit ? { marginBottom: '-15px' } : {} } className="heading">Langiages known</p>
                    { edit && <i class='bx bx-plus plus-btn'></i>}
                    <p>English</p>
                    <p>Hindi</p>
                    <p>Malayalam</p>

                </div>

                <hr className="yellow" />

                <div id="attatchments">

                    <p className="heading">Attatchments</p>
                    <button id='attatchment-btns'>Resume</button>

                </div>

                { edit && <button id="save" onClick={ () => setEdit( false ) }>Save changes</button>}

            </div>

        </div>
        
    </div>

  )

}

export default SeekerProfile