import React from "react";
import "../App.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

const ProcessSteps = () => {
  return (
    <div className="process-container mt-20 text-center py-10">
      <div className="process-step hover-trigger">
        <div className="process-connector bg-gray-300"></div>
        <div className="process-step-icon text-3xl text-gray-400">
          <i className="fa-solid fa-earth-americas"></i>
        </div>
        <div className="process-step-title text-sm font-semibold uppercase tracking-wide text-gray-700 mt-2">
          Global Reach
        </div>
        <p className="process-description text-xs text-gray-500">
          Connecting cultures through curated products.
        </p>
      </div>

      <div className="process-step hover-trigger">
        <div className="process-connector bg-gray-300"></div>
        <div className="process-step-icon text-3xl text-gray-400">
          <i className="fa-solid fa-heart"></i>
        </div>
        <div className="process-step-title text-sm font-semibold uppercase tracking-wide text-gray-700 mt-2">
          Crafted with Care
        </div>
        <p className="process-description text-xs text-gray-500">
          Each piece reflects our commitment to quality.
        </p>
      </div>

      <div className="process-step hover-trigger">
        <div className="process-connector bg-gray-300"></div>
        <div className="process-step-icon text-3xl text-gray-400">
          <i className="fa-solid fa-gift"></i>
        </div>
        <div className="process-step-title text-sm font-semibold uppercase tracking-wide text-gray-700 mt-2">
          Secure Packaging
        </div>
        <p className="process-description text-xs text-gray-500">
          Packed with precision, delivered with love.
        </p>
      </div>

      <div className="process-step hover-trigger">
        <div className="process-connector bg-gray-300"></div>
        <div className="process-step-icon text-3xl text-gray-400">
          <i className="fa-solid fa-truck-ramp-box"></i>
        </div>
        <div className="process-step-title text-sm font-semibold uppercase tracking-wide text-gray-700 mt-2">
          Timely Delivery
        </div>
        <p className="process-description text-xs text-gray-500">
          Ensuring your order arrives as expected.
        </p>
      </div>

      <div className="process-step hover-trigger">
        <div className="process-connector bg-gray-300"></div>
        <div className="process-step-icon text-3xl text-gray-400">
          <i className="fa-solid fa-hand-holding-heart"></i>
        </div>
        <div className="process-step-title text-sm font-semibold uppercase tracking-wide text-gray-700 mt-2">
          Delivered with Love
        </div>
        <p className="process-description text-xs text-gray-500">
          From our hearts to your doorstep.
        </p>
      </div>
    </div>
  );
};

export default ProcessSteps;
