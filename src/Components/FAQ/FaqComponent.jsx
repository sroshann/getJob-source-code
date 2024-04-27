import React from 'react'
import './FaqComponent.css'

function FaqComponent() {

    return (

        <div id='faq-body'>

            <div className="faq-head">
                <h1>Frequently Asked Questions</h1>
            </div>

            <div className="faq-content">

                <p className="question">How do I create an account? 
                <i className='bx bx-plus'></i></p>
                <p className="answer">To create an account, simply click on the "Sign Up" button on the homepage and follow the prompts to provide your necessary information. Once completed, you'll have access to our job portal services.</p>

                <p className="question">I forgot my password. What should I do? <i className='bx bx-plus'></i></p>
                <p className="answer">If you've forgotten your password, you can click on the "Forgot Password" link on the login page. Follow the instructions to reset your password via email.</p>

                <p className="question">How can I update my profile? <i className='bx bx-plus'></i></p>
                <p className="answer">To update your profile, log in to your account and navigate to the "Profile" section. Here, you can edit and update your personal information, skills, experience, and any other relevant details.</p>

                <p className="question">How do I search for jobs? <i className='bx bx-plus'></i></p>
                <p className="answer">You can search for jobs by using the search bar on the homepage. Enter keywords, location, or specific job titles to find relevant listings. Additionally, you can browse through job categories or use advanced filters for a more refined search.</p>

                <p className="question">What should I do if I encounter technical issues? <i className='bx bx-plus'></i></p>
                <p className="answer">If you encounter any technical issues while using our job portal, please contact our support team at [support email] or through the "Contact Us" page. Be sure to provide detailed information about the problem you're experiencing for prompt assistance.</p>

                <p className="question">How do I apply for a job? <i className='bx bx-plus'></i></p>
                <p className="answer">Once you find a job listing that interests you, click on the "Apply Now" button and follow the instructions to submit your application. Some employers may require additional documents or information, so be sure to review the job posting carefully.</p>

                <p className="question">Can I save job listings for later? <i className='bx bx-plus'></i></p>
                <p className="answer">Yes, you can save job listings by clicking on the "Save" or "Bookmark" button next to the job posting. This allows you to easily access and review saved listings at a later time.</p>

                <p className="question">Is there a fee for using the job portal? <i className='bx bx-plus'></i></p>
                <p className="answer">No, our job portal is free for job seekers. There are no hidden fees for creating an account, searching for jobs, or applying to job listings.</p>

                <p className="question">How can I get notified about new job opportunities? <i className='bx bx-plus'></i></p>
                <p className="answer">You can opt-in to receive email notifications for new job opportunities that match your preferences. Simply adjust your notification settings in the "Account Settings" section to receive updates.</p>

                <p className="question">How can I delete my account? <i className='bx bx-plus'></i></p>
                <p className="answer">If you wish to delete your account, please contact our support team with your request. We will assist you in permanently deleting your account and associated data from our system.</p>


            </div>

        </div>

    )

}

export default FaqComponent