import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom'
import CardItem from '../../component/_common/CardItem';
import InfoMessage from '../../component/_common/InfoMessage';
import TopIcon from '../../component/icons/TopIcon';
import DataLoading from '../../component/_common/DataLoading';
import '../../styles/04-product/productList.scss'

function ProductList() {
  const { type } = useParams();   // URL에서 전달된 소카테고리명 파라미터 (예: /product/연필)
  const [listItem, setListItem] = useState([]);     // 해당 소카테고리 상품 리스트
  const [ctgrItem, setCtgrItem] = useState(null);   // 현재 소카테고리 정보 또는 "전체보기"
  const [notFound, setNotFound] = useState(false);  // 유효하지 않은 카테고리 여부
  const [loading, setLoading] = useState(true);     // 데이터 로딩 상태 관리

  useEffect(()=>{
    window.scrollTo(0,0);  // 페이지 진입 시 최상단으로 스크롤 이동
    
    // 파라미터 없을 경우 Not Found 처리
    if (!type) {
      setNotFound(true);
      setLoading(false);
      return;
    }

    setLoading(true);  // 로딩 시작

    // 전체 카테고리 데이터 불러오기
    axios.get(`${process.env.REACT_APP_APIURL}/api/category.php`)
    .then(res => {
      // 전체보기 별도 처리
      if(type === 'all'){
        setCtgrItem('전체보기');
        return;
      }

      // 유효한 카테고리인지 확인 (type - name)
      const matchedCategories = res.data.find(ctgr => String(ctgr.cat_name) === String(type));
      if(!matchedCategories) {
        // 해당 카테고리가 존재하지 않는 경우
        setNotFound(true);
      } else{
        // 일치하는 카테고리 저장
        setCtgrItem(matchedCategories)
      }
    })
    .catch(e => console.error('카테고리 데이터 불러오기 실패', e))
    .finally(()=>{
      setLoading(false);
    });
  }, [type]);

  // 카테고리 정보가 세팅된 이후 해당 상품 리스트 불러오기
  useEffect(()=>{
    if (!ctgrItem) return;

    axios.get(`${process.env.REACT_APP_APIURL}/api/p_list.php`)
    .then(res => {
      if(type === 'all'){
        // 전체보기 별도 처리. 전체 상품 리스트 저장.
        setListItem(res.data);
      } else {
        // 해당 카테고리 id와 일치하는 상품만 필터링
        const matchedCategories = res.data.filter(product => String(product.cat_id) === String(ctgrItem.id));
        setListItem(matchedCategories);
      }
    })
    .catch(e => console.error('카테고리 데이터 불러오기 실패', e));
}, [ctgrItem, type]);

  // 아이템의 개수가 홀수일 경우 빈 박스를 추가해 두 줄로 균형 맞춤
  const items = [...listItem];
  if(items.length % 2 !== 0) items.push({ id: 'placeholder', isPlaceholder: true })

  // 로딩 상태일 경우 로딩 컴포넌트 표시
  if(loading){
    return(
      <DataLoading/>
    )
  }

  return (
    <div className='product-list'>
      {/* 페이지 상단 타이틀 */}
      <h2 className='all-menu-title'>
        {ctgrItem.cat_name ? ctgrItem.cat_name : ctgrItem}
      </h2>

      {/* 총 상품 개수 */}
      <p className='product-list-num'><span>{listItem.length}</span>개</p>

      {/* 데이터가 있을 경우 */}
      { !notFound ? (
        <div className='product-list-item-box'>
          {
            items.map(product => (
              product.isPlaceholder ? (
                // 홀수 맞춤용 빈 박스
                <div key='placeholder' className='carditem placeholder'></div>
              ) : (
                // 상품 (카드 형태)
                <div key={product.id} className='carditem'>
                  <CardItem
                    imgurl={product.p_thumb}   // 썸네일 이미지
                    name={product.p_name}      // 상품명
                    price={product.p_price}    // 가격
                    id={product.id}            // 상품 id
                    type={type}                // 현재 카테고리명
                  />
                </div>
              )
            ))
          }
        </div>
      ) : (
        // 데이터가 없을 경우 안내 메시지
        <InfoMessage type={'noproduct'} />
      )}

      {/* 탑버튼 */}
      <TopIcon className={'search-detail-topicon'}/>
    </div>
  )
}

export default ProductList
