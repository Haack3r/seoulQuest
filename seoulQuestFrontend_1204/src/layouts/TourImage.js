const TourImage = ({ onScrollToAbout, onScrollToTourMap, onScrollToTourList }) => {
  return (
    <div className="flex flex-col h-screen overflow-hidden box-border -mb-4 justify-center items-center">
      {/* Top section: Full width, half height */}
      <div className="relative flex items-center justify-center h-[40vh] w-full bg-cover bg-center group overflow-hidden">
        <video
          className="absolute inset-0 w-full h-full object-cover opacity-80"
          src="https://videos.pexels.com/video-files/28982709/12536329_2560_1440_24fps.mp4"
          muted
          loop
          playsInline
          autoPlay
        />
        <div className="absolute inset-0 bg-black opacity-30" />
        <div className="relative z-10 flex flex-col items-center text-white font-bold text-3xl uppercase tracking-widest lg:text-4xl">
          Tours & Experiences
          <button
            onClick={onScrollToTourList} // Scroll to TourListComponent
            className="mt-4 px-6 py-2 bg-white bg-opacity-50 text-black font-semibold rounded-lg text-sm transition-opacity duration-300 hover:bg-opacity-80"
          >
            View Tours
          </button>
        </div>
      </div>

      {/* Mid section with a background image */}
      <div
        className="relative flex items-center justify-center h-[15vh] w-full bg-cover bg-center group overflow-hidden"
        style={{
          backgroundImage: "url('https://cdn.pixabay.com/photo/2020/12/01/18/02/forest-5797458_1280.jpg')",
        }}
      >
        <div className="absolute inset-0" />
        <div className="relative z-10 text-center text-gray-500">
          <h3 className="text-lg font-semibold">Tailored Adventures Await</h3>
          <p className="text-sm">
            We create personalized travel experiences tailored to your passions.
          </p>
          <p className="text-sm mt-2">
            Our expert guides ensure a journey that resonates with you.
          </p>
        </div>
      </div>

      {/* Bottom section: Two side-by-side videos */}
      <div className="flex h-[35vh] w-full">
        <button
          onClick={onScrollToAbout} // Scroll to AboutToursComponent
          className="relative flex-1 flex items-center justify-center bg-cover bg-center group overflow-hidden"
        >
          <video
            className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-80"
            src="https://videos.pexels.com/video-files/11825002/11825002-hd_1920_1080_30fps.mp4"
            muted
            loop
            playsInline
            autoPlay
          />
          <div className="absolute inset-0 bg-black opacity-30" />
          <div className="relative z-10 text-white font-bold text-2xl uppercase tracking-widest lg:text-3xl">
            About Our Tours
          </div>
        </button>

        <button
          onClick={onScrollToTourMap} // Scroll to TourMap component
          className="relative flex-1 flex items-center justify-center bg-cover bg-center group overflow-hidden"
        >
          <video
            className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-80"
            src="https://videos.pexels.com/video-files/5634000/5634000-uhd_2560_1440_24fps.mp4"
            muted
            loop
            playsInline
            autoPlay
          />
          <div className="absolute inset-0 bg-black opacity-30" />
          <div className="relative z-10 text-white font-bold text-3xl uppercase tracking-widest lg:text-3xl">
            Explore on Map
          </div>
        </button>
      </div>
    </div>
  );
};

export default TourImage;
