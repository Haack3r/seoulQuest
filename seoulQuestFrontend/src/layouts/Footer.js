import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-serif font-semibold mb-4">About Us</h3>
            <p className="text-sm">Maison de Luxe offers a curated selection of premium lifestyle products to elevate your living space.</p>
          </div>
          <div>
            <h3 className="text-lg font-serif font-semibold mb-4">Contact</h3>
            <p className="text-sm">Email: info@maisondeluxe.com</p>
            <p className="text-sm">Phone: (555) 123-4567</p>
          </div>
          <div>
            <h3 className="text-lg font-serif font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-gray-300">Instagram</a>
              <a href="#" className="text-white hover:text-gray-300">Pinterest</a>
              <a href="#" className="text-white hover:text-gray-300">Facebook</a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-sm">
          © {new Date().getFullYear()} Maison de Luxe. All rights reserved.
        </div>
      </div>
    </footer>
  );
}