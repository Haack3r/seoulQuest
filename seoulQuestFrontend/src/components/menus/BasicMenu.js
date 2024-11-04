import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Button from "../ui/Button";
import {
<<<<<<< HEAD
  ShoppingBagIcon,
  UserIcon,
  LogInIcon
=======
    ShoppingBagIcon,
    UserIcon,
    LogInIcon
>>>>>>> origin/hyein
} from "lucide-react";

const BasicMenu = () => {
  const loginState = useSelector(state => state.loginSlice)

  return (
    <header className="h-16 bg-white font-sans shadow-sm fixed top-0 left-0 right-0 bg-opacity-70 backdrop-blur-md z-50">
<<<<<<< HEAD
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Brand Name */}
          <div className="flex items-center">
            <Link to={'/'} className="text-2xl font-semibold tracking-wide text-gray-900">
              Seoul<span className="text-orange-500">Culture</span>Quest
            </Link>
          </div>

          {/* Navigation links */}
          <nav className="flex-grow flex justify-center">
            <ul className="flex space-x-8">
              <li><Link to="/tours/" className="text-gray-600 hover:text-gray-900">Tours</Link></li>
              <li><Link to='/products/' className="text-gray-600 hover:text-gray-900">Souvenirs</Link></li>
              <li><Link to="/about/" className="text-gray-600 hover:text-gray-900">About</Link></li>
              <li><Link to='/contact/' className="text-gray-600 hover:text-gray-900">Contact</Link></li>
            </ul>
          </nav>

          {/* User controls */}
          <ul className="flex space-x-4 items-center">
            {!loginState.email ? (
              <>
                <li><Link to={'/member/login/'} className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"><LogInIcon className="h-5 w-5 mr-2" />Login</Link></li>
              </>
            ) : (
              <>
                <li><Link to={'/member/logout/'} className="flex items-center space-x-2 text-gray-600 hover:text-gray-900">Logout</Link></li>
                <li><Link to={'/cart/'} className="flex items-center space-x-2 text-gray-600 hover:text-gray-900">
                  <ShoppingBagIcon className="h-5 w-5 text-gray-600 hover:text-gray-900" />
                </Link></li>
              </>
            )}
            <Button
=======
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex justify-between h-16 items-center">
      {/* Brand Name */}
      <div className="flex items-center">
        <Link to={'/'} className="text-2xl font-semibold tracking-wide text-gray-900">
          Seoul<span className="text-orange-500">Culture</span>Quest
        </Link>
      </div>

      {/* Navigation links */}
      <nav className="flex-grow flex justify-center">
        <ul className="flex space-x-8">
          <li><Link to="/tours/" className="text-gray-600 hover:text-gray-900">Tours</Link></li>
          <li><Link to='/products/' className="text-gray-600 hover:text-gray-900">Souvenirs</Link></li>
          <li><Link to="/about/" className="text-gray-600 hover:text-gray-900">About</Link></li>
          <li><Link to='/contact/' className="text-gray-600 hover:text-gray-900">Contact</Link></li>
        </ul>
      </nav>

      {/* User controls */}
      <ul className="flex space-x-4 items-center">
        {/* {!loginState.email ? (
          <> */}
            <li><Link to={'/member/login/'} className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"><LogInIcon className="h-5 w-5 mr-2" />Login</Link></li>
          {/* </>
        ) : (
          <>
            <li><Link to={'/member/logout/'} className="flex items-center space-x-2 text-gray-600 hover:text-gray-900">Logout</Link></li>
            <li><Link to={'/cart/'} className="flex items-center space-x-2 text-gray-600 hover:text-gray-900">
              <ShoppingBagIcon className="h-5 w-5 text-gray-600 hover:text-gray-900" />
            </Link></li>
          </>
        )} */}
        <Button
>>>>>>> origin/hyein
              variant="default"
              size="sm"
              className="bg-orange-600 hover:bg-rose-700 text-white font-medium"
            >
              <UserIcon className="h-5 w-5 mr-2" />
              Sign up
            </Button>
<<<<<<< HEAD
          </ul>
        </div>
      </div>
    </header>
=======
      </ul>
    </div>
  </div>
</header>
>>>>>>> origin/hyein
  )
}

export default BasicMenu