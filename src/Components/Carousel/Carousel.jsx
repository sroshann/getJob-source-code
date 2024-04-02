import React, { useState, useEffect } from 'react'
import './Carousel.css'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css/bundle';
import image from '../../Images/web-design-ja.png'
import image2 from '../../Images/employer-ad.svg'
import roshan from '../../Images/roshan.jpg'
import jenna from '../../Images/jenna.jpg'
import shibin from '../../Images/shibin.jpg'
import shifadh from '../../Images/shifadh.png'
import nizam from '../../Images/nizam.jpg'
import { useNavigate } from 'react-router-dom';

function Carousel() {

    const [slides, setSlides] = useState(0)
    const navigate = useNavigate()

    useEffect(() => {

        windowWidth()
        window.addEventListener('resize', windowWidth)


        return () => {

            window.removeEventListener('resize', windowWidth);

        }

    }, [])

    const windowWidth = () => {

        const width = window.innerWidth
        if (width <= 767) setSlides(2)
        else if ((width >= 768) && (width <= 991)) setSlides(3)
        else setSlides(4)

    }

    return (

        <div id='carousel'>

            <section id="start-career">

                <div id='texts-section'>

                    <div>

                        <h1>Start your career now!</h1>
                        <button onClick={() => { navigate('/signup') }} >Register </button>

                    </div>

                </div>
                <div id='image-section'>

                    <img id='start-career-image' src={image} alt="" />

                </div>

            </section>

            <h3>Top companies hiring now</h3>

            <div id="swiper-body">

                <Swiper
                    modules={[Autoplay]}
                    autoplay={{ delay: 1800 } }
                    spaceBetween={0}
                    slidesPerView={[slides]}
                    loop={true}
                // onSlideChange={() => console.log('slide change')}
                // onSwiper={(swiper) => console.log(swiper)}
                >
                    <SwiperSlide>

                        <div className='carousel-body'>

                            <div>

                                <img src={roshan} alt="Roshan" />
                                <p className='company-name'>Rosh Tech</p>
                                <p className='location'>Manjeri</p>

                            </div>

                        </div>

                    </SwiperSlide>
                    <SwiperSlide>

                        <div className='carousel-body'>

                            <div>

                                <img src={jenna} alt="Jennath" />
                                <p className='company-name'>Cyber Jenn</p>
                                <p className='location'>Kottakal</p>

                            </div>

                        </div>

                    </SwiperSlide>
                    <SwiperSlide>

                        <div className='carousel-body'>

                            <div>

                                <img src={shibin} alt="Shibin" />
                                <p className='company-name'>Shibin Sign</p>
                                <p className='location'>Unniyal</p>

                            </div>

                        </div>

                    </SwiperSlide>
                    <SwiperSlide>

                        <div className='carousel-body'>

                            <div>

                                <img src={shifadh} alt="Shifadh" />
                                <p className='company-name'>Shifa Learn</p>
                                <p className='location'>Thalakadathur</p>

                            </div>

                        </div>

                    </SwiperSlide>
                    <SwiperSlide>

                        <div className='carousel-body'>

                            <div>

                                <img src={nizam} alt="Nizam" />
                                <p className='company-name'>Nizflix</p>
                                <p className='location'>Tirur</p>

                            </div>

                        </div>

                    </SwiperSlide>
                    {/* <SwiperSlide>

                        <div className='carousel-body'>



                        </div>

                    </SwiperSlide> */}

                </Swiper>

            </div>



            <section id='hire-talents' >

                <div id="hire-image-section">

                    <img id='hire-image' src={image2} alt="" />

                </div>
                <div id="hire-text-section">

                    <div>

                        <h1>Hire the best talents.</h1>
                        <button onClick={() => { navigate('/signup') }}>Post a job</button>

                    </div>

                </div>

            </section>

        </div>

    )

}

export default Carousel