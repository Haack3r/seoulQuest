import React from "react";

const AboutToursComponent = () => {
  return (
    <div className="mt-12 max-w-5xl mx-auto flex flex-col items-center">
      {/* Main Heading */}
      <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-center text-gray-900 ">
        Discover <span className="italic text-gray-600">Seoul's <span className="text-yellow-500">Magic</span></span>
      </h2>
      <div className="w-full mt-12">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 items-center mt-12">
          {/* Left: Photo */}
          <div className="w-full h-full">
            <img
              src="https://cdn.pixabay.com/photo/2019/09/09/05/14/seoul-4462638_1280.jpg"
              alt="Explore Seoul"
              className="w-full h-full object-cover ml-36 opacity-80"
            />
          </div>

          {/* Center: Rotated Typography */}
          <div className="flex items-center justify-center relative">
            <h2
              className="text-gray-900 font-bold text-5xl uppercase transform rotate-90 origin-center tracking-wide"
            >
              Adventure Awaits in <span className="text-yellow-500"> Seoul</span>
            </h2>
          </div>

          {/* Right: Typography with Background */}
          <div className="mr-44 relative text-gray-700 space-y-4">
            {/* Background rectangle */}
            <div className="absolute bottom-4 right-4 bg-gray-300 w-20 h-20 opacity-80 -z-10"></div>

            {/* Typography */}
            <p className="text-lg font-semibold text-gray-500">
              Discover the heart of Korea's capital.
            </p>
            <p className="text-sm italic">
              <b>Wander</b>
              <p>through</p>
              <p className="ml-20">timeless</p>
              <b className="ml-32">traditions</b>
              <p>and</p>
              <b className="ml-9">modern</b>
              <b className="ml-14">wonders.</b>
            </p>
            <p className="text-sm">
              <p>An experience</p>
              <p>you will</p>
              <b>never forget</b>
              <p>awaits you.</p>
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6">
        {/* What We Offer */}
        <div className="text-center">
          <h3 className="text-3xl font-bold text-gray-900 mb-6">
            What We Offer
          </h3>
          <p className="text-gray-700 leading-relaxed max-w-xl mx-auto mb-12">
            At SeoulCultureQuest, we bring you a curated selection of tours that
            combine history, culture, and modern charm. From iconic landmarks to
            hidden gems, our offerings are designed to provide a comprehensive
            experience of Seoul's dynamic character.
          </p>
        </div>

        {/* Details of Tours */}
        {/* Image in the center with text boxes overlapping */}
      <div className="relative mt-16">
        {/* Center Image */}
        <div className="relative w-[400px] h-[500px] mx-auto">
          <img
            src="https://cdn.pixabay.com/photo/2020/02/26/06/33/korea-4880774_1280.jpg"
            alt="Discover Seoul"
            className="w-full h-full object-cover opacity-80"
          />
        </div>

        {/* Text Box 1: Top-left */}
        <div className="absolute top-0 right-0 w-[250px] border py-5 px-5 -translate-x-2 translate-y-24 z-10 lg:-translate-x-32">
          <h4 className="mb-20">
          </h4>
        </div>
        <div className="absolute top-0 left-0 w-[250px] border py-5 px-5 -translate-x-10 -translate-y-10 z-10 sx:w-[100px] lg:translate-x-20">
          <h4 className="text-lg font-semibold text-gray-800 mb-2">
            Traditional Cultural Tours
          </h4>
          <p className="text-sm text-gray-700">
            Immerse yourself in Seoul's rich history by visiting grand palaces,
            strolling through Bukchon Hanok Village, and experiencing the
            traditional hanbok.
          </p>
                  </div>

        {/* Text Box 2: Top-right */}
        
        <div className="absolute top-0 right-0 w-[250px] border py-5 px-5 translate-x-10 -translate-y-10 z-10 lg:-translate-x-20">
          <h4 className="text-lg font-semibold text-gray-800 mb-2">
            Modern City Adventures
          </h4>
          <p className="text-sm text-gray-700">
            Discover bustling neighborhoods, skyscrapers, and culinary delights
            in modern Seoul's vibrant districts.
          </p>
                  </div>
                  

        {/* Text Box 3: Bottom-left */}
        <div className="absolute bottom-0 left-0 w-[250px] border py-5 px-5 -translate-x-10 translate-y-10 z-10 lg:translate-x-20">
          <h4 className="text-lg font-semibold text-gray-800 mb-2">
            Hidden Gems & Nature Escapes
          </h4>
          <p className="text-sm text-gray-700">
            Escape to tranquil temples, lush parks, and serene riversides for a
            peaceful retreat from the city's pace.
          </p>
        </div>

        {/* Text Box 4: Bottom-right */}
        <div className="absolute bottom-0 right-0 w-[250px] bg-white bg-opacity-15 border py-5 px-5 translate-x-10 translate-y-10 z-10 lg:-translate-x-20">
          <h4 className="text-lg font-semibold text-gray-800 mb-2">
            Customizable Experiences
          </h4>
          <p className="text-sm text-gray-700">
            Create your dream tour, tailored to your interests, whether you're
            into history, food, or adventure.
          </p>
        </div>
      </div>
        {/* Call to Action */}
        <div className="text-center mt-20">
          <h3 className="text-3xl font-bold text-yellow-500 mb-6">
            Ready to Begin Your Adventure?
          </h3>
          <p className="text-gray-700 leading-relaxed max-w-xl mx-auto">
            Explore Seoul's timeless beauty and modern marvels with
            SeoulCultureQuest. Let us take you on a journey where every moment
            becomes a cherished memory.
          </p>
          
        </div>
      </div>
    </div>
  );
};

export default AboutToursComponent;
