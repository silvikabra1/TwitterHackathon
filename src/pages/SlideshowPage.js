import React, { Component }  from 'react';
import SwiperCore, { Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';

import ProfilePic from '../components/ProfilePic';


SwiperCore.use([Navigation, Pagination]);

const twitter_users = ["jeffweiner", "ericschmidt", "steveforbesceo", "petecashmore", "mtbarra", "elonmusk", "eldsjal", "peretti", "levie", "realdonaldtrump"];

const SlideshowPage = () => {
  
  return (
      <div>
        <p className="title"> Click on a user to see their tweet's impact</p>
      <Swiper
        id="main"
        navigation
        pagination={{clickable: true}}
        spaceBetween={50}
        slidesPerView={3}
        onSlideChange={() => console.log('slide change')}
        onSwiper={(swiper) => console.log(swiper)}
      >
        <SwiperSlide><ProfilePic url='https://blog.zoom.us/wp-content/uploads/2018/09/jeff-300x300.jpg' screen_name={twitter_users[0]}/></SwiperSlide>
        <SwiperSlide><ProfilePic url='https://schmidtfutures.com/wp-content/uploads/eric-schmidt-300x300.jpg'screen_name={twitter_users[1]}/></SwiperSlide>
        <SwiperSlide><ProfilePic url='https://i1.wp.com/nypost.com/wp-content/uploads/sites/2/2013/08/032_steve_forbes-300x300.jpg'screen_name={twitter_users[2]}/></SwiperSlide>
        <SwiperSlide><ProfilePic url='https://vz.cnwimg.com/thumbc-300x300/wp-content/uploads/2011/03/Pete-Cashmore-1.jpg'screen_name={twitter_users[3]}/></SwiperSlide>
        <SwiperSlide><ProfilePic url='https://www.rsaconference.com/-/media/rsac/import/expertimages/mary-tbarra.jpg?mw=300&mh=300&hash=0817B6DAF385A1E1C0B9ADE997EAF228FD2A80E9'screen_name={twitter_users[4]}/></SwiperSlide>
        <SwiperSlide><ProfilePic url='https://www.biography.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cg_face%2Cq_auto:good%2Cw_300/MTY2MzU3Nzk2OTM2MjMwNTkx/elon_musk_royal_society.jpg'screen_name={twitter_users[5]}/></SwiperSlide>
        <SwiperSlide><ProfilePic url='https://listofceo.com/wp-content/uploads/2018/05/Daniel-Ek-Spotify-CEO-300x300.jpg'screen_name={twitter_users[6]}/></SwiperSlide>

      </Swiper>
      </div>
   
  );
}

export default SlideshowPage;
