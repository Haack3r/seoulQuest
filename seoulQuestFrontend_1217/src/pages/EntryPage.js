import React from "react";
import "../App.css";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const EntryPage = () => {
  const loginState = useSelector((state) => state.loginSlice);

  return (
    <>
      {!loginState.email ? (
        <>
          <div className="relative flex h-screen w-full">
            {/* Left section with link to 'Tours' and hover video */}
            <Link to="/tours"
              className="flex-1 flex items-center justify-center bg-cover bg-center hover-section relative"
              style={{
                backgroundImage:
                  "url('https://cdn.pixabay.com/photo/2020/12/14/19/40/palace-5831869_1280.jpg')",
              }}
            >
              {/* Black overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-15"></div>

              <div className="text-overlay link-animation-color text-white font-bold text-3xl uppercase tracking-widest text-shadow-custom lg:text-3xl z-10">
                Tours
              </div>

              <video
                className="hover-video"
                src="https://videos.pexels.com/video-files/3331913/3331913-hd_1920_1080_30fps.mp4"
                muted
                loop
                playsInline
                autoPlay
              />
            </Link>

            {/* Right section with link to 'Souvenirs' */}
            <Link to="/products"
              className="flex-1 flex items-center justify-center bg-cover bg-center hover-section relative"
              style={{
                backgroundImage:
                  "url('https://cdn.pixabay.com/photo/2017/08/06/00/44/korean-2587180_1280.jpg')",
              }}
            >
              {/* Black overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-25"></div>

              <div className="text-overlay link-animation-color text-white font-bold text-3xl uppercase tracking-widest text-shadow-custom lg:text-3xl z-10">
                Souvenirs
              </div>

              <video
                className="hover-video"
                src="https://videos.pexels.com/video-files/9478312/9478312-uhd_1440_2732_25fps.mp4"
                muted
                loop
                playsInline
                autoPlay
              />
            </Link>
          </div>
        </>
      ) : (
        <>
          <div className="relative flex h-screen w-full">
            {/* Left section with link to 'Tours' */}
            <Link to="user/tours"
              className="flex-1 flex items-center justify-center bg-cover bg-center hover-section relative"
              style={{
                backgroundImage:
                  "url('https://cdn.pixabay.com/photo/2020/12/14/19/40/palace-5831869_1280.jpg')",
              }}
            >
              {/* Black overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-15"></div>

              <div className="text-overlay link-animation-color text-white font-bold text-4xl uppercase tracking-widest text-shadow-custom lg:text-5xl z-10">
                Tours
              </div>

              <video
                className="hover-video"
                src="https://videos.pexels.com/video-files/3331913/3331913-hd_1920_1080_30fps.mp4"
                muted
                loop
                playsInline
                autoPlay
              />
            </Link>

            {/* Right section with link to 'Souvenirs' */}
            <Link to="user/products"
              className="flex-1 flex items-center justify-center bg-cover bg-center hover-section relative"
              style={{
                backgroundImage:
                  "url('https://cdn.pixabay.com/photo/2017/08/06/00/44/korean-2587180_1280.jpg')",
              }}
            >
              {/* Black overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-15"></div>

              <div className="text-overlay link-animation-color text-white font-bold text-4xl uppercase tracking-widest text-shadow-custom lg:text-5xl z-10">
                Souvenirs
              </div>

              <video
                className="hover-video"
                src="https://videos.pexels.com/video-files/9478312/9478312-uhd_1440_2732_25fps.mp4"
                muted
                loop
                playsInline
                autoPlay
              />
            </Link>
          </div>
        </>
      )}
    </>
  );
};

export default EntryPage;
