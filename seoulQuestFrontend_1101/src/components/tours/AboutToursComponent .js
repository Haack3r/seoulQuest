import React from "react";

const AboutToursComponent = () => {
  return (
    <div
      className="container mx-auto px-6 py-12 mt-10 rounded-lg relative"
      style={{
        backgroundImage: `url('https://cdn.pixabay.com/photo/2019/11/29/03/52/hanbok-4660511_960_720.jpg')`, // Replace with your texture image URL
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundAttachment: "fixed", // Makes it fixed while scrolling
      }}
    >
      {/* Semi-transparent overlay for texture effect */}
      <div className="absolute inset-0 bg-white bg-opacity-60"></div>

      {/* Main Content with relative positioning to layer above the background */}
      <div className="relative z-10">
        {/* Main Heading */}
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-center text-gray-900 mb-16">
          Your Journey through{" "}
          <span className="italic text-gray-600">Seoul</span>
        </h2>

        {/* First Section: About Our Tours */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 items-center mb-16">
          {/* Text Section */}
          <div className="md:col-span-3 bg-gray-100 bg-opacity-80 p-8 rounded-lg shadow-md relative z-10 transform -translate-x-4">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              About Our Tours
            </h3>
            <p className="text-gray-700 leading-relaxed">
              Step into the essence of Seoul with SeoulCultureQuest. Experience
              a city that thrives on the edge of tradition and innovation. From
              palaces echoing ancient tales to urban spaces filled with modern
              vibrance, Seoul invites you to witness its unique rhythm.
            </p>
            <p className="mt-6 text-gray-700 leading-relaxed">
              We curate tours that blend history and contemporary life, giving
              you a front-row seat to Seoul's transformative energy. Let us
              guide you through an adventure where every corner holds a story.
            </p>
          </div>
          {/* Image Section */}
          <div className="md:col-span-2 relative">
            <img
              src="https://cdn.pixabay.com/photo/2016/08/19/04/59/the-bulguksa-temple-1604556_1280.jpg"
              alt="About Our Tours"
              className="w-full h-full object-cover rounded-lg shadow-lg transform scale-95"
            />
          </div>
        </div>

        {/* Second Section: Our Exquisite Tours */}
        <h3 className="text-3xl font-bold text-gray-800 text-center mb-12">
          Our Exquisite Tours
        </h3>

        {/* Traditional Cultural Tours */}
        <div className="flex flex-col md:flex-row gap-8 items-start mb-16">
          <div className="relative w-full md:w-1/2 order-2 md:order-1">
            <img
              src="https://cdn.pixabay.com/photo/2020/03/19/07/37/suwon-4946628_1280.jpg"
              alt="Traditional Tours"
              className="w-full h-full object-cover rounded-lg shadow-lg transform scale-95"
            />
          </div>
          <div className="bg-gray-100 bg-opacity-80 p-8 rounded-lg shadow-md md:w-1/2 order-1 md:order-2 -ml-4 md:ml-0">
            <h4 className="text-2xl font-semibold text-gray-800 mb-4">
              Traditional Cultural Tours
            </h4>
            <p className="text-gray-700 leading-relaxed">
              Dive deep into Seoul's roots. Walk through palaces and ancient
              streets that embody elegance and grace. Adorn yourself in hanbok
              as you explore these timeless landmarks, where history feels
              alive.
            </p>
          </div>
        </div>

        {/* Modern Cultural Tours */}
        <div className="flex flex-col md:flex-row gap-8 items-start mb-16">
          <div className="bg-gray-100 bg-opacity-80 p-8 rounded-lg shadow-md md:w-1/2 transform translate-y-4 md:translate-y-0">
            <h4 className="text-2xl font-semibold text-gray-800 mb-4">
              Modern Cultural Tours
            </h4>
            <p className="text-gray-700 leading-relaxed">
              Discover the vibrant pulse of modern Seoul. From the dynamic
              streets of Gangnam to the creative heart of Hongdae, experience a
              city that thrives on reinvention and boldness.
            </p>
          </div>
          <div className="relative w-full md:w-1/2">
            <img
              src="https://cdn.pixabay.com/photo/2021/02/07/18/38/bridge-5992305_1280.jpg"
              alt="Modern Cultural Tours"
              className="w-full h-full object-cover rounded-lg shadow-lg transform scale-95"
            />
          </div>
        </div>

        {/* Updated Section: Curated Experiences for Every Traveler */}
        <div className="text-center mt-20">
          <h3 className="text-3xl font-bold text-gray-800 mb-6">
            Curated Experiences for Every Traveler
          </h3>
          <p className="text-gray-700 leading-relaxed max-w-xl mx-auto italic">
            Our journeys are crafted to resonate with your passions and
            interests. Whether you're seeking hidden gems, peaceful retreats, or
            urban adventures, we ensure each experience is as unique as you are.
          </p>
        </div>

        {/* Join Us Section */}
        <div className="text-center mt-20">
          <h3 className="text-3xl font-bold text-gray-800 mb-6">
            Join Us on This Extraordinary Voyage
          </h3>
          <p className="text-gray-700 leading-relaxed max-w-xl mx-auto">
            Seoul's timeless beauty and modern edge await. Be part of a journey
            that fuses ancient legacies with vibrant culture, creating memories
            that will stay with you forever.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutToursComponent;
