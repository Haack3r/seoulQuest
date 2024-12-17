import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCcVisa, faCcMastercard, faCcAmex } from "@fortawesome/free-brands-svg-icons";
import { Link } from "react-router-dom";
import TermsOfSale from "../components/policies/TermsOfSale";
import CookiePolicy from "../components/policies/CookiePolicy";
import PrivacyPolicy from '../components/policies/PrivacyPolicy';
import useCustomLogin from "../hooks/useCustomLogin";

const Footer = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCookieModalOpen, setIsCookieModalOpen] = useState(false);
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const openCookieModal = () => setIsCookieModalOpen(true);
  const closeCookieModal = () => setIsCookieModalOpen(false);
  const openPrivacyModal = () => setIsPrivacyModalOpen(true); 
  const closePrivacyModal = () => setIsPrivacyModalOpen(false); 

  const { loginState } = useCustomLogin();

  return (
    <footer className="text-gray-900" style={{ backgroundColor: "#E0DCD0" }}>
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
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-7 gap-8 sm:items-start sm:text-left items-center text-center">
            {/* Column 1 */}
            <div className="lg:col-span-1 sm:col-span-full flex flex-col items-center text-center">
              <h4 className="text-lg font-semibold tracking-wide mb-4">Journal</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <button onClick={openModal} className="hover:text-gray-600 transition">
                    Terms of Sale
                  </button>
                </li>
                <li>
                  <button onClick={openCookieModal} className="hover:text-gray-600 transition">
                    Cookie Policy
                  </button>
                </li>
                <li>
                  <button onClick={openPrivacyModal} className="hover:text-gray-600 transition">
                    Privacy Policy
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 2 */}
            <div className="lg:col-span-1 sm:col-span-full flex flex-col items-center text-center">
              <h4 className="text-lg font-semibold tracking-wide mb-4">Explore</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link to="/about/" className="hover:text-gray-600 transition">
                    About
                  </Link>
                </li>
                <li>
                {loginState.email ? <Link to="/user/tours/" className="hover:text-gray-600 transition">
                    Tours and Experiences
                  </Link> : <Link to="/tours/" className="hover:text-gray-600 transition">
                    Tours and Experiences
                  </Link>}
                  
                </li>
                <li>
                  {loginState.email ? <Link to="/user/products" className="hover:text-gray-600 transition">
                    Souvenirs and Gifts
                  </Link> : <Link to="/products" className="hover:text-gray-600 transition">
                    Souvenirs and Gifts
                  </Link>}
                </li>
                <li>
                  {loginState.email ? <Link to="/contact" className="hover:text-gray-600 transition">
                    Contact
                  </Link> : ""}
                </li>
              </ul>
            </div>

            {/* Column 3 (Logo with Badge) */}
            <div className="col-span-full lg:col-span-3 flex flex-col justify-center items-center">
              <div className="text-7xl font-serif font-bold text-gray-800">SCQ</div>

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
            <div className="col-span-1 lg:col-span-1 sm:col-span-full flex flex-col items-center text-center">
              <h4 className="text-lg font-semibold tracking-wide mb-4">Socials</h4>
              <div className="flex space-x-4">
                <a href="https://www.instagram.com/" className="text-gray-900 hover:text-gray-600 transition">
                  Instagram
                </a>
                <a href="https://www.facebook.com/" className="text-gray-900 hover:text-gray-600 transition">
                  Facebook
                </a>
                <a href="https://www.tiktok.com/" className="text-gray-900 hover:text-gray-600 transition">
                  TikTok
                </a>
              </div>
            </div>
          </div>

          {/* Footer Bottom Section */}
          <div className="mt-12 flex flex-col items-center lg:flex-row justify-between text-sm text-gray-600">
            <div>© {new Date().getFullYear()} Seoulhwa. All rights reserved.</div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 md:max-w-4xl relative">
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 text-2xl font-bold"
            >
              &times;
            </button>
            <div className="overflow-y-auto max-h-[80vh]">
              <TermsOfSale />
            </div>
          </div>
        </div>
      )}
      {isCookieModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 md:max-w-4xl relative">
            <button
              onClick={closeCookieModal}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 text-2xl font-bold"
            >
              &times;
            </button>
            <div className="overflow-y-auto max-h-[80vh]">
              <CookiePolicy />
            </div>
          </div>
        </div>
      )}
      {isPrivacyModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 md:max-w-4xl relative">
            <button
              onClick={closePrivacyModal}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 text-2xl font-bold"
            >
              &times;
            </button>
            <div className="overflow-y-auto max-h-[80vh]">
              <PrivacyPolicy />
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};

export default Footer;
