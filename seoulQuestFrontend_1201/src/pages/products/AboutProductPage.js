import React from "react";
import "../../Product.css"; // Import the CSS file for styling

const AboutProductPage = () => {
  return (
    <div className="about-product-page flex flex-col items-center text-center py-20 px-8 bg-gray-50">
      {/* Title Section */}
      <h1 className="about-title text-4xl font-bold tracking-widest text-gray-800">
        Seoul <span className="text-yellow-600 italic">Special Edition</span>
      </h1>
      <p className="about-subtitle mt-6 max-w-2xl text-gray-600 text-lg leading-relaxed">
        Our collection is more than just souvenirs. It’s a celebration of
        <span className="italic"> Korea's enduring traditions</span>, blended seamlessly with 
        <span className="italic"> modern innovations</span>. Each piece is crafted with meticulous care, reflecting 
        our dedication to quality and craftsmanship.
      </p>

      {/* Section Title */}
      <h2 className="best-product-title text-2xl font-semibold uppercase tracking-wide text-gray-800 mt-16">
        Honoring Craftsmanship
      </h2>

      {/* Highlight Section */}
      <div className="about-highlights grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10 mt-8 max-w-5xl">
        {/* Left Highlight */}
        <div className="flex flex-col items-center text-left space-y-4">
          <h3 className="text-xl font-semibold text-gray-700">
            Time-Honored Traditions
          </h3>
          <p className="text-gray-600 leading-relaxed">
            Rooted in centuries of Korean culture, our products honor the rich
            traditions of artisanship passed down through generations. Every
            detail reflects the soul of Korea, preserving heritage in every
            design.
          </p>
        </div>

        {/* Right Highlight */}
        <div className="flex flex-col items-center text-left space-y-4">
          <h3 className="text-xl font-semibold text-gray-700">
            The Future of Craftsmanship
          </h3>
          <p className="text-gray-600 leading-relaxed">
            Using cutting-edge technology, we enhance traditional techniques to
            create products that are not only beautiful but also durable and
            practical. Our designs bridge the past and the present, making them
            timeless.
          </p>
        </div>
      </div>

      {/* Photography Grid */}
      <div className="about-grid grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-6 mt-12 max-w-6xl">
        <div className="grid-item group relative overflow-hidden rounded-lg shadow-md">
          <img
            src="https://cdn.pixabay.com/photo/2020/03/09/16/02/silk-4916174_1280.jpg"
            alt="Seoul Fashion"
            className="w-full h-full object-cover opacity-90 transition-opacity duration-300 group-hover:opacity-100"
          />
          <div className="absolute inset-0 bg-black opacity-30 transition-opacity duration-300 group-hover:opacity-50"></div>
          <div className="absolute inset-0 flex items-center justify-center z-10 text-white text-center">
            <div>
              <h3 className="text-lg font-bold">Crafted with Passion</h3>
              <p className="text-sm mt-2">
                Every thread tells a story of dedication and artistry.
              </p>
            </div>
          </div>
        </div>

        <div className="grid-item group relative overflow-hidden rounded-lg shadow-md">
          <img
            src="https://cdn.pixabay.com/photo/2021/03/08/06/23/green-tea-6078275_1280.jpg"
            alt="Seoul Teas"
            className="w-full h-full object-cover opacity-90 transition-opacity duration-300 group-hover:opacity-100"
          />
          <div className="absolute inset-0 bg-black opacity-30 transition-opacity duration-300 group-hover:opacity-50"></div>
          <div className="absolute inset-0 flex items-center justify-center z-10 text-white text-center">
            <div>
              <h3 className="text-lg font-bold">Exclusive Flavors</h3>
              <p className="text-sm mt-2">
                Savor the essence of Seoul in every sip.
              </p>
            </div>
          </div>
        </div>

        <div className="grid-item group relative overflow-hidden rounded-lg shadow-md">
          <img
            src="https://cdn.pixabay.com/photo/2019/07/25/01/35/kimchi-4361465_1280.jpg"
            alt="Korean Delicacies"
            className="w-full h-full object-cover opacity-90 transition-opacity duration-300 group-hover:opacity-100"
          />
          <div className="absolute inset-0 bg-black opacity-30 transition-opacity duration-300 group-hover:opacity-50"></div>
          <div className="absolute inset-0 flex items-center justify-center z-10 text-white text-center">
            <div>
              <h3 className="text-lg font-bold">Authentic Delicacies</h3>
              <p className="text-sm mt-2">
                Indulge in flavors crafted with care and precision.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="about-cta mt-16">
        <p className="text-lg text-gray-700 mb-6">
          Experience the perfect fusion of tradition and innovation with Seoul
          Special Edition.
        </p>
        <a
          href="/products"
          className="cta-button inline-block bg-yellow-500 text-white px-8 py-3 rounded-lg font-semibold uppercase text-sm tracking-wide hover:bg-yellow-600 transition-colors duration-300"
        >
          Explore the Collection
        </a>
      </div>
    </div>
  );
};

export default AboutProductPage;
