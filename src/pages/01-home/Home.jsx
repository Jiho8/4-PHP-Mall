import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper/modules';
import CardList from '../../component/_common/CardList'
import HomeSlide from '../../component/01-home/HomeSlide'
import CategoryLink from '../../component/01-home/CategoryLink';
import DataLoading from '../../component/_common/DataLoading';
import 'swiper/css';
import 'swiper/css/pagination';
import '../../styles/01-home/home.scss'

function Home() {
  const [loading, setLoading] = useState(true);              // 데이터 로딩 상태 관리
  const [allItem, setAllItem] = useState([]);                // 전체 상품 데이터
  const [mainctgrName, setMainCtgrName] = useState([]);      // 메인 슬라이드 데이터들의 카테고리명
  const [newCtgrName, setNewCtgrName] = useState([]);        // 새로 나온 상품 데이터들의 카테고리명
  const [mainSlideItem, setMainSlideItem] = useState(null);  // 메인 슬라이드 데이터
  const [newSlideItem, setNewSlideItem] = useState(null);    // 새로 나온 상품 데이터

  // 소카테고리 바로가기 아이콘 이미지 및 메뉴명
  const category = [
    {
        imgurl: '/imgs/category01.svg',
        name: '다이어리',
    },
    {
        imgurl: '/imgs/category02.svg',
        name: '메모지',
    },
    {
        imgurl: '/imgs/category03.svg',
        name: '스티커',
    },
    {
        imgurl: '/imgs/category04.svg',
        name: '샤프',
    },
    {
        imgurl: '/imgs/category05.svg',
        name: '볼펜',
    }
  ]

  // 페이지 진입 시 최상단으로 스크롤 이동
  useEffect(()=>{
    window.scrollTo(0,0);
  },[])

  // 모든 상품 데이터 가져오기
  useEffect(()=>{
    axios.get(`${process.env.REACT_APP_APIURL}/api/p_list.php`)
    .then(res=>{
      // 가장 최근에 등록된 데이터 8개 slice
      const newItem01 = res.data.slice(-4);
      const newItem02 = res.data.slice(-8, -4);
      setNewSlideItem([...newItem01, ...newItem02]);

      setAllItem(res.data);
    })
  },[])

  // 카테고리 정보 가져오기
  useEffect(()=>{
    // 데이터가 없으면 return
    if (!mainSlideItem || !newSlideItem) return;

    axios.get(`${process.env.REACT_APP_APIURL}/api/category.php`)
    .then(res => {
      // 메인 슬라이드
      const matchedCategories = mainSlideItem.map(item => {
        return res.data.find(ctgr => String(ctgr.id) === String(item.cat_id));
      });
      setMainCtgrName(matchedCategories.map(ctgr => ctgr?.cat_name ?? ''));

      // 신상품
      const matchedCategories2 = newSlideItem.map(item => {
        return res.data.find(ctgr => String(ctgr.id) === String(item.cat_id));
      });
      setNewCtgrName(matchedCategories2.map(ctgr => ctgr?.cat_name ?? ''))
    })
    .catch(e => console.error('카테고리 데이터 불러오기 실패', e));
}, [mainSlideItem, newSlideItem]);

  // 메인슬라이드 로컬스토리지 저장, 하루시간 설정 후 삭제되게 함
  useEffect(()=>{
    if (allItem && allItem.length > 0) {
      const saveItem = localStorage.getItem('ripo-main'); // 로컬 스토리지 데이터 가져오기
      const now = new Date().getTime(); // 현재 시간
      const oneDay = 24 * 60 * 60 * 1000; // 24시간을 초[ms]단위로
      
      // 로컬스토리지에 저장된 아이템이 있을 경우
      if (saveItem) {
        try {
          const parsedItem = JSON.parse(saveItem); // 저장된 값이 있으면 문자열을 객체로 변경
          const { main, createdAt } = parsedItem; // createdAt 저장 시간이 지났는지 확인하는 용
          
          const isValidTime = createdAt && now - createdAt < oneDay; // 저장시간이 24시간 이내인지 확인 (현재시간-저장시간)
          
          if (isValidTime) {
            // 아직 하루 안 지났음 → 유효
            setMainSlideItem(main); // 랜덤으로 하나 뽑아서 저장
            return;
          } else {
            // 하루 지남 → 제거
            localStorage.removeItem('ripo-main');
          }
        } catch (e) {
          console.error("로컬스토리지 파싱 오류", e);
          localStorage.removeItem('ripo-main');
        }
      }
      // 유효한 로컬스토리지 데이터 없을 경우 새로 랜덤 생성
      const copyHomeData = [...allItem].sort(() => Math.random() - 0.5); // 배열을 랜덤하게 섞기 위해 sort함수에 넣어서 사용, 0-1사이 값을 주는데 -0.5를 하면 음수(앞으로) 양수(뒤로)값을 가지게 되어 순서가 바뀐다
      const sliceHome = copyHomeData.slice(0, 4);
      setMainSlideItem(sliceHome); // 랜덤으로 4개 slice한 아이템들을 메인슬라이드 이미지로 선택
      const createdAt = new Date().getTime(); // 현재 시각 [ms]
      localStorage.setItem('ripo-main', JSON.stringify({main: sliceHome, createdAt})); // 로컬스토리지에 아이템 데이터와 현재 시각 저장
    }
  }, [allItem]);

  // 콘솔 로그 꾸미기
  useEffect(()=>{
    (function () {
      'use strict';
    
      // 스타일
      const pastel = {
        purple: 'color:#BB9EE5;font-size:13px;font-weight:bold;',
        lightPurple: 'color:#C9B6E4;font-size:13px;',
        lightBlue: 'color:#D0EFFF;font-size:13px;',
        title: 'background: #D0EFFF; color: #C9B6E4; font-size:14px; font-weight:bold; padding:2px 6px; border-radius:6px;',
        line: 'color:#E0D9F7;font-size:13px;',
        tag: 'color:#C9B6E4;font-size:12px;font-style:italic;',
      };

      const date = new Date().toLocaleDateString();   // 현재 날짜
    
      if (typeof console === 'object' && console.log) {
        console.clear(); // 깔끔하게 시작
    
        console.log(`%c╭────────────╮`, pastel.purple);
        console.log(`%c│    🌈 My Ripo Diary  │`, pastel.purple);
        console.log(`%c├─────────────┤`, pastel.line);
        console.log(`%c│ Date : ${date}      │`, pastel.lightPurple);
        console.log(`%c│ Mood : Calm & Cute       │`, pastel.lightPurple);
        console.log(`%c│ Note :                   │`, pastel.lightPurple);
        console.log(`%c│  Welcome to Ripo!        │`, pastel.lightPurple);
        console.log(`%c│  좋아하는 모든 것을,     │`, pastel.lightPurple);
        console.log(`%c│  기록하는 방법           │`, pastel.lightPurple);
        console.log(`%c╰────────────╯`, pastel.purple);
    
        console.log(`%c♥ Visit Ripo → https://ripo-tau.vercel.app`, pastel.purple);
        console.log(`%c#stationery  #cute  #diary  #Ripo`, pastel.tag);
      }
    })();
  },[])

  // 로딩 처리
  useEffect(()=>{
    if(mainSlideItem !== null){
      const timer = setTimeout(()=>{
        setLoading(false);
      },700);
      return ()=>clearTimeout(timer);
    }
  },[mainSlideItem]);

  if(loading){
    return(
      <DataLoading/>
    )
  }
  
  return (
    <div className='home'>
      {/* 메인 슬라이드 */}
      <Swiper className='mainSlide'
        modules={[Autoplay, Pagination]}
        slidesPerView={'auto'}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        spaceBetween={0}
        loop={mainSlideItem?.length > 3}>
        {
          
          mainSlideItem?.map((item, i) => (
            <SwiperSlide key={i}>
              <HomeSlide
                imgurl={item?.p_thumb} name={item?.p_name} type={mainctgrName[i]} id={item?.id}
              />
            </SwiperSlide>
          ))
        }
      </Swiper>

      {/* 소카테고리 바로가기 메뉴 */}
      <Swiper className='categorySlide'
        slidesPerView={'auto'}
        spaceBetween={16}>
        {
          category.map((item, i) => (
            <SwiperSlide key={i}>
              <CategoryLink data={item}/>
            </SwiperSlide>
          ))
        }
      </Swiper>

      {/* 신상품 슬라이드 */}
      <div className='home-item-box'>
        <div className='home-item-box-title'>
          <p><img src="/imgs/new.svg" alt="newIcon" /></p>
          <span>새로 나왔어요!</span>
        </div>
        <CardList data={newSlideItem} type={newCtgrName} rows={2} slidesPerView={2.6}/>
      </div>

      {/* 푸터 */}
      <div className='footer'>
        (주)Ripo <br/>
        대표이사 : 차민규 / 서울시 강남구 테헤란로 000 <br/>
        사업자등록번호 : 211-87-01005 / 통신판매업 신고번호 2025-1005-1005 <br/>
        고객센터 5001-1005
        <span>
          (주)Ripo는 통신판매중개자로서 통신판매의 당사자가 아니며
          상품 거래정보 및 거래 등에 대한 책임을 지지 않습니다.
        </span>

        이용약관 | 개인정보처리방침
      </div>
    </div>
  )
}

export default Home
