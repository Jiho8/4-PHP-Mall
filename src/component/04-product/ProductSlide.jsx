import React from 'react'

// 상품 상세페이지에 사용되는 썸네일 슬라이드
function ProductSlide({ imgurl }) {

  return (
    <p className='productslide-img'>
        <img src={`${process.env.REACT_APP_APIURL_IMG}/${imgurl}`} alt="상품디테일-img" />
    </p>
  )
}

export default ProductSlide