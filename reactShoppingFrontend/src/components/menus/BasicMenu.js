import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const BasicMenu = () => {
  const loginState = useSelector(state => state.loginSlice)

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <Link to={'/'} className="text-2xl font-serif font-bold text-gray-900">Maison de Luxe</Link>
        <nav>
          <ul className="flex space-x-4">
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
    </header>
  )
}

export default BasicMenu