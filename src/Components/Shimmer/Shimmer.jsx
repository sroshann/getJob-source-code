import React from 'react'
import './Shimmer.css'

function Shimmer( props ) {

    const { saved } = props

    return (

        <div id='shimmer'>

            <div className="shimmer-container" >

                <section>

                    <div className='shimmer-company-detail'>

                        <div className='shimmer-objects job-name'></div>
                        <div className='shimmer-objects company-name'></div>

                    </div>
                    <div className="shimmer-others">

                        <div className="shimmer-objects others"></div>
                        <div className="shimmer-objects others"></div>
                        <div className="shimmer-objects others"></div>

                    </div>
                    <div className="shimmer-objects job-skill"></div>
                    <div className="shimmer-date-save">

                        <div className='shimmer-objects date'></div>
                        { saved && <div className='shimmer-objects shimmer-save'></div>}

                    </div>

                    <section className="shimmer-animation"></section>

                </section>

            </div>

            <div className="shimmer-container" >

                <section>

                    <div className='shimmer-company-detail'>

                        <div className='shimmer-objects job-name'></div>
                        <div className='shimmer-objects company-name'></div>

                    </div>
                    <div className="shimmer-others">

                        <div className="shimmer-objects others"></div>
                        <div className="shimmer-objects others"></div>
                        <div className="shimmer-objects others"></div>

                    </div>
                    <div className="shimmer-objects job-skill"></div>
                    <div className="shimmer-date-save">

                        <div className='shimmer-objects date'></div>
                        { saved && <div className='shimmer-objects shimmer-save'></div>}

                    </div>

                    <section className="shimmer-animation"></section>

                </section>

            </div>

            <div className="shimmer-container" >

                <section>

                    <div className='shimmer-company-detail'>

                        <div className='shimmer-objects job-name'></div>
                        <div className='shimmer-objects company-name'></div>

                    </div>
                    <div className="shimmer-others">

                        <div className="shimmer-objects others"></div>
                        <div className="shimmer-objects others"></div>
                        <div className="shimmer-objects others"></div>

                    </div>
                    <div className="shimmer-objects job-skill"></div>
                    <div className="shimmer-date-save">

                        <div className='shimmer-objects date'></div>
                        { saved && <div className='shimmer-objects shimmer-save'></div>}

                    </div>

                    <section className="shimmer-animation"></section>

                </section>

            </div>

        </div>

    )
}

export default Shimmer