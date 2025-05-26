import React, { useEffect, useState } from 'react'
import axios from 'axios';
import RecordIcon from '../../component/icons/RecordIcon';
import CategorySub from '../../component/03-category/CategorySub';
import WriteIcon from '../../component/icons/WriteIcon';
import BtnShort from '../../component/_common/BtnShort';
import '../../styles/03-category/category.scss'

function Category() {
  const [catData, setCatData] = useState([]);  // 전체 카테고리 데이터

  // 페이지 진입 시 최상단으로 스크롤 이동
  useEffect(()=>{
    window.scrollTo(0,0);
  },[])
  
  // 전체 카테고리 데이터 불러오기
  useEffect(()=>{
    axios.get(`${process.env.REACT_APP_APIURL}/api/category.php`)
    .then(res=>{
      setCatData(res.data)
    })
  },[])

  // 대카테고리 필터링. 구분선(hr) 조건을 위함.
  const parentCategory = catData.filter(parent => parent.cat_level === "0");
  
  return (
    <div className='category'>
      <h2 className='category-title'>카테고리</h2>
      {
        parentCategory.map((parent, index) => (
          <div key={parent.id} className='category-box'>
            {/* 대카테고리 */}
            <div className='category-parent'>
              {
                parent.id === '1' ? (
                  <RecordIcon className={'category-parent-icon'}/>
                ) : (
                  <WriteIcon className={'category-parent-icon'}/>
                )
              }
              <p>{parent.cat_name}</p>
            </div>
            
            {/* 중카테고리 및 소카테고리 렌더링 */}
            {
              // 중카테고리
              catData.filter(sub => sub.cat_level === "1" && parent.id === sub.cat_parent).map(sub => (
                <CategorySub key={sub.id} 
                  data={catData} subData={sub} name={sub.cat_name}/>
              ))
            }

            {/* 마지막 대카테고리는 구분선 없음 */}
            {index !== parentCategory.length - 1 && <hr />}
          </div>
        ))
      }

      {/* 전체 상품 보기 버튼 */}
      <BtnShort className={'all-product-btn'} fillType={'all'} fillTo={'/product/all'}/>
    </div>
  )
}

export default Category
