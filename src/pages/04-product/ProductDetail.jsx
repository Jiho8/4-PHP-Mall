import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper/modules';
import TabMenu from '../../component/04-product/TabMenu'
import ProductSlide from '../../component/04-product/ProductSlide';
import InfoMessage from '../../component/_common/InfoMessage';
import BtnShort from '../../component/_common/BtnShort';
import BoxIcon from '../../component/icons/BoxIcon';
import TopIcon from '../../component/icons/TopIcon';
import BottomBar from '../../component/04-product/BottomBar';
import DetailContent from '../../component/04-product/DetailContent';
import DataLoading from '../../component/_common/DataLoading';
import '../../styles/04-product/productDetail.scss';

function ProductDetail() {
  const { type, id } = useParams();    // URL에서 전달된 소카테고리명, 상품 id 파라미터
  
  const [loading, setLoading] = useState(true);               // 데이터 로딩 상태 관리
  const [selectedTab, setSelectedTab] = useState(0);          // 탭 상태 관리
  const [productData, setProductData] = useState(undefined);  // 상품 데이터. 로딩중일 때는 undefined, 없으면 null
  const [categoryItem, setCategoryItem] = useState(null);     // 소카테고리 정보
  const [categorySub, setCategorySub] = useState(null);       // 중카테고리 정보
  const [categoryMain, setCategoryMain] = useState(null);     // 대카테고리 정보
  const [notFound, setNotFound] = useState(false);            // 유효하지 않은 카테고리 여부
  const [isOpen, setIsOpen] = useState(false);                // 하단 구매 바 열림 여부

  // 페이지 진입 시 최상단으로 스크롤 이동
  useEffect(()=>{
    window.scrollTo(0,0);
  },[])
  
  // 상품 데이터 불러오기.
  useEffect(()=>{
    axios.get(`${process.env.REACT_APP_APIURL}/api/p_list.php`)
    .then(res=>{
      if(!res.data){setProductData(null)}  // 데이터가 없으면 null

      // 파라미터로 받은 id 값과 일치하는 상품 찾기
      const matchedProduct = res.data.find(product => String(product.id) === String(id));
      if(!matchedProduct) {
        setProductData(null)
        setNotFound(true)
        return;
      }

      // 카테고리 데이터 불러오기
      axios.get(`${process.env.REACT_APP_APIURL}/api/category.php`)
      .then(catRes=>{
        if (!matchedProduct || matchedProduct === 'null') return;   // 상품 데이터가 없으면 return
        
        // 상품 데이터의 cat_id와 일치하는 소카테고리 찾기
        const matchedItem = catRes.data.find(item => String(item.id) === String(matchedProduct.cat_id));
        if (!matchedItem) return;   // 없으면 return

        // 경로로 들어온 type과 실제 카테고리명이 다를 경우 Not Found 처리
        if (type !== 'all' && matchedItem.cat_name !== type) {
          setProductData(null);
          setNotFound(true);
          return;
        }
        
        // 일치할 경우 상태 업데이트
        setCategoryItem(matchedItem);
        setProductData(matchedProduct);
        
        // 소카테고리의 cat_parent와 일치하는 중카테고리 찾기
        const matchedSub = catRes.data.find(item => String(item.id) === String(matchedItem.cat_parent));
        setCategorySub(matchedSub);
        if (!matchedSub) return;   // 없으면 return
        
        // 대카테고리 찾기
        const matchedMain = catRes.data.find(item => String(item.id) === String(matchedSub.cat_parent));
        setCategoryMain(matchedMain);
      })
    })
  },[type, id])

  // 최근 본 상품 저장 (로컬스토리지)
  useEffect(()=>{
    if(!productData) return;    // 상품 데이터가 없으면 return

    const viewed = JSON.parse(localStorage.getItem('recentProducts')) || [];
    
    // 같은 상품이 이미 있으면 삭제 (중복 방지)
    const filtered = viewed.filter(item => item.id !== productData.id);

    // 가장 최근 본 상품이 앞으로 오도록
    const updated = [productData, ...filtered];

    // 최근 본 상품은 최대 8개까지만 저장
    localStorage.setItem('recentProducts', JSON.stringify(updated.slice(0, 8)));
  },[productData])
  
  // 이미지 배열
  const imgArr = productData?.p_thumb.split(',');

  // 로딩 처리
  useEffect(()=>{
    if (productData === undefined) return; // 데이터 아직 안 들어온 초기 상태는 무시

    if(productData === null){
      setLoading(false);
      setNotFound(true);
    } else {
      const timer = setTimeout(()=>{
        setLoading(false);
      },300);
      return ()=>clearTimeout(timer);
    }
  },[productData]);

  // 로딩 상태일 경우 로딩 컴포넌트 표시
  if(loading){
    return(
      <DataLoading/>
    )
  }
  
  return (
    <div className='productdetail'>
      {/* 데이터가 있을 경우 */}
      {!notFound ? (
        <>
          <div className='productdetail-info'>
            {/* 상품 썸네일 이미지 슬라이드 */}
            <Swiper className='productSlide'
              modules={[Autoplay, Pagination]}
              slidesPerView={'auto'}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              pagination={{ clickable: true }}
              spaceBetween={0}
              loop={(imgArr?.length ?? 0) > 2}     // 이미지 3장 이상일 때만 무한 루프
            >
              {
                imgArr?.map((item, i) => (
                  <SwiperSlide key={i}>
                    <ProductSlide imgurl={item} />
                  </SwiperSlide>
                ))
              }
            </Swiper>

            {/* 상품 요약 정보 - 상품명, 가격, 카테고리 */}
            <div className='productdetail-info-txt'>
              <span className='productdetail-info-txt-category'>
                {`${categoryMain?.cat_name} > ${categorySub?.cat_name} > ${categoryItem?.cat_name}`}
              </span>
              <p>{productData?.p_name}</p>
              <span className='productdetail-info-txt-price'>
                <span>{Number(productData?.p_price).toLocaleString()}</span> 원
              </span>
            </div>

            <hr />

            {/* 배송 정보 */}
            <div className='productdetail-info-delivery'>
              <BoxIcon className={'productdetail-boxicon'}/>
              <span>배송비 2,500원</span>
            </div>
          </div>

          {/* 요약정보 / 상세정보 구분선 */}
          <hr className='productdetail-info-middleline'/>

          {/* 탭메뉴 (상세정보 / 문의) */}
          <TabMenu type='product' onTabChange={setSelectedTab}/>
        
          {/* 탭 내용 */}
          <div className='productdetail-detail-info'>
            {// 상세정보 탭
            selectedTab === 0  ? (
              <DetailContent sanitizedHTML={productData?.p_content}/>
            ) : (
              // 문의 탭
              <div>
                <InfoMessage type={'detailfaq'}/>
                <BtnShort
                  className={'detailfaq-btn'}
                  lineType={'quest'}    // 좌측 라인 버튼
                  fillType={'quest'}    // 우측 배경 버튼
                  lineTo={'/my/faq'}    // 좌측 버튼 링크
                  fillTo={'/my'}        // 우측 버튼 링크
                />      
              </div>
            )}
          </div>

          {/* 탑버튼 */}
          <TopIcon className={'productdetail-topicon'}/>

          {/* 하단바 (구매) */}
          <BottomBar isOpen={isOpen} setIsOpen={setIsOpen} data={productData}/>
      </>
      ) : (
        // 데이터가 없을 경우 안내 메시지
        <InfoMessage type={'noproduct'}/>
      )}
    </div>
  )
}

export default ProductDetail
