import React from 'react'
import { useNavigate } from 'react-router-dom'

function CardItem({ type, imgurl, name, price, id }) {
  const navigate = useNavigate();

  const firstImg = imgurl.split(',')[0];  // 썸네일 첫 번째 이미지

  // 클릭 이벤트 - 링크 이동
  function goToDetailPage() {
    navigate(`/product/${type}/${id}`);
  }

  return (
    <>
      <figure onClick={goToDetailPage}>
        {/* 이미지 */}
        <img src={`${process.env.REACT_APP_APIURL_IMG}/${firstImg}`} alt="img" />

        {/* 상품명, 가격 */}
        <figcaption>
          <p>{name}</p>
          <span>{Number(price).toLocaleString()}</span>
        </figcaption>
      </figure>
    </>
  )
}

export default CardItem