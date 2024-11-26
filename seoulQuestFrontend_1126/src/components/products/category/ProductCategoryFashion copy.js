import React from "react";
import { HeartIcon } from "lucide-react";

const ProductCategoryFashion = () => {
  const categories = [
    {
      id: 1,
      name: "K-Fashion",
      image: "https://cdn.pixabay.com/photo/2017/01/03/02/16/fan-1941129_1280.jpg",
      products: [
        {
          id: 1,
          name: "Trendy Oversized Hoodie",
          price: "₩80,000",
          image:
            "https://plus.unsplash.com/premium_photo-1675186049409-f9f8f60ebb5e?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
        {
          id: 2,
          name: "Chic Pleated Skirt",
          price: "₩70,000",
          image:
            "https://plus.unsplash.com/premium_photo-1675186049419-d48f4b28fe7c?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
        {
          id: 3,
          name: "Minimalist Tote Bag",
          price: "₩50,000",
          image:
            "https://plus.unsplash.com/premium_photo-1675186049297-035b3f692c04?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
        {
          id: 4,
          name: "Classic Denim Jacket",
          price: "₩90,000",
          image:
            "https://plus.unsplash.com/premium_photo-1675186049563-000f7ac02c44?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
      ],
    },
  ];

  return (
    <div className="flex flex-wrap lg:flex-nowrap gap-8 max-w-6xl mx-auto mt-10">
      {/* Left Side Large Photo */}
      <div className="w-full lg:w-1/2">
        <img
          src="https://plus.unsplash.com/premium_photo-1675186049222-0b5018db6ce9?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Category Banner"
          className="w-full h-[calc(2*15rem+7rem)] object-cover hidden lg:block"
        />
      </div>

      {/* Right Side Categories and Products */}
      <div className="w-full lg:w-1/2">
        {categories.map((category) => (
          <div key={category.id} className="mb-10">
            {/* Category Header */}
            <div className="text-center px-10 mb-4">
              <h2 className="text-lg font-bold text-gray-800 uppercase">
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

export default ProductCategoryFashion;
