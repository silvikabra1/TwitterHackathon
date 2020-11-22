import React, { Component }  from 'react';
import SwiperCore, { Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';

import ProfilePic from '../components/ProfilePic';


SwiperCore.use([Navigation, Pagination]);

const twitter_users = ["jack", "thisismichaelo", "satyanadella", "travisk", "finkd", "elonmusk", "eldsjal", "peretti", "levie", "realdonaldtrump"];

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
        <SwiperSlide><ProfilePic url='https://cryptoslate.com/wp-content/uploads/2019/05/person-jack-dorsey.jpg' screen_name={twitter_users[0]}/></SwiperSlide>
        <SwiperSlide><ProfilePic url='https://cdn.theorg.com/94e7a10b-01f7-44b3-93dc-99d09bcb967d_small.jpg'screen_name={twitter_users[1]}/></SwiperSlide>
        <SwiperSlide><ProfilePic url='https://www.crminnovation.com/wp-content/uploads/2017/04/Satya-300x300.jpg'screen_name={twitter_users[2]}/></SwiperSlide>
        <SwiperSlide><ProfilePic url='https://www.ft.com/__origami/service/image/v2/images/raw/http://prod-upp-image-read.ft.com/86b0dd80-9ee2-47b5-a085-ece14a02233a?source=next&fit=scale-down&width=150&compression=best&quality=highest&dpr=2'screen_name={twitter_users[3]}/></SwiperSlide>
        <SwiperSlide><ProfilePic url='https://lh3.googleusercontent.com/proxy/UAL58ag5DS-YsRWXe_TX7nUKHVLxOFJGQ2PxofrK5UvrVh3vxTIehEDnwyzsJGqaNAcIT5fFSdnf63EdJOPzV8lYthQrspsH4z0e0ppg13bVVwi0Hv4KASdp9shIwpy3QtzuzxQKPhpgJrx9M4i89JT1t19KJ1EQFIS3o9klx2Hsm9SC14VQqqQNxk1FUZ7-ig'screen_name={twitter_users[4]}/></SwiperSlide>
        <SwiperSlide><ProfilePic url='https://www.biography.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cg_face%2Cq_auto:good%2Cw_300/MTY2MzU3Nzk2OTM2MjMwNTkx/elon_musk_royal_society.jpg'screen_name={twitter_users[5]}/></SwiperSlide>
        <SwiperSlide><ProfilePic url='https://listofceo.com/wp-content/uploads/2018/05/Daniel-Ek-Spotify-CEO-300x300.jpg'screen_name={twitter_users[6]}/></SwiperSlide>
        <SwiperSlide><ProfilePic url='https://photo1.allfamous.org/public/people/faces/jonah-peretti-19740101-allfamous.org.jpg'screen_name={twitter_users[7]}/></SwiperSlide>
        <SwiperSlide><ProfilePic url='https://www.mesaonline.org/wp-content/uploads/2017/01/aaron-levie-box-cropped-300x300-1.jpg'screen_name={twitter_users[8]}/></SwiperSlide>
        <SwiperSlide><ProfilePic url='https://www.ipwatchdog.com/wp-content/uploads/2015/12/donald-trump-300.jpg'screen_name={twitter_users[9]}/></SwiperSlide>

      </Swiper>
      </div>
   
  );
}

export default SlideshowPage;
