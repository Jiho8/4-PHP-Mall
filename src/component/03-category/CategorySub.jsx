import React from 'react'
import CategoryItem from '../_common/CategoryItem'

// 중카테고리 아래의 소카테고리 리스트를 렌더링
function CategorySub({ data, subData ,name }) {
  return (
    <div className='category-sub'>
        {/* 중카테고리명 */}
        <p className='category-sub-txt'>{name}</p>

        {/* 해당 중카테고리 하위의 소카테고리 필터링 및 렌더링 */}
        {
          data.filter(item => item.cat_level === "2" && subData.id === item.cat_parent).map(item => (
              <CategoryItem 
                  key={item.id}
                  className={'category-item'}
                  goto={`/product/${encodeURIComponent(item.cat_name)}`}  // URL 인코딩
                  textClassName={'category-item-txt'}
                  label={item.cat_name}
                  iconclassName={'category-item-icon'}
              />
          ))
        }
    </div>
  )
}

export default CategorySub