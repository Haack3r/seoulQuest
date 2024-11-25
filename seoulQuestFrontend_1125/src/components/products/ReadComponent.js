import React, { useEffect, useState } from 'react';
import { API_SERVER_HOST, deleteProductOne, putProductOne } from '../../api/reviewApi';
import useCustomMove from '../../hooks/useCustomMove';
import { StarIcon, ShoppingCartIcon, HeartIcon } from 'lucide-react';
import { getOne } from '../../api/productsApi';
import FetchingModal from '../common/FetchingModal';
import useCustomCart from '../../hooks/useCustomCart';
import useCustomLogin from '../../hooks/useCustomLogin';
import CartComponent from '../menus/CartComponent';
import useCustomFav from '../../hooks/useCustomFav'; // Use useCustomFav for managing favorites
import ReviewsSection from '../review/ReviewsSection';
import { getProductItemReview} from '../../api/reviewApi';

const initState = {
    pno: 0,
    pname: '',
    pdesc: '',
    pprice: 0,
    pqty: 0,
    uploadFileNames: []
};
const host = API_SERVER_HOST;

const ReadComponent = ({ pno }) => {
    const { moveToList, moveToModify, page, size } = useCustomMove();
    const [product, setProduct] = useState(initState);
    const [fetching, setFetching] = useState(false);
    const [currentImage, setCurrentImage] = useState(0);
    const { changeCart, cartItems } = useCustomCart();
    const { loginState } = useCustomLogin();
    const { favItems, changeFav, refreshFav } = useCustomFav(); // Access favorites

    const [selectedQuantity, setSelectedQuantity] = useState(0);

    // Handle adding to cart
    const handleClickAddCart = () => {
        let pqty = selectedQuantity;
        if (selectedQuantity === 0) {
            window.alert("Please select a quantity.");
            return;
        }

        const addedItem = cartItems.find(item => item.pno === parseInt(pno));
        if (cartItems.error !== 'ERROR_ACCESS_TOKEN') {
            if (addedItem) {
                if (!window.confirm("This item is already in the cart. Do you want to add it again?")) return;
                pqty += addedItem.pqty;
            }
            changeCart({ email: loginState.email, pno: pno, pqty: pqty });
        }
    };

    // Handle quantity change
    const handleChangeQuantity = (e) => {
        setSelectedQuantity(parseInt(e.target.value));
    };

    // Handle adding to favorites
    const handleAddToFavorites = async () => {
        if (!loginState.email) {
            window.alert("Please log in to add favorites.");
            return;
        }

        // Check if the product is already in the favorites
        const isAlreadyFavorite = favItems.some(item => item.pno === product.pno);
        if (isAlreadyFavorite) {
            alert("You already liked this product!");
            return;
        }

        try {
            await changeFav({ email: loginState.email, pno: product.pno });
            alert("Product added to favorites!");
            refreshFav(); // Update favorites after adding
        } catch (error) {
            console.error("Failed to add favorite:", error);
            alert("Could not add to favorites. Please try again.");
        }
    };

    useEffect(() => {
        setFetching(true);
        getOne(pno).then(data => {
            setProduct(data);
            setFetching(false);
        });
    }, [pno]);

    return (
        <div className='grid grid-cols-3 gap-6 mt-10 m-4'>
            <div className='col-span-2 p-4 rounded-lg'>
                {fetching ? <FetchingModal /> : null}
                <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                            {/* Product Image */}
                            <div className="relative h-96 md:h-full">
                                <div className="space-y-4">
                                    <div className="aspect-square relative">
                                        <img
                                            src={`${host}/api/products/view/${product.uploadFileNames[currentImage]}`}
                                            alt={product.pname}
                                            className="rounded-lg object-cover w-full h-full"
                                        />
                                    </div>
                                    <div className="flex space-x-2">
                                        {product.uploadFileNames.map((image, index) => (
                                            <button
                                                key={index}
                                                onClick={() => setCurrentImage(index)}
                                                className={`w-20 h-20 relative rounded-md overflow-hidden ${currentImage === index ? 'ring-2 ring-primary' : ''}`}
                                            >
                                                <img
                                                    src={`${host}/api/products/view/${image}`}
                                                    alt={`${product.pname} thumbnail ${index + 1}`}
                                                    className="rounded-lg object-cover w-full h-full"
                                                />
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Product Details */}
                            <div>
                                <h1 className="text-4xl font-light tracking-wide text-gray-900 mb-4">{product.pname}</h1>
                                <div className="flex items-center mb-4">
                                    {[...Array(5)].map((_, i) => (
                                        <StarIcon key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                                    ))}
                                    <span className="ml-2 text-gray-600">(4.8) 24 reviews</span>
                                </div>
                                <p className="text-2xl font-light text-gray-900 mb-6">₩{product.pprice.toLocaleString()}</p>
                                <p className="text-gray-700 mb-6">{product.pdesc}</p>

                                {/* Size Selection */}
                                <div className="mb-6">
                                    <label htmlFor="size" className="text-gray-700 mb-2 block">Size</label>
                                    <select
                                        id="size"
                                        className="w-full border border-gray-300 p-2 rounded-lg"
                                    >
                                        <option value="">Select size</option>
                                        <option value="s">Small</option>
                                        <option value="m">Medium</option>
                                        <option value="l">Large</option>
                                        <option value="xl">X-Large</option>
                                    </select>
                                </div>

                                {/* Quantity Selection */}
                                <div className="flex items-center mb-6">
                                    <label htmlFor="quantity" className="text-gray-700 mr-4">Quantity</label>
                                    <input
                                        id="quantity"
                                        type="number"
                                        min="1"
                                        max={product.pqty}
                                        placeholder='0'
                                        value={selectedQuantity}
                                        onChange={handleChangeQuantity}
                                        className="w-20 border border-gray-300 p-2 rounded-lg"
                                    />
                                </div>

                                {/* Add to Cart and Wishlist Buttons */}
                                <div className="flex space-x-4 mb-8">
                                    <button
                                        className="flex items-center justify-center bg-stone-400 hover:bg-stone-600 text-white p-3 rounded-lg w-full"
                                        onClick={handleClickAddCart}
                                    ><ShoppingCartIcon className="mr-2 h-4 w-4" /> Add to Cart
                                    </button>
                                    <button
                                        className="flex items-center justify-center border border-gray-300 text-gray-700 hover:bg-gray-100 p-3 rounded-lg w-full"
                                        onClick={handleAddToFavorites}
                                    >
                                        <HeartIcon className="mr-2 h-4 w-4" /> Add to Favorites
                                    </button>
                                </div>

                                {/* Product Details */}
                                <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg">
                                    <h2 className="text-gray-900 text-lg font-semibold mb-2">Product Details</h2>
                                    <ul className="list-disc list-inside text-gray-700">
                                        <li>Material: 100% premium silk</li>
                                        <li>Handcrafted in Seoul, South Korea</li>
                                        <li>Includes both jeogori (jacket) and chima (skirt)</li>
                                        <li>Decorative norigae (hanging ornament) included</li>
                                        <li>Dry clean only</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Reviews Section */}
                    <div className="mt-5">
                        <ReviewsSection 
                            itemNo={pno} 
                            getItemReview ={getProductItemReview}
                            putOne={putProductOne} 
                            deleteOne={deleteProductOne}/>
                    </div>
                </div>

            </div>

            {/* Cart Section */}
            <div className='col-span-1 w-full sticky top-20 transition-all duration-300'>
                <CartComponent />
            </div>

        </div>
    );
import { API_SERVER_HOST } from '../../api/todoApi';
import { StarIcon, ShoppingCart, HeartIcon } from 'lucide-react';
import { Badge } from 'antd';
import CartComponent from '../menus/CartComponent';
import useCustomCart from '../../hooks/useCustomCart';
import useCustomLogin from '../../hooks/useCustomLogin';
import { getOne } from '../../api/productsApi';
import useCustomFav from '../../hooks/useCustomFav';

const initState = {
  pno: 0,
  pname: '',
  pdesc: '',
  pprice: 0,
  pqty: 0,
  uploadFileNames: [],
};

const host = API_SERVER_HOST;

const ReadComponent = ({ pno }) => {
  const [product, setProduct] = useState(initState);
  const [fetching, setFetching] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const [cartVisible, setCartVisible] = useState(false);
  const [selectedQuantity, setSelectedQuantity] = useState(0);
  const { changeCart, cartItems } = useCustomCart();
  const { loginState } = useCustomLogin();
  const { favItems, changeFav, refreshFav } = useCustomFav();

  // Fetch product details
  useEffect(() => {
    setFetching(true);
    getOne(pno).then((data) => {
      setProduct(data);
      setFetching(false);
    });
  }, [pno]);

  const handleAddToCart = () => {
    if (!selectedQuantity) {
      alert('Please select a quantity.');
      return;
    }

    const existingItem = cartItems.find((item) => item.pno === product.pno);
    if (existingItem) {
      if (!window.confirm('This item is already in the cart. Do you want to add it again?')) return;
    }

    changeCart({
      email: loginState.email,
      pno: product.pno,
      pqty: selectedQuantity + (existingItem?.pqty || 0),
    });

    setCartVisible(true); // Open cart automatically
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
        <div className="lg:w-1/3 flex flex-col items-center space-y-6">
          <div className="w-full h-[650px]">
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
                className={`w-20 h-20 overflow-hidden ${
                  currentImage === index ? 'ring-2 ring-blue-500' : ''
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
            {[...Array(5)].map((_, i) => (
              <StarIcon key={i} className="h-5 w-5 text-yellow-400" />
            ))}
            <span className="text-gray-600">(4.8) 24 reviews</span>
          </div>
          <p className="text-2xl text-gray-900">₩{product.pprice.toLocaleString()}</p>
          <p className="text-gray-700">{product.pdesc}</p>

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
              className="flex-1 border text-gray-700 py-3 rounded-lg flex items-center justify-center hover:bg-gray-100"
            >
              <HeartIcon className="mr-2 text-red-500" />
              Add to Favorites
            </button>
          </div>

          {/* Product Details */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h2 className="text-lg font-semibold text-gray-900">Product Details</h2>
            <ul className="list-disc list-inside text-gray-700">
              <li>Material: 100% premium silk</li>
              <li>Handcrafted in Seoul, South Korea</li>
              <li>Includes both jeogori (jacket) and chima (skirt)</li>
              <li>Decorative norigae (hanging ornament) included</li>
              <li>Dry clean only</li>
            </ul>
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
        className={`fixed top-0 right-0 h-[70%] w-96 bg-white shadow-lg mt-40 p-6 overflow-auto transform ${
          cartVisible ? 'translate-x-0' : 'translate-x-full'
        } transition-transform duration-300`}
      >
        <CartComponent />
      </div>
    </div>
  );
};

export default ReadComponent;
