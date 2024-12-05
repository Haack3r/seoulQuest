import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const AnimatedPhotoGrid = () => {
  // Array of image URLs
  const images = [
    "https://cdn.pixabay.com/photo/2019/11/22/01/34/korea-4643876_1280.jpg",
    "https://cdn.pixabay.com/photo/2017/01/17/10/08/seocho-1986374_1280.jpg",
    "https://cdn.pixabay.com/photo/2020/05/13/03/33/seouls-most-often-include-5165648_1280.jpg",
    "https://cdn.pixabay.com/photo/2020/07/28/14/28/seoul-5445228_1280.jpg",
    "https://cdn.pixabay.com/photo/2020/04/04/05/28/namsan-5000891_1280.jpg",
    "https://cdn.pixabay.com/photo/2018/08/16/02/41/gelato-3609496_1280.jpg",
    "https://cdn.pixabay.com/photo/2020/03/21/16/29/seoul-4954516_1280.jpg",
    "https://cdn.pixabay.com/photo/2018/04/08/23/19/wood-3302802_1280.jpg",
    "https://cdn.pixabay.com/photo/2018/11/09/11/00/seoul-3804293_1280.jpg",
    "https://cdn.pixabay.com/photo/2018/02/20/19/00/top-3168523_1280.jpg",
    "https://cdn.pixabay.com/photo/2020/02/04/13/47/looking-4818206_1280.jpg",
    "https://cdn.pixabay.com/photo/2019/08/10/07/55/republic-of-korea-4396349_1280.jpg",
  ];

  // Initial grid state with random images
  const [gridImages, setGridImages] = useState(
    Array.from(
      { length: 12 },
      () => images[Math.floor(Math.random() * images.length)]
    )
  );

  // Update each image independently at random intervals
  useEffect(() => {
    const intervals = gridImages.map(
      (_, index) =>
        setInterval(() => {
          setGridImages((prevImages) =>
            prevImages.map((img, idx) =>
              idx === index
                ? images[Math.floor(Math.random() * images.length)]
                : img
            )
          );
        }, Math.random() * 1000 + 500) // Each image updates between 500ms and 1500ms
    );

    return () => intervals.forEach((interval) => clearInterval(interval));
  }, [gridImages, images]);

  // Framer Motion animation variants
  const imageVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 },
  };

  return (
    <div
      className=" mt-16 relative flex items-center justify-center h-[50vh] w-full bg-cover bg-center group overflow-hidden"
      style={{
        backgroundImage:
          "url('https://cdn.pixabay.com/photo/2020/04/02/14/25/bukchon-5001573_960_720.jpg')",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-40" />

      {/* Text Section */}
      <div className="relative z-10 text-white text-center px-4">
        <h1 className="text-3xl lg:text-5xl font-bold uppercase tracking-widest">
          Welcome to SeoulCultureQuest
        </h1>
        <p className="text-sm lg:text-base mt-4 max-w-lg mx-auto">
          Your gateway to Seoul's most enchanting experiences and handpicked
          souvenirs. Discover a city where tradition and modernity meet, and
          create memories that last a lifetime.
        </p>
      </div>

      {/* Animated Grid Section */}
      <div className=" bg-white opacity-60 absolute inset-0 z-0 grid grid-cols-3 md:grid-cols-4 gap-28 p-0">
        {gridImages.map((image, index) => (
          <motion.div
            key={index}
            className="relative w-full h-full bg-gray-200 overflow-hidden rounded-none"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={imageVariants}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <img
              src={image}
              alt={`Grid ${index}`}
              className="w-full h-full object-cover"
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AnimatedPhotoGrid;
