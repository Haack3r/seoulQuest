// import React from "react";
// import { HeartIcon } from "lucide-react";

// const MostPopularProduct = () => {
//   // Dummy data for products
//   const products = [
//     {
//       id: 1,
//       name: "Traditional Korean Fan",
//       price: "₩20,000",
//       category: "Handmade",
//       image:
//         "https://cdn.pixabay.com/photo/2013/07/23/23/25/hand-166503_1280.jpg",
//     },
//     {
//       id: 2,
//       name: "Korean Tea Set",
//       price: "₩50,000",
//       category: "Ceramics",
//       image:
//         "https://cdn.pixabay.com/photo/2021/08/23/18/37/tea-6568547_1280.jpg",
//     },
//     {
//       id: 3,
//       name: "Hanbok",
//       price: "₩35,000",
//       category: "Souvenirs",
//       image:
//         "https://cdn.pixabay.com/photo/2019/11/29/03/52/hanbok-4660511_1280.jpg",
//     },
//   ];

//   return (
//     <div className="mt-12 max-w-5xl mx-auto flex flex-col items-center">
//       {/* Most Popular Products Header */}
//       <h2 className="text-gray-700 text-2xl font-bold text-center mb-8 tracking-wide uppercase">
//         Most Popular Products
//       </h2>

//       {/* Products Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-8">
//         {products.map((product) => (
//           <div
//             key={product.id}
//             className="flex flex-col items-center"
//           >
//             {/* Product Image */}
//             <div className="relative w-56 h-80 overflow-hidden">
//               <p className="py-1 text-gray-700 text-xs text-left">
//                 {product.category}
//               </p>
//               <img
//                 src={product.image}
//                 alt={product.name}
//                 className="w-full h-full object-cover opacity-80 hover:opacity-90"
//               />
//               <button
//                 className="absolute top-8 right-2 text-gray-400 hover:text-red-500"
//               >
//                 <HeartIcon className="h-6 w-6" />
//               </button>
//             </div>

//             {/* Product Details */}
//             <div className="w-56 text-left mt-2">
//               <span className="block text-sm font-bold text-gray-700">
//                 {product.name}
//               </span>
//               <span className="block text-sm text-gray-500">
//                 {product.price}
//               </span>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default MostPopularProduct;
