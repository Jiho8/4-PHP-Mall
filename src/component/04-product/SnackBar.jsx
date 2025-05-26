import React from 'react'
import { NavLink } from 'react-router-dom'

function SnackBar({ type }) {
  // 스낵바에 표시할 메세지
  const msgs = {
    add: '상품을 장바구니에 담았어요!',
    // already: '이미 장바구니에 있는 상품이에요.',    // 덮어쓰기 형식으로 변경
    error: '문제가 발생했습니다. 다시 시도해주세요.'
  }

  return (
    <div className='snackbar'>
      <p>{msgs[type]}</p>
      
      {/* 클릭 시 장바구니 페이지로 이동 */}
      <NavLink to="/cart">보러가기</NavLink>
    </div>
  )
}

export default SnackBar