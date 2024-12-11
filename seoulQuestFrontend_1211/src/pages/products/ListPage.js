import React, { useRef, useState, useEffect } from "react";
import ProductImage from "../../layouts/ProductImage";
import ProcessSteps from "../../layouts/ProcessSteps";
import AboutProduct from "../../components/products/AboutProduct";
import MostPopularProduct from "../../components/products/MostpopularProduct";
import ProductCategoryBeauty from "../../components/products/category/ProductCategoryBeauty";
import ProductCategoryTea from "../../components/products/category/ProductCategoryTea";
import ProductCategoryFashion from "../../components/products/category/ProductCategoryFashion";
import ProductCategoryGourmet from "../../components/products/category/ProductCategoryGourmet";
import ListComponent from "../../components/products/ListComponent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faLeaf,
  faTshirt,
  faUtensils,
  faCircleInfo,
  faGift,
  faMagnifyingGlass,
  faFire,
} from "@fortawesome/free-solid-svg-icons";

const ListPage = () => {
  // Refs for each section
  const aboutRef = useRef(null);
  const beautyRef = useRef(null);
  const teaRef = useRef(null);
  const fashionRef = useRef(null);
  const gourmetRef = useRef(null);
  const mostPopularRef = useRef(null);
  const listRef = useRef(null);
  const imageRef = useRef(null);

  // State to track navbar visibility
  const [showNav, setShowNav] = useState(false);

  // Scroll function
  const scrollToRef = (ref) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Track scrolling to toggle navigation bar visibility
  useEffect(() => {
    const handleScroll = () => {
      if (imageRef.current) {
        const imageBottom = imageRef.current.getBoundingClientRect().bottom;
        setShowNav(imageBottom <= 0); // Show navbar when ProductImage scrolls out of view
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="p-4 w-full" style={{ backgroundColor: "#E0DCD0" }}>
      {/* ProductImage with scroll-to functions */}
      <div ref={imageRef}>
        <ProductImage
          onScrollToAbout={() => scrollToRef(aboutRef)}
          onScrollToBeauty={() => scrollToRef(beautyRef)}
          onScrollToTea={() => scrollToRef(teaRef)}
          onScrollToFashion={() => scrollToRef(fashionRef)}
          onScrollToGourmet={() => scrollToRef(gourmetRef)}
          onScrollToMostPopular={() => scrollToRef(mostPopularRef)}
          onScrollToList={() => scrollToRef(listRef)}
        />
      </div>

      {/* Sections */}
      <ProcessSteps />
      <div ref={mostPopularRef}>
        <MostPopularProduct />
      </div>
      <div ref={aboutRef}>
        <AboutProduct />
      </div>
      <div ref={beautyRef}>
        <ProductCategoryBeauty />
      </div>
      <div ref={teaRef}>
        <ProductCategoryTea />
      </div>
      <div ref={fashionRef}>
        <ProductCategoryFashion />
      </div>
      <div ref={gourmetRef}>
        <ProductCategoryGourmet />
      </div>
      <div ref={listRef}>
        <ListComponent />
      </div>

      {/* Floating Navbar */}
      {showNav && (
        <nav className="z-50 fixed top-1/2 right-4 transform -translate-y-1/2 p-4">
          <ul className="space-y-4">
            <li>
              <button
                onClick={() => scrollToRef(mostPopularRef)}
                title="Most Popular Product"
                className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
              >
                <FontAwesomeIcon icon={faFire} />
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToRef(aboutRef)}
                title="About Our Product"
                className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
              >
                <FontAwesomeIcon icon={faCircleInfo} />
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToRef(mostPopularRef)}
                title="Most Popular Product"
                className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
              >
                <FontAwesomeIcon icon={faFire} />
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToRef(beautyRef)}
                title="K-Beauty"
                className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
              >
                <FontAwesomeIcon icon={faHeart} />
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToRef(teaRef)}
                title="Exotic Tea"
                className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
              >
                <FontAwesomeIcon icon={faLeaf} />
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToRef(fashionRef)}
                title="Fashion"
                className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
              >
                <FontAwesomeIcon icon={faTshirt} />
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToRef(gourmetRef)}
                title="Gourmet"
                className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
              >
                <FontAwesomeIcon icon={faUtensils} />
              </button>
                      </li>
                      <li>
              <button
                onClick={() => scrollToRef(listRef)}
                title="Search Product"
                className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
              >
                <FontAwesomeIcon icon={faMagnifyingGlass} />
              </button>
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
};

export default ListPage;
