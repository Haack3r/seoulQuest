import React from "react";
import { SearchIcon } from "lucide-react";

const SearchBar = () => {
  return (
    <div className="mb-10 flex flex-col items-center">
      {/* Title above the search bar */}
      

      {/* Search bar container */}
      <div className="flex w-full max-w-3xl bg-white rounded-full shadow-lg overflow-hidden border border-gray-200">
        {/* Input Field */}
        <input
          type="text"
          placeholder="Search tours, destinations, experiences..."
          className="flex-grow border-0 focus:ring-0 text-base py-2 px-4 outline-none"
        />

        {/* Button */}
        <button className="bg-orange-600 hover:bg-rose-700 text-white font-medium tracking-wide py-2 px-4 rounded-r-full flex items-center">
          <SearchIcon className="h-4 w-4 mr-2" />
          Explore
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
