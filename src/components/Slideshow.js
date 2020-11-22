import React, { Component }  from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';




const Slideshow = ({ content }) => {
  const params = {
    effect: 'coverflow',
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: 1,
    coverflowEffect: {
      rotate: 50,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: true
    },
    pagination: {
      el: '.swiper-pagination'
    }
  }
  return (
    <Swiper>
      <SwiperSlide><div style={{ backgroundImage:'url(http://lorempixel.com/600/600/nature/1)' }} /></SwiperSlide>
      <SwiperSlide><div style={{ backgroundImage:'url(http://lorempixel.com/600/600/nature/2)' }} /></SwiperSlide>
      <SwiperSlide><div style={{ backgroundImage:'url(http://lorempixel.com/600/600/nature/3)' }} /></SwiperSlide>
      <SwiperSlide><div style={{ backgroundImage:'url(http://lorempixel.com/600/600/nature/4)' }} /></SwiperSlide>
      <SwiperSlide><div style={{ backgroundImage:'url(http://lorempixel.com/600/600/nature/5)' }} /></SwiperSlide>
    </Swiper>
  )
};

export default Slideshow;
