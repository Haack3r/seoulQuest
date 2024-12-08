import { ShoppingCart, HeartIcon } from 'lucide-react';
import { Badge } from 'antd';
import CartComponent from '../menus/CartComponent';
import useCustomCart from '../../hooks/useCustomCart';
import useCustomLogin from '../../hooks/useCustomLogin';
import { getOne } from '../../api/productsApi';
import useCustomFav from '../../hooks/useCustomFav';
import ReviewsSection from '../review/ReviewsSection';
import { API_SERVER_HOST, deleteProductOne, putProductOne, getProductItemReview } from '../../api/reviewApi';
import { StarFilled, StarOutlined } from '@ant-design/icons';
import ProductPolicy from './ProductPolicy';
import { useEffect, useState } from 'react';

const initState = {
  pno: 0,
  pname: '',
  pdesc: '',
  pprice: 0,
  pqty: 0,
  shippingFee:0,
  uploadFileNames: [],
};

const host = API_SERVER_HOST;

const ReadComponent = ({ pno }) => {

  const [product, setProduct] = useState(initState);
  const [currentImage, setCurrentImage] = useState(0);
  const [cartVisible, setCartVisible] = useState(false);
  const [selectedQuantity, setSelectedQuantity] = useState(0);
  const { changeCart, cartItems } = useCustomCart();
  const { loginState } = useCustomLogin();
  const { favItems, changeFav, refreshFav } = useCustomFav();
  const [reviewAvg, setReviewAvg] = useState(0)
  const [reviews, setReviews] = useState([]);
  const [refresh, setRefresh] = useState(false)
  const [detailsVisible, setDetailsVisible] = useState(false);

  const calculateAverage = (reviews) => {
    if (reviews.length === 0) return 0;
    const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
    return sum / reviews.length;
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    // Product 데이터 가져오기
    getOne(pno).then((productData) => {
        setProduct(productData);
    });
    console.log(product)
    // Review 데이터 가져오기
    console.log(loginState.email);
    getProductItemReview(pno).then((reviews) => {
        console.log(reviews);
        setReviews(reviews);
        setReviewAvg(calculateAverage(reviews))
    });
  }, [pno, refresh]);

  const handleAddToCart = () => {
    if (!selectedQuantity) {
      alert("Please select a quantity.");
      return;
    }
  
    const existingItem = cartItems.find((item) => item.pno === product.pno);
    const currentQuantity = existingItem?.pqty || 0; // 현재 카트에 담긴 수량
    const totalQuantity = currentQuantity + selectedQuantity; // 현재 수량 + 새로 추가하려는 수량
  
    // stock을 초과할 경우 가능한 수량만 추가
    if (totalQuantity > product.pqty) {
      const maxAddable = product.pqty - currentQuantity; // 추가할 수 있는 최대 수량
      if (maxAddable > 0) {
        alert(`You can only add ${maxAddable} more of this product.`);
        changeCart({
          email: loginState.email,
          pno: product.pno,
          pqty: currentQuantity + maxAddable,
        });
      } else {
        alert(`You already have the maximum quantity of ${product.pqty} in your cart.`);
      }
    } else {
      // stock 초과가 아니면 정상적으로 추가
      changeCart({
        email: loginState.email,
        pno: product.pno,
        pqty: totalQuantity,
      });
    }
  
    setCartVisible(true);
  };

  const handleAddToFavorites = async () => {
    if (!loginState.email) {
      alert('Please log in to add favorites.');
      return;
    }

    const isAlreadyFavorite = favItems.some((item) => item.pno === product.pno);
    if (isAlreadyFavorite) {
      alert('You already liked this product!');
      return;
    }

    try {
      await changeFav({ email: loginState.email, pno: product.pno });
      alert('Product added to favorites!');
      refreshFav();
    } catch (error) {
      console.error('Failed to add favorite:', error);
      alert('Could not add to favorites. Please try again.');
    }
  };

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
          <h1 className="text-2xl md:text-4xl font-light text-gray-900">{product.pname}</h1>
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
              min="1"
              max={product.pqty}
              value={selectedQuantity}
              onChange={(e) => setSelectedQuantity(Number(e.target.value))}
              className="border rounded-lg p-2 w-20"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4">
            <button
              onClick={handleAddToCart}
              className="flex-1 bg-stone-400 hover:bg-stone-600 text-white py-3 rounded-lg flex items-center justify-center"
            >
              <ShoppingCart className="mr-2" />
              Add to Cart
            </button>
            <button
              onClick={handleAddToFavorites}
              className="flex-1 border text-gray-700 p-1 rounded-lg flex items-center justify-center hover:bg-gray-100"
            >
              <HeartIcon className=" text-red-500" />
              Add to Favorites
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

      {/* Cart Toggle Button */}
      <div className="fixed top-24 right-10">
        <Badge count={cartItems.length} offset={[0, 10]}>
          <button
            onClick={() => setCartVisible(!cartVisible)}
            className="bg-stone-400 hover:bg-stone-600 text-white p-3 rounded-full shadow-lg flex items-center justify-center"
          >
            <ShoppingCart className="h-6 w-6" />
          </button>
        </Badge>
      </div>

      {/* Cart Drawer */}
      <div
        className={`fixed top-0 right-0 h-[70%] w-96 mt-40 p-6 overflow-auto transform ${cartVisible ? 'translate-x-0' : 'translate-x-full'
          } transition-transform duration-300`}
      >
        <CartComponent/>
      </div>
      {/* Reviews Section */}
      <div className="mt-5">
        <ReviewsSection 
            refresh={refresh}
            setRefresh={setRefresh}
            reviews={reviews}
            putOne={putProductOne} 
            deleteOne={deleteProductOne}/>
      </div>
    </div>
  );
};

export default ReadComponent;
