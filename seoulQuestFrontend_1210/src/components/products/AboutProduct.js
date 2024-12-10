import React from "react";

const AboutProduct = () => {
  return (
    <div className="w-full max-w-5xl mx-auto space-y-10 py-10 px-4">
      {/* Title */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-800 tracking-wide uppercase mb-6">
          About Our Product
        </h1>
      </div>

      {/* Introductory Section */}
      <div className="intro-section text-center">
        <p className="text-sm text-gray-600 leading-relaxed">
          Discover the magic of Korea through our exclusive collection of
          products, where timeless tradition meets contemporary elegance. Each
          item is a tribute to Seoul's vibrant culture, handcrafted by skilled
          artisans who pour their hearts into every detail. From the bustling
          workshops of master potters to the kitchens of culinary artists, our
          products carry the soul of Korea, offering you a piece of its rich
          heritage and modern creativity.
        </p>
      </div>

      {/* Explanation Sections */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
        <div>
          <h3 className="text-lg font-semibold text-gray-700 mb-2">
            Local Factories
          </h3>
          <p className="text-sm text-gray-600">
            Step into Seoul's cutting-edge factories, where passion meets
            precision. Modern techniques bring innovative ideas to life,
            creating products that are as practical as they are beautiful.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-700 mb-2">
            Artisan Pottery
          </h3>
          <p className="text-sm text-gray-600">
            Experience the timeless beauty of Korean pottery, meticulously
            crafted by skilled hands. Each piece tells a story of heritage,
            patience, and unmatched artistry.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-700 mb-2">
            Sewing Excellence
          </h3>
          <p className="text-sm text-gray-600">
            Marvel at the delicate handiwork of seamstresses who weave tradition
            into every stitch, blending cultural patterns with a touch of
            modern chic.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-700 mb-2">
            Traditional Food
          </h3>
          <p className="text-sm text-gray-600">
            Indulge in authentic Korean flavors, crafted by local chefs using
            recipes passed down through generations. Every bite captures the
            essence of Seoul's culinary heritage.
          </p>
        </div>
      </div>

      {/* Photo Grid Section */}
      <div className="photo-grid grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="w-full h-40 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1642979904576-408d8e8ea8c9?q=80&w=928&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Local Factories"
            className="w-full h-full object-cover opacity-80"
          />
        </div>
        <div className="w-full h-40 bg-gray-200 overflow-hidden">
          <img
            src="https://plus.unsplash.com/premium_photo-1664299751486-52e135d92101?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Artisan Pottery"
            className="w-full h-full object-cover opacity-80"
          />
        </div>
        <div className="w-full h-40 bg-gray-200 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1601135183537-10c09f98902a?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Sewing Excellence"
            className="w-full h-full object-cover opacity-80"
          />
        </div>
        <div className="w-full h-40 bg-gray-200 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1680786226280-3e00ce14f295?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Traditional Food"
            className="w-full h-full object-cover opacity-80"
          />
        </div>
      </div>
    </div>
  );
};

export default AboutProduct;
