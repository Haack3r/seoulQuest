import React from 'react';
import Input from '../components/ui/Input';

export default function Footer() {
  return (
    <footer className="py-16 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
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
              <h4 className="text-lg font-semibold tracking-wide mb-4">
                Stay Connected
              </h4>
              <p className="mb-4 font-medium">
                Subscribe for exclusive offers and cultural insights
              </p>
              <div className="flex gap-2">
              </div>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-white/10 text-center">
            <p className="font-medium">
              &copy; 2024 Seoul Culture Quest. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
  );
}