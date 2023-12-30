import React, { useState , useEffect } from 'react'
import './Carousel.css'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css/bundle';

function Carousel() {

    const [ slides , setSlides ] = useState(0)

    useEffect(() => {

        windowWidth()
        window.addEventListener('resize', windowWidth)

        return () => {

            window.removeEventListener('resize', windowWidth);

        }

    }, [])

    const windowWidth = () => {

        const width = window.innerWidth
        if ( width <= 767 ) setSlides(2)
        else if ( ( width >= 768 ) && ( width <= 991 ) ) setSlides(3)
        else setSlides(4)

    }

    return (

        <div id='carousel'>

            <h3>Top companies hiring now</h3>

            <div id="swiper-body">

                <Swiper 
                    modules={[Autoplay]}  
                    autoplay={{delay:1800}}  
                    spaceBetween={0}
                    slidesPerView={[slides]}
                    loop={ true }
                    // onSlideChange={() => console.log('slide change')}
                    // onSwiper={(swiper) => console.log(swiper)}
                >
                    <SwiperSlide>

                        <div className='carousel-body'>



                        </div>

                    </SwiperSlide>
                    <SwiperSlide>

                        <div className='carousel-body'>



                        </div>

                    </SwiperSlide>
                    <SwiperSlide>

                        <div className='carousel-body'>



                        </div>

                    </SwiperSlide>
                    <SwiperSlide>

                        <div className='carousel-body'>



                        </div>

                    </SwiperSlide>
                    <SwiperSlide>

                        <div className='carousel-body'>



                        </div>

                    </SwiperSlide>
                    <SwiperSlide>

                        <div className='carousel-body'>



                        </div>

                    </SwiperSlide>

                </Swiper>

            </div>

        </div>

    )

}

export default Carousel