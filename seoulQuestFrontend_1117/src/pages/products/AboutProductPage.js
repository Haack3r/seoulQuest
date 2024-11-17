import React from "react";
import "../../Product.css"; // Import the CSS file for styling

const AboutProductPage = () => {
  return (
    <div className="about-product-page flex flex-col items-center text-center py-20 px-8">
      <h1 className="about-title text-4xl font-semibold uppercase tracking-wider text-gray-700">
        Seoul Special Edition
      </h1>
      <p className="about-subtitle text-lg text-gray-500 mt-4 max-w-2xl">
        Discover a curated collection of souvenirs and gifts, crafted to capture
        the vibrant spirit of Seoul, Korea. Each piece in this limited edition
        series is designed to bring you closer to the culture, beauty, and
        uniqueness of Seoul.
      </p>

      {/* Section Title for Best Product */}
      <h2 className="best-product-title text-2xl font-semibold uppercase tracking-wide text-gray-700 mt-10">
        Our Best Product
      </h2>

      {/* Photography Grid */}
      <div className="about-grid grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-4 mt-6 max-w-5xl">
        <div className="grid-item group relative overflow-hidden rounded-lg shadow-lg">
          <img
            src="https://cdn.pixabay.com/photo/2020/03/09/16/02/silk-4916174_1280.jpg"
            alt="Seoul Fashion"
            className="w-full h-full object-cover opacity-90 transition-opacity duration-300 group-hover:opacity-100"
          />
          <div className="absolute inset-0 bg-black opacity-30 transition-opacity duration-300 group-hover:opacity-50"></div>
          <div className="absolute inset-0 flex items-center justify-center z-10 text-white text-center">
            <div>
              <h3 className="text-md font-semibold">Crafted with Passion</h3>
              <p className="text-xs mt-1">
                Artisans' dedication in every piece.
              </p>
            </div>
          </div>
        </div>

        <div className="grid-item group relative overflow-hidden rounded-lg shadow-lg">
          <img
            src="https://cdn.pixabay.com/photo/2021/03/08/06/23/green-tea-6078275_1280.jpg"
            alt="Seoul Teas"
            className="w-full h-full object-cover opacity-90 transition-opacity duration-300 group-hover:opacity-100"
          />
          <div className="absolute inset-0 bg-black opacity-30 transition-opacity duration-300 group-hover:opacity-50"></div>
          <div className="absolute inset-0 flex items-center justify-center z-10 text-white text-center">
            <div>
              <h3 className="text-md font-semibold">Exclusive Flavors</h3>
              <p className="text-xs mt-1">Savor the essence of Seoul.</p>
            </div>
          </div>
        </div>

        <div className="grid-item group relative overflow-hidden rounded-lg shadow-lg">
          <img
            src="https://cdn.pixabay.com/photo/2019/07/25/01/35/kimchi-4361465_1280.jpg"
            alt="Korean Delicacies"
            className="w-full h-full object-cover opacity-90 transition-opacity duration-300 group-hover:opacity-100"
          />
          <div className="absolute inset-0 bg-black opacity-30 transition-opacity duration-300 group-hover:opacity-50"></div>
          <div className="absolute inset-0 flex items-center justify-center z-10 text-white text-center">
            <div>
              <h3 className="text-md font-semibold">Authentic Delicacies</h3>
              <p className="text-xs mt-1">A taste of Korean tradition.</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Button */}
      <div className="about-cta mt-12">
        <a
          href="/products"
          className="cta-button inline-block bg-orange-600 text-white px-8 py-3 rounded-md font-semibold uppercase text-sm tracking-wide hover:bg-rose-700 transition-colors duration-300"
        >
          Explore the Collection
        </a>
      </div>
    </div>
  );
};

export default AboutProductPage;
