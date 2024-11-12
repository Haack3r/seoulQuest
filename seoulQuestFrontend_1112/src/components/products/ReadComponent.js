import React, { useEffect, useState } from 'react';
import { API_SERVER_HOST } from '../../api/todoApi';
import useCustomMove from '../../hooks/useCustomMove';
import { StarIcon, ShoppingCartIcon, HeartIcon } from 'lucide-react';
import { getOne } from '../../api/productsApi';
import FetchingModal from '../common/FetchingModal';
import useCustomCart from '../../hooks/useCustomCart';
import useCustomLogin from '../../hooks/useCustomLogin';
import CartComponent from '../menus/CartComponent';
import useCustomFav from '../../hooks/useCustomFav'; // Import useCustomFav for favorite items

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
    const { favItems, changeFav, refreshFav } = useCustomFav(); // Add favItems and changeFav
    const [selectedQuantity, setSelectedQuantity] = useState(0);

    useEffect(() => {
        setFetching(true);
        getOne(pno).then(data => {
            setProduct(data);
            setFetching(false);
        });
    }, [pno]);

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
    
        // Try to add to favorites and show success alert
        try {
            await changeFav({ email: loginState.email, pno: product.pno });
            alert("Product added to favorites!"); // Show success message
            refreshFav(); // Update favorites after adding
        } catch (error) {
            console.error("Failed to add favorite:", error);
            alert("Could not add to favorites. Please try again.");
        }
    };
    

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

                                {/* Add to Cart and Favorites */}
                                <div className="flex space-x-4 mb-8">
                                    <button
                                        className="flex items-center justify-center bg-stone-400 hover:bg-stone-600 text-white p-3 rounded-lg w-full"
                                        onClick={handleClickAddCart}
                                    ><ShoppingCartIcon className="mr-2 h-4 w-4" /> Add to Cart
                                    </button>
                                    <button
                                        className="flex items-center justify-center border border-gray-300 text-gray-700 hover:bg-gray-100 p-3 rounded-lg w-full"
                                        onClick={handleAddToFavorites} // Use updated handleAddToFavorites
                                    >
                                        <HeartIcon className="mr-2 h-4 w-4" /> Add to Favorites
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Cart Section */}
            <div className='col-span-1 w-full sticky top-20 transition-all duration-300'>
                <CartComponent />
            </div>
        </div>
    );
};

export default ReadComponent;
