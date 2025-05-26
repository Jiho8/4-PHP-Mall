import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import { useSwipeable } from 'react-swipeable';
import PlusIcon from '../icons/PlusIcon'
import MinusIcon from '../icons/MinusIcon'

// 구매 바 확장 상태에서 표시되는 컴포넌트
function BottomBarExpanded({ isOpen, setIsOpen, data, onAddToCart }) {
    const navi = useNavigate();

    const userId = sessionStorage.getItem('mem_id');      // 로그인한 사용자 id
    const [ea, setEa] = useState(1);                      // 수량
    const [price, setPrice] = useState(data?.price);      // 총 가격

    const firstImg = data?.p_thumb.split(',')[0];         // 상품 썸네일 중 첫번째 이미지

    // 스와이프 제스처 설정 (아래로 스와이프 시 바 닫힘)
    const swipeHandlers = useSwipeable({
        onSwipedDown: () => setIsOpen(false),
        // onSwipedUp: () => setIsOpen(true),
        delta: 50,          // 인식할 최소 스와이프 거리 (기본값 10)
        trackMouse: true,   // pc 마우스 드래그 허용
        preventDefaultTouchmoveEvent: true,   // 터치 드래그로 인한 스크롤 방지
    });

    // data와 ea 값에 따른 price 계산
    useEffect(()=>{
        if(data?.p_price) {
            setPrice(data?.p_price * ea);
        }
    },[ea, data])

    // 수량 카운터 함수
    function eaCounter(type) {
        if(type === 'plus') {
            setEa(prev => prev + 1);                     // 수량 +1
        } else if(type === 'minus') {
            setEa(prev => (prev > 1 ? prev - 1 : 1));    // 수량 -1 (최소 1)
        }
    }

    // 장바구니
    function getCart() {
        if(!userId) {
            navi('/login');    // 로그인 되어 있지 않은 경우 로그인 페이지로 이동
            return;
        }

        // 사용자의 장바구니 데이터 불러오기
        axios.get(`${process.env.REACT_APP_APIURL}/api/cart.php?mem_id=${userId}`)
        .then(res => {
            const cartList = res.data;
            const check = cartList.some(item => String(item.p_id) === String(data.id));  // 있으면 true, 없으면 false

            if(check) {
                // 이미 장바구니에 있는 상품이면 수량/가격만 업데이트
                const putData = {
                    mem_id: userId,
                    p_id: data.id,
                    p_price: String(price),
                    p_ea: String(ea),
                }

                axios.put(`${process.env.REACT_APP_APIURL}/api/cart.php`, putData)
                .then(() => {onAddToCart('add');})        // 스낵바 '추가됨' 표시
                .catch(() => {onAddToCart('error');});    // 스낵바 '에러' 표시

            } else {
                // 장바구니에 없는 상품이면 새로 추가
                const cartData = {
                    mem_id: userId,
                    p_id: data.id,
                    p_name: data.p_name,
                    p_price: String(price),
                    p_ea: String(ea),
                    p_thumb: firstImg,
                    cat_id: data.cat_id
                }
                
                axios.post(`${process.env.REACT_APP_APIURL}/api/cart.php`, cartData)
                .then(() => {onAddToCart('add');})
                .catch(() => {onAddToCart('error');});
            }
        })
        .catch(err => console.error(err))
    }

    // 구매
    function payNow() {
        if(!userId) {
            navi('/login');
            return;
        }

        // 결제 페이지로 넘길 데이터 구성
        const payData = {
            mem_id: userId,
            p_id: data.id,
            p_name: data.p_name,
            p_price: String(price),
            p_ea: String(ea),
            p_thumb: firstImg,
            cat_id: data.cat_id
        }        
        
        // 결제 페이지로 이동 (state로 데이터 전달)
        navi('/pay', {
            state:  payData
        })
    }

  return (
    <div 
        className={`bottombar-expanded ${isOpen ? 'active' : ''}`}
        {...swipeHandlers}
    >
        {/* 드래그 핸들 영역 (UI용) */}
        <div className='bottombar-drag-handle'/>

        <div className='expanded-content'>
            {/* 상품 수량 조절 */}
            <div className='expanded-content-top'>
                <div className='select-num'>
                    <MinusIcon className={'select-num-icon'} onClick={() => eaCounter('minus')}/>
                    <span>{ea}</span>
                    <PlusIcon className={'select-num-icon'} onClick={() => eaCounter('plus')}/>
                </div>
                <span>{Number(price).toLocaleString()}</span>
            </div>

            {/* 결제할 총 수량 및 금액 */}
            <div className='expanded-content-bottom'>
                <p>구매수량 <span>{ea === 0 ? '_' : ea}</span> 개</p>
                <span>총 {Number(price).toLocaleString()} 원</span>
            </div>
            
            {/* 버튼 (장바구니 / 구매) */}
            <div className='bottombar-btnbox'>
                <div 
                    className='btnshort-line bottombar'
                    onClick={getCart}
                >
                    <p>장바구니에 담기</p>
                </div>
                <div 
                    className='btnshort-fill bottombar' 
                    onClick={payNow}
                >
                    <p>구매하기</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default BottomBarExpanded