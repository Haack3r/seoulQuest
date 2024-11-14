import React from 'react'
import { useState, useEffect } from 'react';
  
  const heroImages = [
    "/placeholder.svg?height=600&width=1200",
    "/placeholder.svg?height=600&width=1200",
    "/placeholder.svg?height=600&width=1200"
  ];

const ListImage = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [currentHeroImage, setCurrentHeroImage] = useState(0);
  
    useEffect(() => {
      const timer = setInterval(() => {
        setCurrentHeroImage((prev) => (prev + 1) % heroImages.length);
      }, 5000);
      return () => clearInterval(timer);
    }, []);
  
    return (
      <div className="bg-gray-50">
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <h1 className="text-2xl font-serif font-bold text-gray-900"></h1>
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                className="pl-10 pr-4 py-2 rounded-full bg-gray-100 text-gray-900 placeholder-gray-500 border border-gray-300 focus:border-gray-500 focus:ring-1 focus:ring-gray-500 outline-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <span className="absolute left-3 top-2.5 text-gray-400">🔍</span>
            </div>
          </div>
        </header>
  
        <section className="relative h-96 overflow-hidden">
          <img
            src={"https://i.pinimg.com/564x/a7/27/06/a72706e10273855f425aae3698b56fbf.jpg"}
            alt="Hero image"
            className="w-full h-full object-cover block align-bottom"
          />
          <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
            <div className="text-center">
              <h2 className="text-4xl md:text-6xl font-serif text-white mb-4">Elevate Your Space</h2>
              <p className="text-xl md:text-2xl text-white mb-8">Discover our curated collection of lifestyle essentials</p>
            </div>
          </div>
        </section>
      </div>
    );
  }

export default ListImage;