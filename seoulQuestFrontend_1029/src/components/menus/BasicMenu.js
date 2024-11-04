import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Button from "../ui/Button";
import "../../Navbar.css"; // Ensure this file includes the necessary CSS
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { ShoppingBagIcon, UserIcon, LogInIcon } from "lucide-react";

const BasicMenu = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const loginState = useSelector((state) => state.loginSlice);

  // Function to check if the screen is wide enough for the normal menu
  const checkScreenSize = () => {
    if (window.innerWidth >= 1024) {
      // You can adjust this value to match your design
      setMenuOpen(false); // Close the menu when on larger screens
    }
  };

  // Set up event listener for window resize
  useEffect(() => {
    window.addEventListener("resize", checkScreenSize);

    // Cleanup function to remove event listener
    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  }, []);

  return (
    <header className="h-16 bg-white font-sans shadow-sm fixed top-0 left-0 right-0 bg-opacity-70 backdrop-blur-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Left-aligned Hamburger Icon for Mobile */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-gray-600 hover:text-gray-900"
            >
              <FontAwesomeIcon icon={faBars} className="h-6 w-6" />
            </button>
          </div>

          {/* Centered Logo */}
          <div className="flex-grow flex justify-center lg:justify-start">
            <Link
              to={"/"}
              className="text-2xl font-semibold tracking-wide text-gray-900"
            >
              Seoul<span className="text-orange-500">Culture</span>Quest
            </Link>
          </div>

          {/* Desktop Menu - Hidden on small screens */}
          <div className="hidden lg:flex lg:flex-grow lg:justify-between lg:items-center">
            <nav className="flex space-x-8">
              <Link to="/tours/" className="menu-animation-color">
                Tours
              </Link>
              <Link to="/products/" className="menu-animation-color">
                Souvenirs
              </Link>
              <Link to="/about/" className="menu-animation-color">
                About
              </Link>
              <Link to="/contact/" className="menu-animation-color">
                Contact
              </Link>
            </nav>
            <div className="flex items-center space-x-4">
              {!loginState.email ? (
                <>
                  <Link
                    to={"/member/login/"}
                    className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
                  >
                    <LogInIcon className="h-5 w-5 mr-2" /> Login
                  </Link>
                  <Button
                    variant="default"
                    size="sm"
                    className="bg-orange-600 hover:bg-rose-700 text-white font-medium"
                  >
                    <UserIcon className="h-5 w-5 mr-2" /> Sign up
                  </Button>
                </>
              ) : (
                <>
                  <Link
                    to={"/cart/"}
                    className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
                  >
                    <ShoppingBagIcon className="h-5 w-5 text-gray-600 hover:text-gray-900" />
                  </Link>
                  <Link
                    to={"/member/logout/"}
                    className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
                  >
                    Logout
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Menu - Visible when `menuOpen` is true */}
        {menuOpen && (
          <div className="lg:hidden mt-2 mobile-menu">
            <nav className="flex flex-col space-y-4">
              <Link to="user/tours/" className="menu-animation-color">
                Tours
              </Link>
              <Link to="/user/products/" className="menu-animation-color">
                Souvenirs
              </Link>
              <Link to="/about/" className="menu-animation-color">
                About
              </Link>
              <Link to="/contact/" className="menu-animation-color">
                Contact
              </Link>
            </nav>
            <div className="flex flex-col space-y-4 mt-4">
              {!loginState.email ? (
                <>
                  <Link
                    to={"/member/login/"}
                    className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
                  >
                    <LogInIcon className="h-5 w-5 mr-2" /> Login
                  </Link>
                  <Button
                    variant="default"
                    size="sm"
                    className="bg-orange-600 hover:bg-rose-700 text-white font-medium"
                  >
                    <UserIcon className="h-5 w-5 mr-2" /> Sign up
                  </Button>
                </>
              ) : (
                <>
                  <Link
                    to={"/cart/"}
                    className="flex items-center space-x-2 menu-animation-color"
                  >
                    <ShoppingBagIcon className="h-5 w-5 menu-animation-color" />
                  </Link>
                  <Link
                    to={"/member/logout/"}
                    className="flex items-center space-x-2 menu-animation-color"
                  >
                    Logout
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default BasicMenu;
