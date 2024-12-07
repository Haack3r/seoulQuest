// import { Bold } from "lucide-react";
// import React from "react";

// const MostPopularTour = () => {
//   // Dummy data
//   const tours = [
//     {
//       id: 1,
//       name: "Seoul City Tour",
//       price: "₩50,000",
//       image:
//         "https://cdn.pixabay.com/photo/2019/11/22/01/34/korea-4643876_1280.jpg",
//     },
//     {
//       id: 2,
//       name: "Gyeongbokgung Palace Experience",
//       price: "₩70,000",
//       image:
//         "https://cdn.pixabay.com/photo/2019/02/07/06/06/korea-3980539_1280.jpg",
//     },
//     {
//       id: 3,
//       name: "Traditional Hanok Stay",
//       price: "₩120,000",
//       image:
//         "https://cdn.pixabay.com/photo/2020/07/08/09/05/hydrangea-5383216_1280.jpg",
//     },
//   ];

//   return (
//     <div className="mt-12 max-w-5xl mx-auto flex flex-col items-center">
//       {/* Most Popular Tours */}
//       <h2 className="text-gray-700 text-2xl font-bold text-center mb-8 tracking-wide uppercase">
//         Most Popular Tours
//       </h2>
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//         {tours.map((tour) => (
//           <div
//             key={tour.id}
//             className="flex flex-col items-center text-center space-y-4"
//             >
//             {/* Tour Image */}
//             <img
//               src={tour.image}
//               alt={tour.name}
//               className="w-full max-w-xs h-56 object-cover opacity-80 hover:opacity-90"
//             />
//             {/* Tour Details */}
//             <div>
//               <h3 className="text-md font-bold text-gray-600">{tour.name}</h3>
//               <p className="text-sm text-gray-500 mt-1">{tour.price}</p>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default MostPopularTour;
