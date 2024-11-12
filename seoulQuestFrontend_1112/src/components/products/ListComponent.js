import React, { useEffect, useState } from "react";
import useCustomMove from "./../../hooks/useCustomMove";
import { getList } from "../../api/productsApi";
import FetchingModal from "../common/FetchingModal";
import { API_SERVER_HOST } from "../../api/todoApi";
import PageComponent from "../common/PageComponent";
import useCustomLogin from "../../hooks/useCustomLogin";
import Button from "../ui/Button";
import useCustomFav from '../../hooks/useCustomFav';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/Card";
import { HeartIcon, SearchIcon } from "lucide-react";
import { Input } from "antd";

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

const ListComponent = () => {
  const [serverData, setServerData] = useState(initState);
  const { exceptionHandle } = useCustomLogin();
  const { page, size, refresh, moveToList, moveToRead } = useCustomMove();
  const { loginState } = useCustomLogin();
  const { favItems, changeFav, deleteFav, refreshFav } = useCustomFav();
  const [keyword, setKeyword] = useState("");
  const [type, setType] = useState("t");
  const [fetching, setFetching] = useState(false);

    
  useEffect(() => {
    refreshFav();
  }, []);
    
  // Toggle favorite status
  const handleToggleFavorite = async (product) => {
    if (!loginState.email) {
        window.alert("Please log in to manage favorites.");
        return;
    }
    
    const isFavorite = favItems.some(item => item.pno === product.pno);
    
    if (isFavorite) {
        const favoriteItem = favItems.find(item => item.pno === product.pno);
        await deleteFav(favoriteItem.fino); // Use `fino` for deletion
    } else {
        await changeFav({ email: loginState.email, pno: product.pno });
    }
};
  

// Fetch product list on mount and `favItems` change
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
}, [page, size, refresh, keyword, type, favItems]); // Use favItems here for accurate UI sync


  const handleSearch = () => {
    moveToList(1);
    setFetching(true);
    getList({ page: 1, size, keyword, type })
      .then((data) => {
        setServerData(data || initState);
        setFetching(false);
      })
      .catch((err) => {
        exceptionHandle(err);
        setFetching(false);
      });
  };

  return (
    <div className="py-12">
      <section className="px-4 max-w-6xl mx-auto">
        <h2 className="mb-12 text-4xl font-bold text-center text-gray-800 tracking-wide uppercase">
          Artisan Treasures
        </h2>

        {/* Search Input */}
        <div className="mt-8 flex justify-center mb-8">
          <div className="flex w-full max-w-2xl bg-white rounded-full shadow-lg overflow-hidden border border-gray-200">
            <Input
              placeholder="Search experiences..."
              className="flex-grow border-0 focus:ring-0 text-lg px-6"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
            <Button
              className="bg-orange-800 hover:bg-rose-700 text-white font-medium tracking-wide py-6 px-6 rounded-r-full"
              onClick={handleSearch}
            >
              <SearchIcon className="h-5 w-5 mr-2" />
              Explore
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-20">
          {serverData.dtoList && serverData.dtoList.length > 0 ? (
            serverData.dtoList.map((product) => {
              const isFavorite = favItems.some(item => item.pno === product.pno);

              return (
                <Card
                  key={product.pno}
                  onClick={() => moveToRead(product.pno)}
                  className="relative w-[320px] h-[430px] rounded-lg overflow-hidden bg-white border border-white border-opacity-40 p-4 bg-opacity-20 backdrop-blur-lg transition-transform duration-300 transform group-hover:scale-105 group-hover:shadow-lg cursor-pointer"
                >
                  <div className="relative w-full h-48 mb-3 rounded-lg overflow-hidden">
                    <img
                      src={`${host}/api/products/view/s_${product.uploadFileNames[0]}`}
                      alt={product.pname}
                      className="w-full h-full object-cover opacity-80 transition-opacity duration-300 group-hover:opacity-100"
                    />
                    <div className="absolute inset-0 bg-black opacity-40 group-hover:opacity-50 transition-opacity"></div>
                  </div>

                  <div className="relative z-10 flex flex-col items-center justify-center text-center text-white uppercase tracking-wider">
                    <CardTitle className="text-lg font-semibold mb-1">
                      {product.pname}
                    </CardTitle>
                    <CardDescription className="text-sm font-medium mb-2 opacity-90">
                      ₩{product.pprice.toLocaleString()}
                    </CardDescription>

                    <button
                      className={`hover:text-gray-500 ${isFavorite ? 'text-gray-500 fill-current' : 'text-white'}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleToggleFavorite(product);
                      }}
                    >
                      <HeartIcon className={`mr-2 h-4 w-4 ${isFavorite ? 'fill-current' : ''}`} />
                    </button>

                    <Button
                      variant="outline"
                      className="px-6 py-2 mt-4 bg-white bg-opacity-50 text-black font-semibold rounded-lg text-sm transition-all duration-300 hover:bg-opacity-80 hover:shadow-md"
                    >
                      Add to Collection
                    </Button>
                  </div>
                </Card>
              );
            })
          ) : (
            <p className="text-center text-gray-500">No products available.</p>
          )}
        </div>
      </section>

      <PageComponent serverData={serverData} movePage={moveToList} />
    </div>
  );
};

export default ListComponent;
