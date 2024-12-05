import React from 'react';

const CookiePolicy = () => {
  return (
    <div className="p-6">
      <h1 className="text-center text-2xl font-bold text-gray-800 mb-4">Cookie Policy</h1>
      <p className="text-gray-700 mb-4">
        At Seoul Culture Quest, we use cookies to enhance your experience on our website. This Cookie Policy explains what cookies are, how we use them, and how you can manage them.
      </p>

      <h2 className="text-lg font-semibold text-gray-800 mb-2">What are Cookies?</h2>
      <p className="text-gray-700 mb-4">
        Cookies are small text files that are placed on your device (computer, smartphone, or tablet) when you visit a website. They help us understand your preferences, improve site functionality, and offer a more personalized experience.
      </p>

      <h2 className="text-lg font-semibold text-gray-800 mb-2">How We Use Cookies</h2>
      <ul className="list-disc list-inside text-gray-700 mb-4">
        <li>
          <strong>Essential Cookies:</strong> These cookies are necessary for the website to function and cannot be switched off in our systems.
        </li>
        <li>
          <strong>Analytics Cookies:</strong> We use these cookies to analyze site usage and performance.
        </li>
        <li>
          <strong>Preference Cookies:</strong> These cookies store your preferences, such as language and location, to provide a better user experience.
        </li>
        <li>
          <strong>Marketing Cookies:</strong> These cookies track your browsing habits to deliver relevant advertisements.
        </li>
      </ul>

      <h2 className="text-lg font-semibold text-gray-800 mb-2">Managing Cookies</h2>
      <p className="text-gray-700 mb-4">
        You can manage or delete cookies through your browser settings. Please note that disabling certain cookies may affect the functionality of our website.
      </p>

      <h2 className="text-lg font-semibold text-gray-800 mb-2">Contact Us</h2>
      <p className="text-gray-700">
        If you have any questions about our Cookie Policy, feel free to contact us at{' '}
        <a href="mailto:support@seoulculturequest.com" className="text-blue-500 underline">
          support@seoulculturequest.com
        </a>.
      </p>
    </div>
  );
};

export default CookiePolicy;
