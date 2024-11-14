import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import NotificationMenu from '../ui/Notification';
import {
  divideKorean,
  combineKorean,
  handleInput,
  isKorean,
  CHO_KOREAN,
  JUNG_KOREAN,
  JONG_KOREAN
} from '../../ui/KoreanComplete';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

// 검색창에 대한 CSS 추가
const searchStyles = `
.search-container {
  position: relative;
  }

  .autocomplete {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: white;
    border-radius: 5px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
    z-index: 1000;
    }
    
    .autocomplete > div {
      background: #f1f3f499;
      padding: 0.2rem 0.6rem;
      cursor: pointer;
      }
      
      .autocomplete > div.active {
        background: #e0e5f6;
        color: #000;
        }
        
        mark {
          background: #febf0090;
          }
          
          input {
            width: 100%;
            height: 3rem;
            border-radius: 5px;
            padding: 0 1rem 0 3rem;
            border: 1px solid #e0e5f6;
            background: #fff;
            }
            
            input::placeholder {
              font-size: 1rem;
              }
              `;


const AdminBasicMenu = () => {
  // const loginState = useSelector(state => state.loginSlice)
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const searchRef = useRef(null);

  // 자동완성 옵션 (예시)
  const dataList = ["빨간색", "주황색", "노랑색", "초록색", "파란색"]

  // 초성검색
  function makeRegexByCho(search = "") {
    const regex = CHO_KOREAN.reduce(
      (acc, cho, index) =>
        acc.replace(
          new RegExp(cho, "g"),
          `[${String.fromCharCode(0xAC00 + index * 588)}-${String.fromCharCode(0xAC00 + (index + 1) * 588 - 1)}]`
        ),
      search
    );

    return new RegExp(`(${regex})`, "g");
  }

  function includeByCho(search, targetWord) {
    return makeRegexByCho(search).test(targetWord);
  }

  // 검색어 필터링
  const filterSuggestions = (value) => {
    if (!value) {
      setSuggestions([]);
      return;
    }

    const matchDataList = dataList.filter(label =>
      label.includes(value) || includeByCho(value, label)
    );
    setSuggestions(matchDataList);
  }

  // 방향키와 엔터 키로 단어 선택
  const handleKeyDown = (e) => {
    if (suggestions.length === 0) return

    switch (e.keyCode) {

      // up key
      case 38:
        setActiveIndex(prev => Math.max(prev - 1, 0))
        break

      // down key
      case 40:
        setActiveIndex(prev => Math.min(prev + 1, suggestions.length - 1))
        break

      // enter key
      case 13:
        if (suggestions[activeIndex]) {
          setSearchTerm(suggestions[activeIndex])
          setSuggestions([])
        }
        break

      default:
        break
    }
  }

  // 검색어 하이라이트 처리
  const highlightMatch = (text) => {
    if (!searchTerm) return text

    // 일반 검색어 매칭을 위한 정규식
    const normalRegex = new RegExp(`(${searchTerm})`, "gi");

    // 초성 검색어 매칭을 위한 정규식
    const choRegex = makeRegexByCho(searchTerm);

    // 일반 매칭 시도
    if (text.match(normalRegex)) {
      return text.replace(normalRegex, "<mark>$1</mark>");
    }

    // 초성 매칭 시도
    if (text.match(choRegex)) {
      return text.replace(choRegex, "<mark>$1</mark>");
    }

    return text;
  }

  return (
    <>
      <style>{searchStyles}</style>
      <header className="h-16 bg-white font-sans shadow-sm fixed top-0 left-0 right-0 bg-opacity-70 backdrop-blur-md z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            {/* Brand Name */}
            {/* <div className="flex items-center"> */}
            <div className="flex-grow flex justify-center lg:justify-start">
              {/* <Link to={'/'} */}
              <Link
                to={'/'}
                className="text-2xl font-semibold tracking-wide text-gray-900">
                Seoul
                <span className="text-red-800">Culture</span>
                <span className="text-blue-900">Quest</span>
              </Link>
            </div>
            {/* <div className='hidden lg:flex lg:flex-grow lg:justify-between lg:items-center px-8'> */}
            <div className='hidden lg:flex items-center space-x-4'>
              {/* 검색기능 */}
              <nav className="flex space-x-4 items-center">
                <div className="relative"> {/* 검색 컨테이너 추가 */}
                  <Search>
                    <SearchIconWrapper>
                      <SearchIcon sx={{ color: '#fb8c00' }} />
                    </SearchIconWrapper>
                    {/* 검색어 입력 폼 */}
                    <input
                      ref={searchRef}
                      type='text'
                      value={searchTerm}
                      onChange={(e) => {
                        setSearchTerm(e.target.value)
                        filterSuggestions(e.target.value)
                      }}
                      onKeyDown={handleKeyDown}
                      placeholder='Search...'
                      autoComplete='off'
                    />
                    {suggestions.length > 0 && (
                      <div className="autocomplete">
                        {suggestions.map((suggestion, index) => (
                          <div
                            key={suggestion}
                            className={index === activeIndex ? 'active' : ''}
                            onClick={() => {
                              setSearchTerm(suggestion);
                              setSuggestions([]);
                            }}
                            dangerouslySetInnerHTML={{
                              __html: highlightMatch(suggestion)
                            }}
                          />
                        ))}
                      </div>
                    )}
                  </Search>
                </div>
                {/* <SearchWithAutocomplete /> */}
              </nav>
              {/* <div className='flex space-x-4 items-center lg:flex-grow lg:justify-between lg:items-center'> */}
              {/* <NotificationMenu className="h-5 w-5 text-gray-600 hover:text-gray-900" /> */}
              <NotificationMenu className="text-gray-600 hover:text-gray-900" />
              {/* <nav className="flex space-x-4 items-center"> */}
              <Link to={'/member/logout/'} className="flex items-center space-x-2 text-gray-600 hover:text-gray-900">Logout</Link>
              {/* </nav> */}
              {/* </div> */}
            </div>
          </div >
        </div >
      </header >
    </>
  )
}

export default AdminBasicMenu