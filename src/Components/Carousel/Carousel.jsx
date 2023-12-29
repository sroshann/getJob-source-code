import React from 'react'
import './Carousel.css'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css/bundle';

function Carousel() {

    return (

        <div id='carousel'>

            <h3>Top companies hiring now</h3>

            <div id="swiper-body">

                <Swiper 
                    modules={[Autoplay]}  
                    autoplay={{delay:1800}}  
                    spaceBetween={0}
                    slidesPerView={4}
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