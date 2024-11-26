import React from "react";
import { HeartIcon } from "lucide-react";

const ProductCategoryTea = () => {
  // Updated data for the "Exotic Tea" category
  const categories = [
    {
      id: 2,
      name: "Exotic Tea Collection",
      image:
        "https://cdn.pixabay.com/photo/2017/01/06/19/15/tea-1950004_1280.jpg",
      products: [
        {
          id: 1,
          name: "Ceremonial Matcha Set",
          price: "₩45,000",
          image:
            "https://cdn.pixabay.com/photo/2023/02/22/19/13/tea-ceremony-7807230_1280.jpg",
        },
        {
          id: 2,
          name: "Handcrafted Teacup",
          price: "₩25,000",
          image:
            "https://cdn.pixabay.com/photo/2015/07/02/20/37/cup-829527_1280.jpg",
        },
        {
          id: 3,
          name: "Traditional Korean Teapot",
          price: "₩60,000",
          image:
            "https://cdn.pixabay.com/photo/2021/03/25/17/42/teapot-6123746_1280.jpg",
        },
        {
          id: 4,
          name: "Premium Green Tea Leaves",
          price: "₩40,000",
          image:
            "https://cdn.pixabay.com/photo/2023/02/22/19/13/gruner-tee-7807229_1280.jpg",
        },
      ],
    },
  ];

  return (
    <div className="flex flex-wrap lg:flex-nowrap gap-8 max-w-6xl mx-auto">
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
                    <p className="text-sm text-gray-500 mt-1">
                      {product.price}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      {/* Left Side Large Photo */}
      <div className="w-full lg:w-1/2">
        <img
          src="https://cdn.pixabay.com/photo/2019/12/21/03/17/tea-set-4709642_1280.jpg"
          alt="Category Banner"
          className="w-full h-[calc(2*15rem+7rem)] object-cover hidden lg:block opacity-80" // Adjusted height for two rows
        />
      </div>
    </div>
  );
};

export default ProductCategoryTea;
