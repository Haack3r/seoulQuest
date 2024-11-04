import React from 'react';
import "../../About.css";

const AboutToursComponent = () => {
  return (
    <div className="container mx-auto px-4 py-10 bg-gray-50 bg-opacity-70 rounded-lg mt-10">
      <h2 className="text-4xl font-serif text-center text-gray-800 mb-8">
        Welcome to Your Enchanting Journey Through Seoul!
      </h2>

      {/* Grid layout for content */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
        {/* First Card: About Our Tours */}
        <div className="bg-white p-4 rounded-lg shadow-lg flex flex-col">
          <h3 className="text-3xl font-serif text-gray-700 mb-4">About Our Tours</h3>
          <p className="text-gray-600">
            At [Your Company Name], we extend a warm invitation to experience the vibrant spirit of Seoul. Nestled between mountains and the Han River, this city harmonizes modern vibrance with rich traditions, creating experiences that beckon travelers from around the globe.
          </p>
          <p className="mt-4 text-gray-600">
            Embrace the Essence of Seoul: Where ancient palaces whisper tales of dynasties past, and contemporary marvels dazzle with innovation. Our thoughtfully crafted tours immerse you in the very essence of this enchanting metropolis, promising an adventure that awakens your senses.
          </p>
        </div>
        <div className="about-image">
          <img 
            src="https://cdn.pixabay.com/photo/2016/08/19/04/59/the-bulguksa-temple-1604556_1280.jpg" 
            alt="About Our Tours" 
            className="w-full h-auto rounded-lg shadow-lg" 
          />
        </div>
      </div>

      {/* Second Section: Exquisite Tours */}
      <h3 className="text-3xl font-serif text-center mt-10 mb-6 text-gray-700">Our Exquisite Tours</h3>

      {/* Grid for Traditional Tours */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
        <div className="about-image">
          <img 
            src="https://cdn.pixabay.com/photo/2020/03/19/07/37/suwon-4946628_1280.jpg" 
            alt="Traditional Tours" 
            className="w-full h-auto rounded-lg shadow-lg" 
          />
        </div>
        <div className="about-content bg-gray-100 p-4 rounded-lg shadow-lg">
          <h4 className="text-2xl font-serif text-gray-800 mt-4">Traditional Cultural Tours</h4>
          <p className="text-gray-600">
            Step into a world of elegance and grace as you explore Seoul's storied past. Wander through the majestic halls of Gyeongbokgung Palace, adorned in a stunning hanbok, and stroll through the charming Bukchon Hanok Village, where traditional wooden houses guard our heritage.
          </p>
        </div>
      </div>

      {/* Grid for Modern Cultural Tours */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
        <div className="about-content bg-white p-4 rounded-lg shadow-lg">
          <h4 className="text-2xl font-serif text-gray-800 mt-4">Modern Cultural Tours</h4>
          <p className="text-gray-600">
            Experience the exhilarating pulse of Seoul as you delve into its modern wonders. Discover the dynamic streets of Gangnam, captivated by the art scene in Hongdae, where tradition meets innovation.
          </p>
        </div>
        <div className="about-image">
          <img 
            src="https://cdn.pixabay.com/photo/2021/02/07/18/38/bridge-5992305_1280.jpg" 
            alt="Modern Cultural Tours" 
            className="w-full h-auto rounded-lg shadow-lg" 
          />
        </div>
      </div>

      {/* Tailored Adventures Section */}
      <div className="about-content text-center mt-10">
        <h3 className="text-3xl font-serif text-gray-700 mt-6">Tailored Adventures Await</h3>
        <p className="text-gray-600">
          Every traveler is unique. We craft personalized experiences catering to your passions, whether you seek tranquility or urban exploration. Our expert guides are dedicated to curating a journey that resonates with your heart and soul.
        </p>
      </div>

      {/* Join Us Section */}
      <div className="about-content text-center mt-10">
        <h3 className="text-3xl font-serif text-gray-700 mt-6">Join Us on This Extraordinary Voyage</h3>
        <p className="text-gray-600">
          Embark on this thrilling adventure, witnessing Seoul’s captivating duality—where age-old traditions gracefully coexist with modern spirit. Together, let’s create memories that last a lifetime!
        </p>
      </div>
    </div>
  );
}

export default AboutToursComponent;
