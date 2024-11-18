import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCcVisa, faCcMastercard, faCcAmex } from '@fortawesome/free-brands-svg-icons';

export default function Footer() {
  return (
    <footer className=" text-gray-900"  style={{ backgroundColor: "#E0DCD0" }}>
      {/* Top Bar with Payment Icons */}
      <div className="bg-gray-500 py-4">
        <div className="max-w-7xl mx-auto px-4 flex justify-center space-x-6">
          <FontAwesomeIcon icon={faCcVisa} className="text-gray-100 text-3xl" />
          <FontAwesomeIcon icon={faCcMastercard} className="text-gray-100 text-3xl" />
          <FontAwesomeIcon icon={faCcAmex} className="text-gray-100 text-3xl" />
        </div>
      </div>

      {/* Main Footer */}
      <div className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Footer Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-7 gap-8">
            {/* Column 1 */}
            <div className="col-span-1 flex flex-col items-center sm:items-start">
              <h4 className="text-lg font-semibold tracking-wide mb-4">
                Journal
              </h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="hover:text-gray-600 transition">
                    Terms of Sale
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-600 transition">
                    Cookie Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-600 transition">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-600 transition">
                    Recruitment
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-600 transition">
                    Press
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 2 */}
            <div className="col-span-1 flex flex-col items-center sm:items-start">
              <h4 className="text-lg font-semibold tracking-wide mb-4">
                Explore
              </h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="hover:text-gray-600 transition">
                    Contact & FAQ
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-600 transition">
                    How It Works
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-600 transition">
                    Recycling
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-600 transition">
                    Gift Cards
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 3 (Logo with Badge) */}
            <div className="col-span-1 lg:col-span-3 flex flex-col justify-center items-center">
              {/* SCQ Logo */}
              <div className="text-7xl font-serif font-bold text-gray-800">
                SCQ
              </div>

              {/* Certified Positive Corporation Badge */}
              <div className="mt-10 text-center">
                <h4 className="text-lg font-bold text-gray-800 mb-2 uppercase tracking-wider">
                  Certified Positive Corporation
                </h4>
                <div className="mt-8 flex flex-col items-center">
                  <div className="flex items-center justify-center w-20 h-20 border-4 border-gray-800 rounded-full">
                    <span className="text-2xl font-bold text-gray-800">P</span>
                  </div>
                  <div className="text-center mt-4">
                    <h5 className="text-md font-semibold text-gray-800">Certified</h5>
                    <p className="text-sm font-light text-gray-600">Positive Corporation</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Column 4 */}
            <div className="col-span-1 flex flex-col items-center sm:items-start">
              <h4 className="text-lg font-semibold tracking-wide mb-4">
                Socials
              </h4>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="text-gray-900 hover:text-gray-600 transition"
                >
                  Instagram
                </a>
                <a
                  href="#"
                  className="text-gray-900 hover:text-gray-600 transition"
                >
                  Facebook
                </a>
                <a
                  href="#"
                  className="text-gray-900 hover:text-gray-600 transition"
                >
                  TikTok
                </a>
              </div>
            </div>
          </div>

          {/* Footer Bottom Section */}
          <div className="mt-12 flex flex-col items-center lg:flex-row justify-between text-sm text-gray-600">
            
            <div>
              © {new Date().getFullYear()} Seoul Culture Quest. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
