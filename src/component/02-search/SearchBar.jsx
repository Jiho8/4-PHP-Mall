import React from 'react'

// 검색창
function SearchBar({ onSubmit, placeholder, value, onChange, submitbtn }) {
  return (
    <form className='searchbar' onSubmit={onSubmit}>
        <input 
          type="text"
          placeholder={placeholder}  // 값 입력 전 보여줄 텍스트
          value={value}              // 입력한 값
          onChange={onChange}        // 값 변경되면 실행할 함수
          name='search' />
        <button type="submit">{submitbtn}</button>
    </form>
  )
}

export default SearchBar