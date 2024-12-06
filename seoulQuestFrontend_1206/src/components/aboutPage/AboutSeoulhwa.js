import React from "react";

const AboutSeoulhwa = () => {
  window.scrollTo(0, 0);
  return (
    <div className="flex flex-col h-auto w-full overflow-hidden box-border mt-12">
      {/* Top Section: Introduction */}
      <div className="relative flex flex-col h-[70vh] w-full overflow-hidden">
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
          <span className="text-3xl lg:text-4xl text-yellow-600 font-bold">
            Seoulhwa
          </span>
          <h1 className="text-4xl lg:text-6xl leading-tight">
            Where Seoul’s Stories Begin <br />
            <span className="font-serif italic">Crafting Your Journey</span>
          </h1>

          {/* Subtitle */}
          <p
            className="mt-8 text-sm lg:text-base font-light text-gray-700 leading-relaxed w-[105%] uppercase"
            style={{ backgroundColor: "#E0DCD0", padding: "10px" }}
          >
            At Seoulhwa, we don’t just showcase Seoul—we narrate its story. Through
            thoughtfully designed experiences and carefully curated souvenirs, we
            invite you to discover Korea’s vibrant traditions and modern allure.
          </p>
        </div>

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black opacity-30"></div>
      </div>

      {/* Content Section */}
      <div className="relative p-10 text-center">
        <h2 className="text-4xl font-extrabold text-gray-800 mb-8">
          Why "Seoulhwa"?
        </h2>
        <p className="text-lg text-gray-700 leading-relaxed mx-auto max-w-5xl mb-14">
          The name <span className="font-semibold text-yellow-600">Seoulhwa</span>{" "}
          combines <strong>“Seoul”</strong>, Korea’s dynamic capital, with the
          Korean word <strong>“hwa” (화)</strong>, meaning “story” or “tale.”
          <br />
          Every part of Seoul has a story waiting to be discovered—from its
          majestic palaces to its neon-lit streets. Seoulhwa is dedicated to
          bringing these stories to life through tours that immerse you in
          history, culture, and innovation. With every handcrafted souvenir, we
          help you carry a piece of these stories home.
        </p>

        <h2 className="text-3xl font-bold text-gray-800 mb-8">Our Mission</h2>
        <p className="text-gray-700 leading-relaxed mx-auto max-w-4xl mb-14">
          At Seoulhwa, we aim to create a bridge between Seoul’s vibrant present
          and its rich past. By combining modern design with deep cultural roots,
          we provide an unforgettable experience that celebrates the city’s
          duality: <strong>tradition and innovation</strong>.
        </p>

        {/* Explanation Sections */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
          <div>
            <h3 className="text-xl font-semibold text-gray-700 mb-3">
              Immersive Tours
            </h3>
            <p className="text-sm text-gray-600">
              Explore Seoul beyond its surface. From serene hanok villages to the
              electric nightlife, our tours highlight every side of this vibrant
              city.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-700 mb-3">
              Handcrafted Souvenirs
            </h3>
            <p className="text-sm text-gray-600">
              Each souvenir tells a unique story of Seoul. Designed by local
              artisans, they blend tradition and modernity.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-700 mb-3">
              Cultural Immersion
            </h3>
            <p className="text-sm text-gray-600">
              Be a part of Seoul’s story. From food to art, we bring you closer to
              the heart of Korea’s culture.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-700 mb-3">
              Timeless Memories
            </h3>
            <p className="text-sm text-gray-600">
              Create stories of your own. With Seoulhwa, your journey becomes a
              part of Seoul’s narrative.
            </p>
          </div>
        </div>

        {/* Photo Grid Section */}
        <div className="photo-grid grid grid-cols-2 md:grid-cols-4 gap-4 mt-10">
          <div className="w-full h-40 overflow-hidden">
            <img
              src="https://cdn.pixabay.com/photo/2018/03/16/02/55/tunnel-3230087_1280.jpg"
              alt="Innovative Tours"
              className="w-full h-full object-cover opacity-90"
            />
          </div>
          <div className="w-full h-40 overflow-hidden">
            <img
              src="https://cdn.pixabay.com/photo/2017/03/27/14/33/ancient-2179091_1280.jpg"
              alt="Handcrafted Souvenirs"
              className="w-full h-full object-cover opacity-90"
            />
          </div>
          <div className="w-full h-40 overflow-hidden">
            <img
              src="https://cdn.pixabay.com/photo/2018/12/31/14/45/bukchon-3905234_1280.jpg"
              alt="Cultural Immersion"
              className="w-full h-full object-cover opacity-90"
            />
          </div>
          <div className="w-full h-40 overflow-hidden">
            <img
              src="https://cdn.pixabay.com/photo/2019/11/22/01/28/seoul-4643867_1280.jpg"
              alt="Timeless Memories"
              className="w-full h-full object-cover opacity-90"
            />
          </div>
        </div>

        {/* Final Section */}
        <div className="mt-10 text-center ">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 p-8">
            Join the Seoulhwa Story
          </h2>
          <p className="text-gray-700 mx-auto max-w-3xl mb-6">
            Seoulhwa is more than just a travel platform; it's an invitation to
            experience Seoul’s tales. Be it through our immersive tours or
            exquisite souvenirs, we ensure that every moment resonates with the
            spirit of Korea.
          </p>
          <p className="text-gray-700 mx-auto max-w-3xl mb-6">
            Whether you’re walking through ancient palaces, tasting street food,
            or shopping for unique crafts, every moment with us becomes a
            treasured memory.
          </p>
          <p className="text-lg font-semibold text-yellow-600">
            Be part of the Seoulhwa legacy. Discover, connect, and celebrate the
            story of Seoul.
          </p>
          <div className="flex justify-center mt-6">
    <img
      src={require("../../images/Seoulhwa.png")}
      alt="Logo"
      className="h-10 w-auto"
    />
  </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSeoulhwa;
