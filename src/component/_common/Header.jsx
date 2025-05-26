import React from 'react'
import BackIcon from '../icons/BackIcon';
import CloseIcon from '../icons/CloseIcon';
import { useLocation, useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;

  const fullScreenPaths = [];   // 헤더 부분까지 요소가 차지하고 싶을 때(헤더 숨김 X)
  const pathSegments = location.pathname.split('/');   // 현재 경로를 '/' 기준으로 split
  const isProductDetail = pathSegments[1] === 'product' && pathSegments.length === 4;  // 상품 상세 페이지 처리
  const isFullScreenPage = fullScreenPaths.includes(location.pathname) || isProductDetail   // 헤더 숨김 여부
  
  // 닫기 아이콘 관리 함수
  function handleCloseIcon() {
    if(pathname==='/pay/done') {
      navigate('/')
    } else if(pathname==='/my/orderlist'){
      navigate('/my')
    } else {
      navigate(-1)
    }
  }

  let head;
  if(pathname==='/'){ 
    // 메인 페이지는 로고 보여줌
    head = <img src='/imgs/logo.svg' alt=''/>;
  } else if (pathname==='/search' || pathname==='/category' || pathname==='/cart' || pathname==='/my' || pathname==='/splash' || pathname==='/login') {
    // 헤더 숨길 페이지 (검색, 카테고리, 장바구니, 마이페이지, 스플래시, 로그인)
    head = "";
  } else if (pathname==='/pay/done' || pathname==='/my/orderlist') {
    // 닫기 버튼 페이지 (결제 완료, 주문내역)
    head = <CloseIcon className={'closeicon'} onClick={handleCloseIcon}/>;
  } else if (pathname.includes('searchdetail')) {
    // 헤더 숨길 페이지 추가 (검색 상세)
    head = "";
  } else {
    // 뒤로가기 버튼 페이지
    head = <BackIcon className={'backicon'} onClick={()=>navigate(-1)}/>;
  }

  return (
    <header className={`header ${isFullScreenPage ? 'absolute' : ''}`}>
      <h2> {head} </h2>
    </header>
  )
}

export default Header
