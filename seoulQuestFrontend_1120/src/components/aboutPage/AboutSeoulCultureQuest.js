import React from "react";

const AboutSeoulCultureQuest = () => {
  return (
    <div className="flex flex-col h-auto w-full overflow-hidden box-border mt-12">
      {/* Top Section: Introduction */}
      <div
        className="relative flex flex-col items-center justify-center h-[60vh] w-full bg-cover bg-center group overflow-hidden"
        style={{
          backgroundImage:
            "url('https://cdn.pixabay.com/photo/2020/04/02/14/25/bukchon-5001573_960_720.jpg')",
        }}
      >
        {/* Background overlay */}
        <div className="absolute inset-0 bg-black opacity-30"></div>

        {/* Content Section */}
        <div className="relative z-10 text-center px-6 text-white max-w-4xl">
          {/* Main Title */}
          <h1 className="text-4xl lg:text-6xl font-serif font-bold leading-tight">
            Where tradition and modernity <br />
            <span className="italic">harmoniously meet</span>
          </h1>

          {/* Subtitle */}
          <p className="mt-8 text-lg lg:text-xl font-light leading-relaxed">
            At SeoulCultureQuest, we connect you to the soulful heart of Korea. Explore
            enchanting tours and curated souvenirs that bring timeless traditions and
            vibrant modernity to life.
          </p>
        </div>
      </div>

      {/* About Us Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12 px-8 lg:px-16">
        <div className="bg-gray-100 p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            About Us
          </h2>
          <p className="text-gray-700 leading-relaxed">
            At <span className="font-semibold text-gray-900">SeoulCultureQuest</span>, 
            we aim to bring the essence of Seoul to life. From curated tours that let you walk 
            in the footsteps of kings to unique souvenirs that carry the soul of Korea, 
            every detail is crafted to immerse you in the heart of Korean culture.
          </p>
        </div>
        <div
          className="relative bg-cover bg-center rounded-lg shadow-md"
          style={{
            backgroundImage:
              "url('https://cdn.pixabay.com/photo/2016/08/19/04/59/the-bulguksa-temple-1604556_1280.jpg')",
          }}
        >
          <div className="absolute inset-0 bg-black opacity-20 rounded-lg"></div>
        </div>
      </div>

      {/* Highlights Section */}
      <div className="mt-16 px-8 lg:px-16">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          What We Offer
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div
            className="relative flex items-center justify-center bg-cover bg-center group overflow-hidden h-[200px] rounded-lg shadow-md"
            style={{
              backgroundImage: "url('https://cdn.pixabay.com/photo/2020/03/09/16/02/silk-4916174_1280.jpg')",
            }}
          >
            <div className="absolute inset-0 bg-black opacity-30 rounded-lg" />
            <div className="relative z-10 text-white text-center">
              <h3 className="text-lg font-semibold">Crafted Elegance</h3>
              <p className="text-xs">Handmade Souvenirs</p>
            </div>
          </div>
          <div
            className="relative flex items-center justify-center bg-cover bg-center group overflow-hidden h-[200px] rounded-lg shadow-md"
            style={{
              backgroundImage: "url('https://cdn.pixabay.com/photo/2021/03/08/06/23/green-tea-6078275_1280.jpg')",
            }}
          >
            <div className="absolute inset-0 bg-black opacity-30 rounded-lg" />
            <div className="relative z-10 text-white text-center">
              <h3 className="text-lg font-semibold">Herbal Infusions</h3>
              <p className="text-xs">Relax & Rejuvenate</p>
            </div>
          </div>
          <div
            className="relative flex items-center justify-center bg-cover bg-center group overflow-hidden h-[200px] rounded-lg shadow-md"
            style={{
              backgroundImage: "url('https://cdn.pixabay.com/photo/2019/07/25/01/35/kimchi-4361465_1280.jpg')",
            }}
          >
            <div className="absolute inset-0 bg-black opacity-30 rounded-lg" />
            <div className="relative z-10 text-white text-center">
              <h3 className="text-lg font-semibold">Authentic Flavors</h3>
              <p className="text-xs">Taste Seoul</p>
            </div>
          </div>
          <div
            className="relative flex items-center justify-center bg-cover bg-center group overflow-hidden h-[200px] rounded-lg shadow-md"
            style={{
              backgroundImage: "url('https://cdn.pixabay.com/photo/2020/08/09/15/58/cosmetics-5475897_1280.jpg')",
            }}
          >
            <div className="absolute inset-0 bg-black opacity-30 rounded-lg" />
            <div className="relative z-10 text-white text-center">
              <h3 className="text-lg font-semibold">Beauty & Skincare</h3>
              <p className="text-xs">Glow with Seoul</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tour Categories Section */}
      <div className="mt-16 px-8 lg:px-16">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Explore Our Tours
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-100 p-8 rounded-lg shadow-md">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Traditional Cultural Tours
            </h3>
            <p className="text-gray-700">
              Walk through history as you explore palaces, hanbok experiences, and centuries-old traditions.
            </p>
          </div>
          <div className="bg-gray-100 p-8 rounded-lg shadow-md">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Modern Cultural Tours
            </h3>
            <p className="text-gray-700">
              Discover Seoul's vibrant neighborhoods, bustling nightlife, and contemporary landmarks.
            </p>
          </div>
          <div className="bg-gray-100 p-8 rounded-lg shadow-md">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Hidden Gems Tours
            </h3>
            <p className="text-gray-700">
              Uncover Seoul's secret spots, serene temples, and local markets for a unique experience.
            </p>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center mt-16 mb-12">
        <a
          href="/tours"
          className="px-6 py-3 bg-black text-white font-semibold rounded-lg text-sm hover:bg-gray-800"
        >
          Go Explore Our Tours
        </a>
      </div>
    </div>
  );
};

export default AboutSeoulCultureQuest;
