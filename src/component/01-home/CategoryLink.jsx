import React from 'react'
import { NavLink } from 'react-router-dom'

// 홈에 사용되는 소카테고리 바로가기 메뉴
function CategoryLink({ data }) {

    return (
        // 클릭 시 상품 리스트 페이지로 이동
        <NavLink to={`/product/${data.name}`} className='categoryLink'>
            <div>
                <p><img src={data.imgurl} alt="카테고리" /></p>
                <span>{data.name}</span>
            </div>
        </NavLink>
    )
}

export default CategoryLink