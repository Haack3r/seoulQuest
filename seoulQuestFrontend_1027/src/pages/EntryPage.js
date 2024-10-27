import React from 'react';
import '../App.css';
import { useSelector } from 'react-redux';


const EntryPage = () => {
  const loginState = useSelector(state => state.loginSlice)
  return (
    <>
    {!loginState.email ? (
      <>
    <div className="relative flex h-screen w-full">
      {/* Left section with link to 'Tours' and hover video */}
      <a href="/tours" className="flex-1 flex items-center justify-center bg-cover bg-center hover-section relative" style={{ backgroundImage: "url('https://cdn.pixabay.com/photo/2020/12/14/19/40/palace-5831869_1280.jpg')" }}>
        <div className="text-overlay link-animation-color text-white font-bold text-4xl uppercase tracking-widest text-shadow-custom lg:text-5xl">
          Tours
        </div>
        <video className="hover-video" src="https://videos.pexels.com/video-files/3331913/3331913-hd_1920_1080_30fps.mp4" muted loop playsInline autoPlay />
      </a>
      
      {/* Right section with link to 'Souvenirs' */}
      <a href="/products" className="flex-1 flex items-center justify-center bg-cover bg-center hover-section relative" style={{ backgroundImage: "url('https://cdn.pixabay.com/photo/2017/08/06/00/44/korean-2587180_1280.jpg')" }}>
        <div className="text-overlay link-animation-color text-white font-bold text-4xl uppercase tracking-widest text-shadow-custom lg:text-5xl">
          Souvenirs
        </div>
        <video className="hover-video" src="https://videos.pexels.com/video-files/9478312/9478312-uhd_1440_2732_25fps.mp4" muted loop playsInline autoPlay />
      </a>
    </div>
    </> 
  ) : (
    <>
    <div className="relative flex h-screen w-full">
      {/* Left section with link to 'Tours' and hover video */}
      <a href="user/tours" className="flex-1 flex items-center justify-center bg-cover bg-center hover-section relative" style={{ backgroundImage: "url('https://cdn.pixabay.com/photo/2020/12/14/19/40/palace-5831869_1280.jpg')" }}>
        <div className="text-overlay link-animation-color text-white font-bold text-4xl uppercase tracking-widest text-shadow-custom lg:text-5xl">
          Tours
        </div>
        <video className="hover-video" src="https://videos.pexels.com/video-files/3331913/3331913-hd_1920_1080_30fps.mp4" muted loop playsInline autoPlay />
      </a>
      
      {/* Right section with link to 'Souvenirs' */}
      <a href="user/products" className="flex-1 flex items-center justify-center bg-cover bg-center hover-section relative" style={{ backgroundImage: "url('https://cdn.pixabay.com/photo/2017/08/06/00/44/korean-2587180_1280.jpg')" }}>
        <div className="text-overlay link-animation-color text-white font-bold text-4xl uppercase tracking-widest text-shadow-custom lg:text-5xl">
          Souvenirs
        </div>
        <video className="hover-video" src="https://videos.pexels.com/video-files/9478312/9478312-uhd_1440_2732_25fps.mp4" muted loop playsInline autoPlay />
      </a>
    </div>
    </> 
  )
}
</>
  );
};

export default EntryPage;