import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import SearchBar from '../../component/02-search/SearchBar';
import SearchKeyword from '../../component/02-search/SearchKeyword';
import SearchIconPurple from '../../component/icons/SearchIconPurple';
import CardList from '../../component/_common/CardList';
import '../../styles/02-search/searchPage.scss';

function SearchPage() {
  const navi = useNavigate();
  const location = useLocation();

  const [searchInput, setSearchInput] = useState('');   // input에 입력한 검색어
  const [recents, setRecents] = useState([]);           // 최근 본 상품 데이터
  const [ctgrName, setCtgrName] = useState([]);         // 각 상품의 카테고리 이름 리스트
  const [isReady, setIsReady] = useState(false);        // 데이터 준비 여부

  const keyword = ['디즈니', '펜', '키링', '그로밋', '피클스', '다이어리', '메모지'];  // 추천 키워드

  // 키워드 클릭 시 검색 가능 (검색 상세페이지 이동)
  const wordClick = (word)=>{
    navi(`/search/searchdetail/${encodeURIComponent(word)}`) // encodeURIComponent(word)는 띄어쓰기나 특수문자가 있을 경우 대비하여 인코딩해줌
  }

  // 최근 본 상품 데이터 및 카테고리 정보 가져오기 (페이지 경로가 바뀔 때마다 실행. 항상 렌더링 위함)
  useEffect(()=>{
    const storgeItem = localStorage.getItem('recentProducts');

    // 최근 본 상품이 없으면 초기화 후 종료
    if (!storgeItem) {
      setRecents([]);
      setCtgrName([]);
      setIsReady(true);   // 데이터 다 들어오면 true
      return;
    }

    // 로컬스토리지에서 가져온 데이터를 JSON으로 파싱
    let parsed;
    try {
      parsed = JSON.parse(storgeItem);
    } catch (e) {
      console.error('JSON parse error:', e);
      parsed = [];
    }
    setRecents(parsed);

    // 카테고리 데이터 불러오기 (id → name 매핑)
    axios.get(`${process.env.REACT_APP_APIURL}/api/category.php`)
    .then(res => {
      const matchedCategories = parsed.map(item => {
        const match = res.data.find(ctgr => String(ctgr.id) === String(item.cat_id));
        return match?.cat_name || '';
      });
      setCtgrName(matchedCategories)
      setIsReady(true);
    })
    .catch(e => {
      console.error('카테고리 데이터 불러오기 실패', e);
      setCtgrName([]);
      setIsReady(true);
    });
}, [location.pathname]);


  return (
    <div className='search-page'>
      <div>
        {/* 검색창 */}
        <SearchBar
          placeholder={"어떤 상품을 찾아볼까?"} submitbtn={<SearchIconPurple className={'search-btn'}/>}
          value={searchInput} onChange={(e)=>setSearchInput(e.target.value)}
          onSubmit={(e)=>{
            e.preventDefault();
            if (searchInput.trim()) {
              wordClick(searchInput);
            }
          }}/>

        {/* 추천 키워드 */}
        <div>
          <h2 className='search-title'>추천 키워드</h2>
          <div>
            {
              keyword.map((item, i) =>
                <SearchKeyword key={i} word={item} onClick={()=>wordClick(item)}/>
              )
            }
          </div>
        </div>

        {/* 최근 본 상품 */}
        {isReady && recents.length > 0 ? (
          <div className='search-recent'>
            <h2 className='search-title'>최근 본 상품</h2>
            <div>
              <CardList data={recents} type={ctgrName} slidesPerView={4.5}/>
            </div>
          </div>
        ) : null}
      </div>

      {/* 하단 이미지 */}
      <div className='search-img'>
        <img src="/imgs/search.svg" alt="search" />
      </div>
    </div>
  )
}

export default SearchPage