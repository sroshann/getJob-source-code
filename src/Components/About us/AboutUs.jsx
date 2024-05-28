import React from 'react'
import './AboutUs.css'
import roshan from '../../Images/roshan-img.jpg'
import jenna from '../../Images/jenna-img.jpg'
import nizam from '../../Images/nizam-img.jpg'
import shibin from '../../Images/smile.JPG'
import shifadh from '../../Images/shifadh-img.jpg'
import earth from '../../Images/earth.gif'
import phone from '../../Images/phone-contact.gif'
import mail from '../../Images/email.gif'

function AboutUs() {

    return (

        <div id='about-root'>

            <div className="about-head">
                <h1>About Us</h1>
            </div>

            <div className="content">
                <p>
                    Welcome to getJob, your premier destination for finding employment opportunities tailored to your skills,
                    interests, and career goals. At getJob, we understand that the job search process can be daunting and overwhelming.
                    That's why we're here to simplify it for you.
                </p>
                <p>
                    <span>Our Mission:</span>
                    getJob is dedicated to revolutionizing the way individuals discover and secure employment opportunities.
                    We strive to bridge the gap between talented professionals and organizations seeking top-tier talent.
                    Our mission is to empower individuals to find fulfilling careers and enable companies to build successful teams.
                </p>
                <p>
                    <span>How We Work:</span>
                    getJob utilizes cutting-edge technology and innovative algorithms to match candidates with suitable job openings.
                    Our platform employs advanced filtering mechanisms to ensure that you only see job listings that align with your qualifications and preferences.
                    Whether you're a recent graduate exploring entry-level positions or a seasoned professional seeking new challenges, getJob has something for everyone.
                </p>

                <p>
                    <span>Why Choose getJob:</span>

                    <span className="hsub">Personalized Experience:</span>  We believe in the power of customization. With getJob, you'll receive personalized job recommendations
                    based on your skills, experience, and career aspirations.
                    <br /> <br />

                    <span className="hsub">Comprehensive Job Listings:</span> Our extensive database features a wide range of job opportunities across various industries and sectors.
                    From full-time positions to freelance gigs, we've got you covered.
                    <br /> <br />

                    <span className="hsub">User-Friendly Interface:</span> Navigating the job search process should be effortless. That's why we've designed getJob with a user-friendly
                    interface, making it easy for you to browse, apply, and track your applications seamlessly.
                    <br /> <br />

                    <span className="hsub">Career Resources:</span> In addition to job listings, getJob offers a wealth of resources to support your career development journey.
                    From resume writing tips to interview preparation guides, we provide the tools you need to succeed.
                    <br /> <br />
                    <span className="hsub">Responsive Support:</span> Have a question or need assistance? Our dedicated support team is here to help.
                    Whether you're facing technical issues or need guidance on optimizing your job search strategy, we're just a message away.
                </p>

            </div>

            <div className="grp-members" id="grp-members">
                <h2>Team <span>Members</span></h2>

                <div className="members">
                    <div className="member">
                        <img src={roshan} alt="" />
                        <p className="mName">Shamil Roshan N</p>
                        <div className="media">
                            <i className='bx bxl-whatsapp'></i>
                            <i className='bx bxl-instagram'></i>
                            <i className='bx bxl-linkedin'></i>
                            <i className='bx bx-globe' ></i>
                        </div>
                    </div>
                    <div className="member">
                        <img src={jenna} alt="" />
                        <p className="mName">Jennath Shirin KT</p>
                        <div className="media">
                            <i className='bx bxl-whatsapp'></i>
                            <i className='bx bxl-instagram'></i>
                            <i className='bx bxl-linkedin'></i>
                            <i className='bx bx-globe' ></i>
                        </div>
                    </div>
                    <div className="member">
                        <img src={nizam} alt="" />
                        <p className="mName">Mohammed Nizam</p>
                        <div className="media">
                            <i className='bx bxl-whatsapp'></i>
                            <i className='bx bxl-instagram'></i>
                            <i className='bx bxl-linkedin'></i>
                            <i className='bx bx-globe' ></i>
                        </div>
                    </div>
                    <div className="member">
                        <img src={shibin} alt="" />
                        <p className="mName">Shibin MP</p>
                        <div className="media">
                            <i className='bx bxl-whatsapp'></i>
                            <i className='bx bxl-instagram'></i>
                            <i className='bx bxl-linkedin'></i>
                            <i className='bx bx-globe' ></i>
                        </div>
                    </div>
                    <div className="member">
                        <img src={shifadh} alt="" />
                        <p className="mName">Mohamed Shifadh</p>
                        <div className="media">
                            <i className='bx bxl-whatsapp'></i>
                            <i className='bx bxl-instagram'></i>
                            <i className='bx bxl-linkedin'></i>
                            <i className='bx bx-globe' ></i>
                        </div>
                    </div>
                </div>

            </div>

            <div id='contact-us'>

                <h1 className="conatctHead" id='contactH'>Contact Us</h1>

                <div className="contact" id='contact'>
                    <div className="address">
                        <img src={earth} alt="" />
                        <p className="name">Address</p>
                        <p className="info">SSM Polytechnic College, Tirur</p>
                    </div>
                    <div className="conatctNum">
                        <img src={phone} alt="" />
                        <p className="name">Call Us</p>
                        <p className="info">9995415110</p>
                    </div>
                    <div className="email">
                        <img src={mail} alt="" />
                        <p className="name">Email</p>
                        <p className="info">getjob@info.com</p>
                    </div>
                </div>

                <div className="contact-form">
                    <h1 className="formHead">Get in touch</h1>
                    <form action="">
                        <input type="text" name="name" placeholder="Enter you name" id="" required />
                        <span>
                            <input type="tel" name="phone" id="" placeholder="Phone number" required />
                            <input type="email" name="email" id="" placeholder="Email" required />
                        </span>

                        <textarea name="message" id="" cols="30" rows="10" placeholder="Your message" required></textarea>
                        <button type="submit"><i className='bx bx-envelope' style={{ fontSize: 'larger' }}></i>Send Message</button>
                    </form>

                </div>

            </div>


        </div>

    )

}

export default AboutUs