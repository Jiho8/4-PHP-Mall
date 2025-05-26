import React from 'react'
import { useNavigate } from 'react-router-dom';
import RightIcon from '../icons/RightIcon'

// 소카테고리 항목을 하나 렌더링하는 버튼 형태의 컴포넌트
function CategoryItem({className, goto, textClassName, label, iconclassName, onClick}) {
  const navi = useNavigate();

  // 클릭 시 링크 이동.
  const ctgrClick = (to)=>{
    if(onClick) onClick();  // 선택적 클릭 핸들러 실행
    if(to) navi(to);        // 지정된 경로로 이동
  }

  return (
    <div className={className} onClick={()=>ctgrClick(goto)}>
      {/* 소카테고리명 */}
      <p className={textClassName}>{label}</p>

      {/* 아이콘 */}
      <span><RightIcon className={iconclassName}/></span>
    </div>
  )
}

export default CategoryItem