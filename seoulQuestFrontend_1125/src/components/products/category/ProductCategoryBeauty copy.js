// import React from "react";
// import { HeartIcon } from "lucide-react";

// const ProductCategoryBeauty = () => {
//   const categories = [
//     {
//       id: 1,
//       name: "K-Beauty Essentials",
//       image: "https://cdn.pixabay.com/photo/2017/01/03/02/16/fan-1941129_1280.jpg",
//       products: [
//         {
//           id: 1,
//           name: "Hydrating Sheet Mask Set",
//           price: "₩25,000",
//           image:
//             "https://cdn.pixabay.com/photo/2019/12/29/08/39/women-4726516_1280.jpg",
//         },
//         {
//           id: 2,
//           name: "Rejuvenating Face Serum",
//           price: "₩60,000",
//           image:
//             "https://cdn.pixabay.com/photo/2016/08/24/17/10/bath-balls-1617472_1280.jpg",
//         },
//         {
//           id: 3,
//           name: "Radiance BB Cream",
//           price: "₩45,000",
//           image:
//             "https://cdn.pixabay.com/photo/2016/10/28/17/02/powder-in-the-balls-1778619_1280.jpg",
//         },
//         {
//           id: 4,
//           name: "Luxury Lip Care Kit",
//           price: "₩30,000",
//           image:
//             "https://cdn.pixabay.com/photo/2021/12/26/09/31/cosmetic-6894716_1280.jpg",
//         },
//       ],
//     },
//   ];

//   return (
//     <div className="flex flex-wrap lg:flex-nowrap gap-8 max-w-6xl mx-auto mt-10">
//       {/* Left Side Large Photo */}
//       <div className="w-full lg:w-1/2">
//         <img
//           src="https://images.unsplash.com/photo-1526231237819-de846f3a7e16?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
//           alt="Category Banner"
//           className="w-full h-[calc(2*15rem+7rem)] object-cover hidden lg:block"
//         />
//       </div>

//       {/* Right Side Categories and Products */}
//       <div className="w-full lg:w-1/2">
//         {categories.map((category) => (
//           <div key={category.id} className="mb-10 relative">
//             {/* Category Header */}
//             <div className="px-10 mb-4 text-center">
//               <h2 className="text-lg font-bold text-gray-800 uppercase">
//                 {category.name}
//               </h2>
//             </div>

//             {/* Products Grid */}
//             <div className="grid grid-cols-2 gap-4">
//               {category.products.map((product) => (
//                 <div
//                   key={product.id}
//                   className="relative flex flex-col items-center"
//                 >
//                   {/* Product Image */}
//                   <div className="relative w-48 h-60 overflow-hidden">
//                     <img
//                       src={product.image}
//                       alt={product.name}
//                       className="w-full h-full object-cover opacity-80 hover:opacity-90"
//                     />
//                     <button className="absolute top-2 right-2 text-gray-400 hover:text-red-500">
//                       <HeartIcon className="h-6 w-6" />
//                     </button>
//                   </div>

//                   {/* Product Details */}
//                   <div className="mt-2 text-center">
//                     <h3 className="text-sm font-bold text-gray-700">
//                       {product.name}
//                     </h3>
//                     <p className="text-sm text-gray-500 mt-1">{product.price}</p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ProductCategoryBeauty;
