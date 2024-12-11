import React from "react";

const AboutSeoulCultureQuest = () => {
  window.scrollTo(0, 0);
  return (
    <div className="flex flex-col h-auto w-full overflow-hidden box-border mt-12">
      {/* Top Section: Introduction */}
      <div className="relative flex flex-col h-[60vh] w-full overflow-hidden">
        {/* Top Half */}
        <div
          className="relative w-full h-1/2 bg-cover bg-[center_top] opacity-80"
          style={{
            backgroundImage:
              "url('https://cdn.pixabay.com/photo/2022/04/04/13/54/city-7111380_1280.jpg')",
          }}
        ></div>

        {/* Bottom Half */}
        <div
          className="relative w-full h-1/2 bg-cover bg-[center_bottom] opacity-80"
          style={{
            backgroundImage:
              "url('https://cdn.pixabay.com/photo/2021/12/08/05/13/gyeongbok-palace-6854763_1280.jpg')",
          }}
        ></div>

        {/* Overlay Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 text-white z-10">
          {/* Main Title */}
          <span className="text-2xl lg:text-3xl text-yellow-400 font-bold">
            SeoulCultureQuest
          </span>
          <h1 className="text-4xl lg:text-6xl leading-tight">
            Discover the Soul of Seoul <br />
            <span className="font-serif italic">One Journey at a Time</span>
          </h1>

          {/* Subtitle */}
          <p
            className="mt-8 text-xs lg:text-sm font-light text-gray-700 leading-relaxed w-[116%] uppercase"
            style={{ backgroundColor: "#E0DCD0" }}
          >
            We are your gateway to the wonders of Korea. Explore our exclusive
            tours and handcrafted souvenirs that celebrate the beauty of Seoul’s
            rich culture, history, and modern flair.
          </p>
        </div>

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black opacity-20"></div>
      </div>

      <div className="relative p-10 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">Who We Are</h2>
        <p className="text-gray-700 leading-relaxed mx-auto max-w-4xl mb-14">
          At{" "}
          <span className="font-semibold text-yellow-600">
            SeoulCultureQuest
          </span>
          , we believe that every journey should be unforgettable. Our mission
          is to bring you closer to the heart of Seoul through{" "}
          <span className="font-bold text-gray-800">immersive experiences</span>{" "}
          and <span className="italic text-gray-800">unique creations</span>.
          From the historic charm of palaces to the bustling streets of
          Gangnam, we connect you with the essence of Korea, one story at a
          time.
        </p>

        {/* Explanation Sections */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              Innovative Tours
            </h3>
            <p className="text-sm text-gray-600">
              Step beyond the ordinary with our expertly curated tours.
              Explore hidden gems, local favorites, and iconic landmarks that
              bring the spirit of Seoul to life.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              Handcrafted Souvenirs
            </h3>
            <p className="text-sm text-gray-600">
              Take a piece of Seoul home with you. Our souvenirs are crafted
              with care by local artisans, blending tradition and modern
              design.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              Cultural Immersion
            </h3>
            <p className="text-sm text-gray-600">
              Immerse yourself in authentic Korean culture. From culinary
              experiences to traditional crafts, every moment is an adventure.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              Unforgettable Memories
            </h3>
            <p className="text-sm text-gray-600">
              Let us help you create lasting memories in Seoul. Every tour and
              product is designed to make your journey extraordinary.
            </p>
          </div>
        </div>

        {/* Photo Grid Section */}
        <div className="photo-grid grid grid-cols-2 md:grid-cols-4 gap-4 mt-5">
          <div className="w-full h-40 overflow-hidden">
            <img
              src="https://cdn.pixabay.com/photo/2018/03/16/02/55/tunnel-3230087_1280.jpg"
              alt="Innovative Tours"
              className="w-full h-full object-cover opacity-80"
            />
          </div>
          <div className="w-full h-40 bg-gray-200 overflow-hidden">
            <img
              src="https://cdn.pixabay.com/photo/2017/03/27/14/33/ancient-2179091_1280.jpg"
              alt="Handcrafted Souvenirs"
              className="w-full h-full object-cover opacity-80"
            />
          </div>
          <div className="w-full h-40 bg-gray-200 overflow-hidden">
            <img
              src="https://cdn.pixabay.com/photo/2018/12/31/14/45/bukchon-3905234_1280.jpg"
              alt="Cultural Immersion"
              className="w-full h-full object-cover opacity-80"
            />
          </div>
          <div className="w-full h-40 bg-gray-200 overflow-hidden">
            <img
              src="https://cdn.pixabay.com/photo/2019/11/22/01/28/seoul-4643867_1280.jpg"
              alt="Unforgettable Memories"
              className="w-full h-full object-cover opacity-80"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSeoulCultureQuest;
