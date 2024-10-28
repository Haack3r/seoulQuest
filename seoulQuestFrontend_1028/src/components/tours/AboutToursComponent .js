// src/components/tours/AboutToursComponent.js

import React from 'react';
import "../../About.css";


const AboutToursComponent = () => {
  return (
    <div className="container mx-auto px-4 py-10 bg-gray-50 bg-opacity-50 rounded-lg ">
      <h2 className="text-3xl font-bold text-center  mb-8">
        Welcome to Your Enchanting Journey Through Seoul!
      </h2>

      {/* First Grid: About Our Tours and First Image */}
      <div className="grid md:grid-cols-2 gap-8 mb-10 bg-white p-4 rounded-lg shadow">
        <div className="about-content">
          <h3 className="text-2xl font-semibold mb-4">About Our Tours</h3>
          <p>
            At [Your Company Name], we are delighted to extend a warm invitation to experience the vibrant and captivating spirit of Seoul. Nestled between the mountains and the Han River, this magnificent city harmonizes modern vibrance with rich traditions, creating a tapestry of experiences that beckons travelers from around the globe.
          </p>
          <p className="mt-4">
            Embrace the Essence of Seoul: Seoul is a city where time intertwines; ancient palaces whisper tales of dynasties past, while contemporary marvels dazzle with their innovation. Our thoughtfully crafted tours immerse you in the very essence of this enchanting metropolis, promising an adventure that awakens your senses and ignites your spirit.
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

      {/* Second Title */}
      <h3 className="text-2xl font-semibold text-center mt-10 mb-6">Our Exquisite Tours</h3>

      {/* Second Grid: Traditional Tours and Second Image */}
      <div className="grid md:grid-cols-2 gap-8 mb-10 bg-gray-100 p-4 rounded-lg shadow">
        <div className="about-image">
          <img 
            src="https://cdn.pixabay.com/photo/2020/03/19/07/37/suwon-4946628_1280.jpg" 
            alt="Traditional Tours" 
            className="w-full h-auto rounded-lg shadow-lg" 
          />
        </div>
        <div className="about-content">
          <h4 className="text-xl font-semibold mt-4">Traditional Cultural Tours</h4>
          <p>
            Step into a world of elegance and grace as you explore Seoul's storied past. Wander through the majestic halls of Gyeongbokgung Palace, where the echoes of royal history still resonate. Adorn yourself in a stunning hanbok and stroll through the charming Bukchon Hanok Village, where traditional wooden houses stand as guardians of heritage. Engage in time-honored customs, such as the serene art of tea ceremonies and the vibrant rhythms of traditional performances, and let the soul of Korea envelop you.
          </p>
        </div>
      </div>

      {/* Third Grid: Modern Cultural Tours and Third Image */}
      <div className="grid md:grid-cols-2 gap-8 mb-10 bg-white p-4 rounded-lg shadow">
        <div className="about-content">
          <h4 className="text-xl font-semibold mt-4">Modern Cultural Tours</h4>
          <p>
            Experience the exhilarating pulse of Seoul as you delve into its modern wonders. Discover the dynamic streets of Gangnam, where style and innovation converge, and be captivated by the art scene in the bustling district of Hongdae. From cutting-edge technology to the mesmerizing world of K-pop, our modern tours offer a thrilling glimpse into the future of Korean culture. Indulge your taste buds with innovative culinary delights that blend traditional flavors with contemporary flair, creating an unforgettable feast for the senses.
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
        <h3 className="text-2xl font-semibold mt-6">Tailored Adventures Await</h3>
        <p>
          Every traveler is unique, and we pride ourselves on crafting personalized experiences that cater to your passions. Whether you seek the tranquility of historical sites or the excitement of urban exploration, our expert guides are dedicated to curating a journey that resonates with your heart and soul.
        </p>
      </div>

      {/* Join Us Section */}
      <div className="about-content text-center mt-10">
        <h3 className="text-2xl font-semibold mt-6">Join Us on This Extraordinary Voyage</h3>
        <p>
          As you embark on this thrilling adventure, we invite you to witness Seoul’s captivating duality—where age-old traditions gracefully coexist with a vibrant, modern spirit. Allow us to be your companions on this unforgettable journey, where every moment is a celebration of culture, beauty, and discovery.
        </p>
        <p className="mt-4 font-bold">
          Welcome to Seoul, where every street holds a story and every experience is a treasure waiting to be uncovered. Together, let’s create memories that will last a lifetime!
        </p>
      </div>
    </div>
  );
}

export default AboutToursComponent;
