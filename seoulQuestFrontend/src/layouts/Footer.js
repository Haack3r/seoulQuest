import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div>
              <h3 className="text-2xl font-bold tracking-wide mb-4">
                Seoul Culture Quest
              </h3>
              <p className="font-medium">
                Unveiling the essence of Korean heritage
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold tracking-wide mb-4">
                Quick Links
              </h4>
              <ul className="space-y-2 font-medium">
                <li>
                  <a href="#" className="hover:text-rose-400 transition-colors">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-rose-400 transition-colors">
                    Experiences
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-rose-400 transition-colors">
                    Artisan Crafts
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-rose-400 transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
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
          © {new Date().getFullYear()} Seoul Culture Quest. All rights reserved.
        </div>
      </div>
    </footer>
  );
}