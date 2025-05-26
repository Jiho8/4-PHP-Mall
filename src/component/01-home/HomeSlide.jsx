import React from 'react'
import { NavLink } from 'react-router-dom'

// 홈에 사용되는 메인 슬라이드
function HomeSlide({ imgurl, name, type, id }) {
    const firstImg = imgurl.split(',')[0];  // 썸네일 첫번째 이미지

  return (
    <div>
        {/* 클릭 시 해당 상품 상세페이지로 이동 */}
        <NavLink to={`/product/${type}/${id}`}>
            {/* 이미지 */}
            <p className='home-mainimg'>
                <img src={`${process.env.REACT_APP_APIURL_IMG}/${firstImg}`} alt="메인슬라이드-img" />
            </p>

            {/* 상품 정보 (상품명, 소카테고리명) */}
            <div className='home-main-text'>
                <p>{name}</p>
                <span>{type}</span>
            </div>
        </NavLink>
    </div>
  )
}

export default HomeSlide