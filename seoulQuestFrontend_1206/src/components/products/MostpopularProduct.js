import React, { useEffect, useState } from "react";
import { getTopSellingProducts } from "../../api/productsApi";
import useCustomMove from './../../hooks/useCustomMove';
import { API_SERVER_HOST } from "../../api/reviewApi";
import useCustomLogin from "../../hooks/useCustomLogin";
import { getTopSellingProductsNU } from "../../api/nuProductApi";


const host = API_SERVER_HOST;

const MostPopularProduct = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { moveToProductRead, moveToProductReadNU } = useCustomMove();
  const { loginState } = useCustomLogin();

  useEffect(() => {
    if(loginState.email){
    getTopSellingProducts(3)
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching most popular products:", err);
        setError(err.message || "Failed to load products");
        setLoading(false);
      });
    } else {
      getTopSellingProductsNU(3)
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching most popular products:", err);
        setError(err.message || "Failed to load products");
        setLoading(false);
      });
    }
  }, []);

  if (loading) {
    return <div className="text-center mt-12">Loading popular products...</div>;
  }

  if (error) {
    return <div className="text-center mt-12 text-red-500">{error}</div>;
  }

  return (
    <div className="mt-12 max-w-5xl mx-auto flex flex-col items-center">
      <h2 className="text-gray-700 text-2xl font-bold text-center mb-8 tracking-wide uppercase">
        Most Popular Products
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-8">
        {products.map((product) => (
          <div onClick={() => {loginState.email ? moveToProductRead(product.pno) : moveToProductReadNU(product.pno)}} key={product.pno} className="flex flex-col items-center">
            <div className="relative w-56 h-80 overflow-hidden">
              <p className="py-1 text-gray-700 text-xs text-left">
                {product.categoryName || "No Category"}
              </p>
              <img
                src={`${host}/api/products/view/${product.uploadFileNames[0]}`}
                alt={product.pname}
                className="w-full h-full object-cover opacity-80 hover:opacity-90"
              />
            </div>
            <div className="w-56 text-left mt-2">
              <span className="block text-sm font-bold text-gray-700">
                {product.pname}
              </span>
              <span className="block text-sm text-gray-500">
                {/* {product.pqty} sold */}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MostPopularProduct;
