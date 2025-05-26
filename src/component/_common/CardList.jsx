import React from 'react'
import CardItem from './CardItem'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Grid } from 'swiper/modules';

// Import Swiper styles
import "swiper/css";
import 'swiper/css/free-mode';
import 'swiper/css/grid';

// 카드 리스트 컴포넌트
function CardList({ data, type, rows = 1, slidesPerView = 'auto' }) {

  return (
    <Swiper className='cardlist'
    modules={[Grid]}
    slidesPerView={slidesPerView}   // 슬라이드 개수
    spaceBetween={10}               // 슬라이드 간 간격
    grid={ rows > 1 ? {rows, fill: 'row'} : undefined }  // 행 수가 1 초과일 때만 그리드 적용
    >
      {
        data.map((item, i) => (
          <SwiperSlide className='carditem' key={i}>
            <CardItem 
              type={type[i]}          // 카드 유형
              imgurl={item?.p_thumb} name={item?.p_name} price={item?.p_price} id={item?.id}
            />
          </SwiperSlide>
        ))
      }
    </Swiper>
  )
}

export default CardList