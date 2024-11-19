import React from "react";
import BannerAnim, { Element } from "rc-banner-anim";
import TweenOne from "rc-tween-one";

const BgElement = Element.BgElement;

const ProductImage = () => {
  return (
    <div className="flex flex-col h-screen w-full overflow-hidden box-border mt-12 -mb-4">
      {/* Top section: Full width, half height */}
      <div className="relative flex items-center justify-center h-[35vh] w-full bg-cover bg-center group overflow-hidden">
        <video
          className="absolute inset-0 w-full h-full object-cover opacity-80"
          src="https://videos.pexels.com/video-files/7576287/7576287-uhd_1440_2560_30fps.mp4"
          muted
          loop
          playsInline
          autoPlay
        />
        <div className="absolute inset-0 bg-black opacity-30" />
        <div className="relative z-10 flex flex-col items-center text-white font-bold text-3xl uppercase tracking-widest lg:text-4xl">
          Souvenirs & Gifts
          <a
            href="/tours"
            className="mt-4 px-6 py-2 bg-white bg-opacity-50 text-black font-semibold rounded-lg text-sm transition-opacity duration-300 hover:bg-opacity-80"
          >
            View Products
          </a>
        </div>
      </div>

      {/* Second row with four grids */}
      <div className="grid grid-cols-1 md:grid-cols-4 h-[20vh] w-full gap-5 mt-4">
        <div
          className="relative flex items-center justify-center bg-cover bg-center group overflow-hidden"
          style={{
            backgroundImage: "url('https://cdn.pixabay.com/photo/2020/03/09/16/02/silk-4916174_1280.jpg')",
          }}
        >
          <div className="absolute inset-0 bg-black opacity-30" />
          <div className="relative z-10 text-white text-center">
            <h3 className="text-md font-semibold">Fashion</h3>
            <p className="text-xs">Refined Style</p>
          </div>
        </div>
        <div
          className="relative flex items-center justify-center bg-cover bg-center group overflow-hidden"
          style={{
            backgroundImage: "url('https://cdn.pixabay.com/photo/2020/08/09/15/58/cosmetics-5475897_1280.jpg')",
          }}
        >
          <div className="absolute inset-0 bg-black opacity-30" />
          <div className="relative z-10 text-white text-center">
            <h3 className="text-md font-semibold">K-Beauty</h3>
            <p className="text-xs">Pure Elegance</p>
          </div>
        </div>
        <div
          className="relative flex items-center justify-center bg-cover bg-center group overflow-hidden"
          style={{
            backgroundImage: "url('https://cdn.pixabay.com/photo/2021/03/08/06/23/green-tea-6078275_1280.jpg')",
          }}
        >
          <div className="absolute inset-0 bg-black opacity-30" />
          <div className="relative z-10 text-white text-center">
            <h3 className="text-md font-semibold">Exotic Tea</h3>
            <p className="text-xs">Savor Serenity</p>
          </div>
        </div>
        <div
          className="relative flex items-center justify-center bg-cover bg-center group overflow-hidden"
          style={{
            backgroundImage: "url('https://cdn.pixabay.com/photo/2019/07/25/01/35/kimchi-4361465_1280.jpg')",
          }}
        >
          <div className="absolute inset-0 bg-black opacity-30" />
          <div className="relative z-10 text-white text-center">
            <h3 className="text-md font-semibold">Gourmet</h3>
            <p className="text-xs">Authentic Flavors</p>
          </div>
        </div>
      </div>

      {/* Bottom section: Two side-by-side videos */}
      <div className="flex h-[30vh] w-full mt-4">
        <div
          className="relative flex-1 flex items-center justify-center bg-cover bg-center group overflow-hidden"
        >
          <video
            className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-80"
            src="https://videos.pexels.com/video-files/8037707/8037707-uhd_2732_1440_25fps.mp4"
            muted
            loop
            playsInline
            autoPlay
          />
          <div className="absolute inset-0 bg-black opacity-30" />
          <div className="relative z-10 text-white font-bold text-xl uppercase tracking-widest lg:text-2xl">
            About Our Tours
          </div>
        </div>

        <a
          href="/explore-on-map"
          className="relative flex-1 flex items-center justify-center bg-cover bg-center group overflow-hidden"
        >
          <video
            className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-80"
            src="https://videos.pexels.com/video-files/9120964/9120964-uhd_1440_2732_25fps.mp4"
            muted
            loop
            playsInline
            autoPlay
          />
          <div className="absolute inset-0 bg-black opacity-30" />
          <div className="relative z-10 text-white font-bold text-xl uppercase tracking-widest lg:text-2xl">
            Explore on Map
          </div>
        </a>
      </div>
    </div>
  );
};

export default ProductImage;
