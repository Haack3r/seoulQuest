import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import {
    ShoppingBagIcon,
    UserIcon,
    LogInIcon,
    LogOutIcon,
    SearchIcon,
    MenuIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
  } from "lucide-react";

const BasicMenu = () => {
  const loginState = useSelector(state => state.loginSlice)

  return (
    <header className="min-h-screen bg-white font-sans shadow-sm">
          <div className="fixed top-0 left-0 right-0 bg-white bg-opacity-70 backdrop-blur-md z-50 ">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <Link to={'/'} className="text-2xl font-semibold tracking-wide text-gray-900">
                Seoul<span className="text-orange-500">Culture</span>Quest
              </Link>
            </div>
        <nav>
                          <ul className="flex space-x-4">
                              <li><ShoppingBagIcon className="h-5 w-5" /></li>
            <li><Link to="/" className="text-gray-600 hover:text-gray-900">Home</Link></li>
            <li><Link to={'/products/'} className="text-gray-600 hover:text-gray-900">Products</Link></li>
      {!loginState.email ?
        <>
          <li><Link to={'/member/login/'} className="text-gray-600 hover:text-gray-900">Login</Link></li>
        </>
        :
        <>
            <div className='span className="text-gray-60'><Link to={'/member/logout/'}>Logout</Link></div>
            <div className='span className="text-gray-600'><Link to={'/cart/'}>Cart</Link></div>
        </>}
        </ul>
        </nav>
                  </div>
              </div>
              </div>
    </header>
    
  )
}

export default BasicMenu