import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Button from "../ui/Button";
import "../../Navbar.css"
import {
    ShoppingBagIcon,
    UserIcon,
    LogInIcon
} from "lucide-react";

const BasicMenu = () => {
  const loginState = useSelector(state => state.loginSlice)

  return (
    <header className="h-16 bg-white font-sans shadow-sm fixed top-0 left-0 right-0 bg-opacity-70 backdrop-blur-md z-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex justify-between h-16 items-center">
      {/* Brand Name */}
      <div className="flex items-center">
        <Link to={'/'} className="text-2xl font-semibold tracking-wide text-gray-900">
          Seoul<span className="text-orange-500">Culture</span>Quest
        </Link>
      </div>

      {/* User controls */}
         {!loginState.email ? (
          <>
          <nav className="flex-grow flex justify-center">
            <ul className="flex space-x-8 navLinks">
              <li>OUR SERVICE
              <ul className='dropdown'>
              <li><Link to="/tours/" className="text-gray-600 hover:text-gray-900">Tours</Link></li>
              <li><Link to='/products/' className="text-gray-600 hover:text-gray-900">Souvenirs</Link></li>
            </ul>
            </li>
              <li><Link to="/about/" className="text-gray-600 hover:text-gray-900">About</Link></li>
              <li><Link to='/contact/' className="text-gray-600 hover:text-gray-900">Contact</Link></li>       
            </ul>
          </nav>
          <div>
            <ul className="flex space-x-4 items-center">
              <li>
                <Link to={'/member/login/'} className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"><LogInIcon className="h-5 w-5 mr-2" />Login</Link>
              </li>
              <li> 
                <Button variant="default" size="sm" className="bg-orange-600 hover:bg-rose-700 text-white font-medium">
                  <UserIcon className="h-5 w-5 mr-2" /> Sign up
                </Button>
              </li>
            </ul>  
          </div>
          </>
          
        ) : (
          <>
            <nav className="flex-grow flex justify-center">
              <ul className="flex space-x-8">
                <li><Link to="/user/tours/" className="text-gray-600 hover:text-gray-900">Tours</Link></li>
                <li><Link to='/user/products/' className="text-gray-600 hover:text-gray-900">Souvenirs</Link></li>
                <li><Link to="/about/" className="text-gray-600 hover:text-gray-900">About</Link></li>
                <li><Link to='/contact/' className="text-gray-600 hover:text-gray-900">Contact</Link></li>
              </ul>
            </nav>
            <div>
                <ul className="flex space-x-4 items-center">
                  <li><Link to={'/cart/'} className="flex items-center space-x-2 text-gray-600 hover:text-gray-900">
                    <ShoppingBagIcon className="h-5 w-5 text-gray-600 hover:text-gray-900" />
                  </Link></li>
                  <li><Link to={'/member/logout/'} className="flex items-center space-x-2 text-gray-600 hover:text-gray-900">Logout</Link></li>
                </ul>
            </div>
          </>
        )} 
       
    </div>
  </div>
</header>
  )
}

export default BasicMenu
