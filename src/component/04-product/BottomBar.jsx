import React, { useEffect, useState } from 'react'
import BottomBarExpanded from './BottomBarExpanded'
import SnackBar from './SnackBar';

// 상품 상세페이지에서 사용하는 구매 바
function BottomBar({ isOpen, setIsOpen, data }) {
    const [snack, setSnack] = useState(false);                   // 스낵바 렌더링 여부 (true면 DOM에 존재)
    const [snackVisivle, setSnackVisible] = useState(false);     // 스낵바의 실제 표시 여부 (투명도 전환용)
    const [snackType, setSnackType] = useState(null);            // 스낵바에 전달할 메시지 타입

    // isOpen 상태에 따라 스크롤 잠금/해제 처리
    useEffect(()=>{
        if (isOpen) {
            document.body.style.overflow = 'hidden';             // 바 열릴 때 스크롤 잠금
            window.scrollTo({ top: window.scrollY });            // 위치 고정
        } else {
            document.body.style.overflow = '';                   // 바 닫힐 때 스크롤 해제
        }

        // 컴포넌트 언마운트 시 스크롤 해제
        return () => {
            document.body.style.overflow = '';
        };
    },[isOpen])

    // 장바구니 추가 시 실행되는 함수
    const handleAddtoCart = (type) => {
        setSnackType(type);     // 메세지 타입 설정
        setSnack(true);         // 스낵바 컴포넌트 렌더링
        setSnackVisible(true);  // 스낵바 화면에 표시
        setIsOpen(false);       // 바 닫기
        
        // 3초 후 스낵바 닫기 애니메이션 및 제거
        setTimeout(() => {
            setSnackVisible(false);                  // 투명하게 만들기 시작
            setTimeout(() => setSnack(false), 300);  // 300ms 후 DOM 제거 (transition duration과 맞춤)
        }, 3000);
    }

  return (
    <div className='bottombar-box'>
        {/* 하단바 오픈 시 배경 클릭 영역 (클릭 시 바 닫기) */}
        {isOpen && <div className='bottombar-overlay' onClick={()=>setIsOpen(false)}/>}

        {/* 기본 */}
        {!isOpen && (
            <div className='bottombar-collapsed'>
                {/* 클릭 시 바 확장 */}
                <div className='btnlong'  onClick={()=>setIsOpen(true)}>
                    <p className='btnlong-label'>구매하기</p>
                </div>
            </div>
        )}

        {/* 확장 */}
        <BottomBarExpanded 
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            data={data}
            onAddToCart={handleAddtoCart}  // 장바구니 추가 콜백
        />

        {/* 스낵바 */}
        {snack && 
            <div className={`snackbar-box ${!snackVisivle ? 'hide' : ''}`}>
                <SnackBar type={snackType}/>
            </div>
        }
    </div>
  )
}

export default BottomBar