import React from 'react'

// 검색 페이지에 사용되는 추천 키워드
function SearchKeyword({ onClick, word }) {
  return (
    <div className='search-keyword' onClick={onClick}>
      {word}
    </div>
  )
}

export default SearchKeyword