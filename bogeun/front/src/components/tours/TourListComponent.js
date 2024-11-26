import React, { useEffect, useRef, useState } from "react";
import useCustomMove from "./../../hooks/useCustomMove";
import FetchingModal from "../common/FetchingModal";
import { API_SERVER_HOST } from "../../api/todoApi";
import PageComponent from "../common/PageComponent";
import useCustomLogin from "../../hooks/useCustomLogin";
import Button from "../ui/Button";
import { getList } from "../../api/tourApi";
import Input from "../ui/Input"; // Assuming you have an Input component
import { SearchIcon } from "lucide-react";

const host = API_SERVER_HOST;

const initState = {
  dtoList: [],
  pageNumList: [],
  pageRequestDTO: null,
  prev: false,
  next: false,
  totalCount: 0,
  prevPage: 0,
  nextPage: 0,
  totalPage: 0,
  current: 0,
};

const TourListComponent = () => {
  const { exceptionHandle } = useCustomLogin();
  const { page, size, refresh, moveToList, moveToRead } = useCustomMove();
  const [serverData, setServerData] = useState(initState);
  const [fetching, setFetching] = useState(false);

  // 검색바 관련
  // New states for search
  const [keyword, setKeyword] = useState("");
  const [type, setType] = useState("t"); // Default type; adjust based on your needs
  const [suggestions, setSuggestions] = useState([])
  const [activeIndex, setActiveIndex] = useState(0)
  const dataList = serverData.dtoList.map(tour => tour.tname)

  const filterSuggestions = (value) => {
    if (!value) {
      setSuggestions([])
      return
    }

    // 대소문자 구분없이 자동완성을 소문자를 기준으로 만듬
    const lowerAlphabet = dataList.filter(word =>
      word.toLowerCase().includes(value.toLowerCase())
    )

    setSuggestions(lowerAlphabet)

    // const result = filterSuggestions(value, dataList)
    // setSuggestions(result)
  }

  const handleKeyDown = (e) => {
    if (suggestions.length === 0)
      return

    switch (e.keyCode) {
      case 38:
        setActiveIndex(prev => (Math.max(prev - 1, 0)))
        break

      case 40:
        setActiveIndex(prev => (Math.min(prev + 1, suggestions.length - 1)))
        break

      case 13:
        if (suggestions[activeIndex]) {
          setKeyword(suggestions[activeIndex])
          setSuggestions([])
        }
        break

      default:
        break
    }
  }

  // Handle search submission
  const handleSearch = () => {
    // Trigger a refresh with new keyword
    setFetching(true);
    getList({ page: 1, size, keyword, type })
      .then((data) => {
        if (data && Array.isArray(data.dtoList)) {
          setServerData(data);
        } else {
          setServerData(initState);
        }
        setFetching(false);
      })
      .catch((err) => {
        exceptionHandle(err);
        setFetching(false);
      });
  };

  const highlightMatch = (text, searchValue) => {
    if (!searchValue) return text

    const regex = new RegExp(`(${searchValue})`, "gi")

    return text.replace(regex, "<mark>$1</Mark>")
  }

  // Fetch list with search and pagination
  useEffect(() => {
    setFetching(true);
    getList({ page, size, keyword, type })
      .then((data) => {
        if (data && Array.isArray(data.dtoList)) {
          setServerData(data);
        } else {
          setServerData(initState);
        }
        setFetching(false);
      })
      .catch((err) => {
        exceptionHandle(err);
        setFetching(false);
      });
  }, [page, size, refresh, keyword, type]);

  const searchStyles = `
  mark {
    background-color: #ffeb3b;
    padding: 0;
  }
`;


  return (
    <div className="py-12">
      {/* {fetching ? <FetchingModal /> : null} */}
      <section className="px-4 max-w-5xl mx-auto mb-1">
        <h2 className="mb-10 text-3xl font-bold uppercase text-center text-gray-800 tracking-widest">
          Curated Experiences
        </h2>

        {/* Search Input */}
        <div className="relative w-full max-w-2xl">
          <div className="flex max-w-2xl bg-white rounded-full shadow-lg overflow-hidden border border-gray-200">
            <Input
              placeholder="Search experiences..."
              className="flex-grow border-0 focus:ring-0 text-lg py-6 px-6"
              type="text"
              value={keyword}
              onChange={(e) => {
                setKeyword(e.target.value)
                filterSuggestions(e.target.value)
              }}
              onKeyDown={handleKeyDown}
            />
            <Button
              className="bg-orange-800 hover:bg-rose-700 text-white font-medium tracking-wide py-6 px-6 rounded-r-full"
              onClick={handleSearch}
            >
              <SearchIcon className="h-5 w-5 mr-2" />
              Explore
            </Button>
          </div>
          {/** 자동완성에 하이라이트 추가 */}
          {suggestions.length > 0 && (
            <div className="absolute w-full mt-1 bg-white shadow-lg rounded-lg overflow-hidden">
              {suggestions.map((suggestion, index) => (
                <div
                  key={suggestion}
                  className={`px-6 py-2 cursor-pointer hover:bg-gray-100
                    ${index === activeIndex ? 'bg-gray-100' : ''}`}
                  onClick={() => {
                    setKeyword(suggestion);
                    setSuggestions([]);
                  }}
                  dangerouslySetInnerHTML={{
                    __html: highlightMatch(suggestion, keyword)
                  }}
                />
              ))}
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-20 mt-10">
          {serverData.dtoList.map((tour) => (
            <div
              key={tour.tno}
              className="flex flex-col items-center transition-transform duration-300 cursor-pointer group"
              onClick={() => moveToRead(tour.tno)}
            >
              <div className="relative w-[320px] h-[430px] rounded-lg border border-white border-opacity-40 p-4 bg-opacity-20 backdrop-blur-lg transition-all duration-300 transform group-hover:scale-105 group-hover:shadow-lg">
                <div className="relative w-full h-48 mb-3 rounded-lg overflow-hidden">
                  <div
                    className="w-full h-full bg-cover bg-center opacity-80 transition-opacity duration-300 group-hover:opacity-90"
                    style={{
                      backgroundImage: `url(${host}/api/tours/view/s_${tour.uploadFileNames[0]})`,
                    }}
                  ></div>
                  <div className="absolute inset-0 bg-black opacity-40 group-hover:opacity-50 transition-opacity"></div>
                </div>
                <div className="relative z-10 flex flex-col items-center justify-center text-center text-white uppercase tracking-widest">
                  <h3 className="text-lg font-bold mb-1">{tour.tname}</h3>
                  <p className="text-sm font-medium mb-2 opacity-90">
                    ₩{tour.tprice} per person
                  </p>
                  <button className="px-6 py-2 bg-white bg-opacity-50 text-black font-semibold rounded-lg text-sm transition-all duration-300 hover:bg-opacity-80 hover:shadow-md">
                    Reserve
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section >

      <PageComponent serverData={serverData} movePage={moveToList} />
    </div >
  );
};

export default TourListComponent;
