import React from "react";

const TermsOfSale = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6 lg:p-12">
      <div className="max-w-5xl mx-auto bg-white p-8 shadow-md rounded-lg">
        <h1 className="text-center text-2xl lg:text-4xl font-bold text-gray-800 mb-6">
          Terms of Sale
        </h1>
        <p className="text-gray-700 mb-4">
          Welcome to our Terms of Sale page. By purchasing from us, you agree
          to the terms and conditions outlined below.
        </p>

        <div className="space-y-8">
          {/* Section 1 */}
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              1. Introduction
            </h2>
            <p className="text-gray-600">
              These terms and conditions govern the sale of goods and services
              by our company. Please read them carefully before making a
              purchase.
            </p>
          </div>

          {/* Section 2 */}
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              2. Pricing and Payment
            </h2>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>
                All prices are displayed in your local currency and include
                applicable taxes unless stated otherwise.
              </li>
              <li>Payment must be made in full at the time of purchase.</li>
              <li>
                We accept various payment methods, including credit cards,
                debit cards, and online payment gateways.
              </li>
            </ul>
          </div>

          {/* Section 3 */}
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              3. Shipping and Delivery
            </h2>
            <p className="text-gray-600">
              We strive to deliver your order promptly. Delivery times may vary
              based on your location and selected shipping method. Please
              review our shipping policy for more details.
            </p>
          </div>

          {/* Section 4 */}
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              4. Returns and Refunds
            </h2>
            <p className="text-gray-600">
              If you are not satisfied with your purchase, you may request a
              return or refund within 30 days of receiving your order. For more
              information, please review our return policy.
            </p>
          </div>

          {/* Section 5 */}
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              5. Contact Information
            </h2>
            <p className="text-gray-600">
              If you have any questions or concerns about our Terms of Sale,
              please contact us at:
            </p>
            <p className="text-gray-600 mt-2">
              Email: <a href="mailto:support@example.com" className="text-blue-500 underline">support@example.com</a>
            </p>
            <p className="text-gray-600">
              Phone: <a href="tel:+1234567890" className="text-blue-500 underline">+1 234 567 890</a>
            </p>
          </div>
        </div>

        <div className="mt-8 text-gray-500 text-sm">
          <p>
            Last Updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TermsOfSale;
