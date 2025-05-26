import React from 'react'

// 상품 상세페이지 내 상세 설명 (딱 한 번만 렌더링 위해 별도 컴포넌트 분리)
function DetailContent({sanitizedHTML}) {
  return (
    <div dangerouslySetInnerHTML={{  __html: sanitizedHTML }} />
  )
}

export default React.memo(DetailContent);
