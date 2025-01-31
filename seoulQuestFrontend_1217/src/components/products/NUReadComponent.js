import React, { useEffect, useState } from 'react';
import { API_SERVER_HOST, getProductItemReview } from '../../api/reviewApi';
import ReviewsSection from '../review/ReviewsSection';
import { ShoppingCart } from 'lucide-react';
import {StarFilled, StarOutlined } from "@ant-design/icons";
import useCustomLogin from '../../hooks/useCustomLogin';
import { getOneNU } from '../../api/nuProductApi';
import { useNavigate } from 'react-router-dom';
import ProductPolicy from './ProductPolicy';
import { Badge } from 'antd';

const initState = {
  pno: 0,
  pname: '',
  pdesc: '',
  pprice: 0,
  pqty: 0,
  shippingFee:0,
  uploadFileNames: []
};
const host = API_SERVER_HOST;

const NUReadComponent = ({ pno }) => {
  // const { moveToList, moveToModify, page, size } = useCustomMove();
  const [product, setProduct] = useState(initState);
  const [fetching, setFetching] = useState(false);
  const [currentImage, setCurrentImage] = useState(0)
  const { loginState } = useCustomLogin();
  const [selectedQuantity, setSelectedQuantity] = useState(0);
  const [reviewAvg, setReviewAvg] = useState(0)
  const [reviews, setReviews] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [detailsVisible, setDetailsVisible] = useState(false);
  const navigate = useNavigate();

  const calculateAverage = (reviews) => {
    if (reviews.length === 0) return 0;
    const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
    const avg = sum / reviews.length; 
    return Number(avg.toFixed(1));
  };

  const handleClickAddCart = () => {
    const answer = window.confirm("Please log in first to purchase the product.")
    if(answer){
      navigate('/member/login')
    }
    return
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    setFetching(true);
    getOneNU(pno).then(data => {
      setProduct(data);
      setFetching(false);
    });

    // Review 데이터 가져오기
    console.log(loginState.email);
    getProductItemReview(pno).then((reviews) => {
        console.log(reviews);
        setReviews(reviews);
        setReviewAvg(calculateAverage(reviews))
    });
  }, [pno,refresh]);

  return (
    <div className="min-h-screen py-12 px-6 lg:px-32 relative">
      <div className="flex flex-col lg:flex-row lg:space-x-12">
        {/* Left Section: Image Gallery */}
        <div className="w-full lg:w-[450px] flex flex-col items-center space-y-6">
          <div className="w-full h-64 md:h-[450px] lg:h-[650px]">
            <img
              src={`${host}/api/products/view/${product.uploadFileNames[currentImage]}`}
              alt={product.pname}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex space-x-3 overflow-x-auto w-full">
            {product.uploadFileNames.map((image, index) => (
              <button
                key={index}
                onClick={() => setCurrentImage(index)}
                className={`w-20 h-20 overflow-hidden ${currentImage === index ? 'ring-2 ring-blue-500' : ''
                  }`}
              >
                <img
                  src={`${host}/api/products/view/${image}`}
                  alt={`${product.pname} thumbnail`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Right Section: Product Details */}
        <div className="lg:w-1/2 space-y-6">
          <h1 className="text-4xl font-light text-gray-900">{product.pname}</h1>
          <div className="flex items-center space-x-2">
           {[...Array(5)].map((_, star) => 
            (
            <span key={star}>
              {reviewAvg >= star+1 ? (
                        <StarFilled className="text-yellow-400 text-xl" />
                    ) : (
                        <StarOutlined className="text-gray-300 text-xl" />
                    )}
              </span>
            )
            )}
            <span className="text-gray-600">({reviewAvg}) {reviews.length} reviews</span>
          </div>
          <p className="text-2xl text-gray-900">₩{product.pprice.toLocaleString()}</p>
          <Badge
            count={product.shippingFee ? `Shipping Fee ₩${product.shippingFee}` : "Free Shipping"}
            style={{
              backgroundColor: product.shippingFee ? "#718C5A" : "#0097A7", // 유료 배송과 무료 배송에 따라 색상 변경
              color: "#fff",
              padding: "0 10px",
              borderRadius: "5px",
            }}
          />
          <p className="text-gray-700 mb-6">{product.pdesc}</p>

          {/* Quantity Selector */}
          <div className="flex items-center space-x-4">
            <label htmlFor="quantity" className="text-gray-700">
              Quantity
            </label>
            <input
              type="number"
              id="quantity"
              min="0"
              max={product.pqty}
              value={selectedQuantity}
              onChange={(e) => setSelectedQuantity(Number(e.target.value))}
              className="border rounded-lg p-2 w-20"
            />
            {product.pqty ? '': <p className='text-red-600 font-semibold'>out of stock</p>}
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4">
            <button
              onClick={handleClickAddCart}
              className="flex-1 bg-stone-400 hover:bg-stone-600 text-white py-3 rounded-lg flex items-center justify-center"
            >
              <ShoppingCart className="mr-2" />
              Add to Cart
            </button>
          </div>

           {/* Product Details */}
           <div className="mt-10 bg-gray-100 p-6 rounded-lg">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-900">
                Product Policies
              </h2>
              <button
                onClick={() => setDetailsVisible(!detailsVisible)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                {detailsVisible ? "-" : "+"}
              </button>
            </div>
            {detailsVisible && <ProductPolicy />}
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mt-5">
        <ReviewsSection
            refresh={refresh}
            setRefresh={setRefresh}
            reviews={reviews}
          />
      </div>
    </div>
  )
}

export default NUReadComponent;
