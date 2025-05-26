import React from 'react'
import UpIcon from '../icons/UpIcon';
import DownIcon from '../icons/DownIcon';

function Accordion({ index, data, list = null, openIndex, setOpenIndex }) {
  // 현재 열림 여부 확인
  const isOpen = openIndex === index;
  
  // 아코디언 클릭 시 열기/닫기 토글
  const handleAccordion = () => {
    setOpenIndex(isOpen ? null : index);
  };

  return (
    <div
      className={`accordion-item ${isOpen ? 'open' : ''}`}   // 열려 있으면 open 클래스 추가.
    >
      {/* 아코디언 상단 영역 (타이틀/날짜/화살표 아이콘) */}
      <div className="accordion-item-info" onClick={handleAccordion}>
        <div>
          {/* 공지 유형 및 제목 */}
          <p className='accordion-item-title-inmy'>
            {data.noticeType && (<span>{data.noticeType}</span>)}{data.title}
          </p>
          {/* 날짜가 있다면 표시 */}
          {data.date && (<span>{data.date}</span>)}
        </div>

        {/* 열림/닫힘에 따라 위/아래 아이콘 표시 */}
        <div className={`updown-icon ${isOpen ? 'active' : ''}`}>
          {isOpen ? <UpIcon className="accordionicon" /> : <DownIcon className="accordionicon" />}
        </div>
      </div>

      {/* 아코디언 열렸을 때 내용 표시 */}
      {isOpen && (
        <div className="accordion-item-content">
          <p>{data.content}</p>
        </div>
      )}

      {/* 리스트가 있고 마지막 아이템이 아닐 경우 구분선 표시 */}
      {list && index < list.length - 1 && <hr />}
    </div>
  )
}

export default Accordion