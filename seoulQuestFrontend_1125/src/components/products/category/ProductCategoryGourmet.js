import React from "react";
import { HeartIcon } from "lucide-react";

const ProductCategoryGourmet = () => {
  const categories = [
    {
      id: 1,
      name: "Gourmet Delights",
      image: "https://cdn.pixabay.com/photo/2017/01/06/19/15/tea-1950004_1280.jpg",
      products: [
        {
          id: 1,
          name: "Premium Seafood Stir-fry",
          price: "₩25,000",
          image:
            "https://images.unsplash.com/photo-1583032353423-04fd96ef221c?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
        {
          id: 2,
          name: "Korean Fermented Bean",
          price: "₩15,000",
          image:
            "https://images.unsplash.com/photo-1641735883611-e2bbcde5b903?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
        {
          id: 3,
          name: "Traditional Pastries",
          price: "₩30,000",
          image:
            "https://images.unsplash.com/photo-1605972023865-471b1488b6a9?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
        {
          id: 4,
          name: "Handmade Kimchi",
          price: "₩40,000",
          image:
            "https://plus.unsplash.com/premium_photo-1705808668720-30680abf0854?q=80&w=869&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
      ],
    },
  ];

  return (
    <div className="flex flex-wrap lg:flex-nowrap gap-8 max-w-6xl mx-auto mt-10">
      {/* Left Side Large Photo */}
      <div className="w-full lg:w-1/2">
        <img
          src="https://images.unsplash.com/photo-1720499035742-9d2398ac5eac?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Category Banner"
          className="w-full h-[calc(2*15rem+7rem)] object-cover hidden lg:block opacity-80"
        />
      </div>

      {/* Right Side Categories and Products */}
      <div className="w-full lg:w-1/2">
        {categories.map((category) => (
          <div key={category.id} className="mb-10">
            {/* Category Header */}
            <div className="text-center px-10 mb-4">
              <h2 className="text-lg font-bold text-gray-800 mb-4 uppercase">
                {category.name}
              </h2>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-2 gap-4">
              {category.products.map((product) => (
                <div
                  key={product.id}
                  className="relative flex flex-col items-center"
                >
                  {/* Product Image */}
                  <div className="relative w-48 h-60 overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover opacity-80 hover:opacity-90"
                    />
                    <button className="absolute top-2 right-2 text-gray-400 hover:text-red-500">
                      <HeartIcon className="h-6 w-6" />
                    </button>
                  </div>

                  {/* Product Details */}
                  <div className="mt-2 text-center">
                    <h3 className="text-sm font-bold text-gray-700">
                      {product.name}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">{product.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductCategoryGourmet;
