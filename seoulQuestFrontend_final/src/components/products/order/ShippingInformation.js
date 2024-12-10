import { Info } from "lucide-react";
import React from "react";

const ShippingInformation = ({
  orderInfo,
  isEditing,
  handleChange,
  handleEditModeToggle,
}) => {
  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-700 mb-4 mt-5">Shipping Information</h3>
      <div className="flex items-start space-y-2 flex-col mb-4">
        <label className="flex items-center">
          <input
            type="radio"
            name="editMode"
            checked={!isEditing}
            onChange={handleEditModeToggle}
          />
          <span className="ml-2 text-xs">Existing Shipping Information</span>
        </label>
        <label className="flex items-center">
          <input
            type="radio"
            name="editMode"
            checked={isEditing}
            onChange={handleEditModeToggle}
          />
          <span className="ml-2 text-xs">New Shipping Information</span>
        </label>
      </div>
      <hr className="border-t border-gray-400 my-4" />
      <div className="space-y-3">
        <label className="block text-gray-700 text-lg font-semibold">Recipient Information</label>

        {/* First Name */}
        <div className="items-center relative">
          <label htmlFor="firstname" className="text-gray-600 text-sm font-semibold w-32">
            First Name *
          </label>
          <input
            type="text"
            id="firstname"
            placeholder="First Name"
            required
            className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 mt-1 ${
              orderInfo.firstname === '' ? 'border-red-500 focus:ring-red-500' : 'focus:ring-blue-500'
            }`}
            value={orderInfo.firstname}
            disabled={!isEditing}
            onChange={handleChange}
            name="firstname"
          />
          {orderInfo.firstname === '' && (
            <span className="absolute right-3 top-3 text-red-500 text-sm">
              <Info className="h-6 w-6 pb-3" />
            </span>
          )}
          {orderInfo.firstname === '' && (
            <p className="text-xs text-red-500 mt-1">Enter your first name</p>
          )}
        </div>

        {/* Last Name */}
        <div className="items-center relative">
          <label htmlFor="lastname" className="text-gray-600 text-sm font-semibold w-32">
            Last Name *
          </label>
          <input
            type="text"
            id="lastname"
            placeholder="Last Name"
            required
            className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 mt-1 ${
              orderInfo.lastname === '' ? 'border-red-500 focus:ring-red-500' : 'focus:ring-blue-500'
            }`}
            value={orderInfo.lastname}
            disabled={!isEditing}
            onChange={handleChange}
            name="lastname"
          />
          {orderInfo.lastname === '' && (
            <span className="absolute right-3 top-3 text-red-500 text-sm">
              <Info className="h-6 w-6 pb-3" />
            </span>
          )}
          {orderInfo.lastname === '' && (
            <p className="text-xs text-red-500 mt-1">Enter your last name</p>
          )}
        </div>

        {/* Phone Number */}
        <div className="items-center relative">
          <label htmlFor="phoneNumber" className="text-gray-600 text-sm font-semibold w-32">
            Phone Number *
          </label>
          <p className="text-xs text-gray-500 mb-2">
            Please enter your phone number with dashes (-).
          </p>
          <input
            type="text"
            id="phoneNumber"
            placeholder="Phone Number"
            className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 mt-1 ${
              orderInfo.phoneNumber === ''
                ? 'border-red-500 focus:ring-red-500'
                : 'focus:ring-blue-500'
            }`}
            value={orderInfo.phoneNumber}
            disabled={!isEditing}
            onChange={handleChange}
            name="phoneNumber"
            required
          />
          {orderInfo.phoneNumber === '' && (
            <span className="absolute right-3 top-3 text-red-500 text-sm">
              <Info className="h-6 w-6 pb-3" />
            </span>
          )}
          {orderInfo.phoneNumber === '' && (
            <p className="text-xs text-red-500 mt-1">Enter your phone number</p>
          )}
          <p className="text-xs text-gray-600 flex items-center mt-2">
            We will contact you only regarding essential updates or changes to your shipping information.
          </p>
        </div>
      </div>

      <hr className="border-t border-gray-400 my-2" />
      <div className="space-y-2 mb-5">
        <label className="block text-gray-600 font-semibold">Address *</label>

        {/* Zip Code */}
        <div className="items-center relative">
          <input
            type="text"
            placeholder="Zip Code"
            className={`p-2 border rounded-md w-full focus:outline-none focus:ring-2 mt-1 ${
              orderInfo.zipcode === '' ? 'border-red-500 focus:ring-red-500' : 'focus:ring-blue-500'
            }`}
            value={orderInfo.zipcode}
            disabled={!isEditing}
            onChange={handleChange}
            name="zipcode"
          />
          {orderInfo.zipcode === '' && (
            <p className="text-xs text-red-500 mt-1">Enter your zip code</p>
          )}
        </div>

        {/* Street */}
        <div className="items-center relative">
          <input
            type="text"
            placeholder="Street"
            className={`p-2 border rounded-md w-full focus:outline-none focus:ring-2 mt-1 ${
              orderInfo.street === '' ? 'border-red-500 focus:ring-red-500' : 'focus:ring-blue-500'
            }`}
            value={orderInfo.street}
            disabled={!isEditing}
            onChange={handleChange}
            name="street"
          />
          {orderInfo.street === '' && (
            <p className="text-xs text-red-500 mt-1">Enter your street</p>
          )}
        </div>

        {/* City */}
        <div className="items-center relative">
          <input
            type="text"
            placeholder="City"
            className={`p-2 border rounded-md w-full focus:outline-none focus:ring-2 mt-1 ${
              orderInfo.city === '' ? 'border-red-500 focus:ring-red-500' : 'focus:ring-blue-500'
            }`}
            value={orderInfo.city}
            disabled={!isEditing}
            onChange={handleChange}
            name="city"
          />
          {orderInfo.city === '' && (
            <p className="text-xs text-red-500 mt-1">Enter your city</p>
          )}
        </div>

        {/* State */}
        <div className="items-center relative">
          <input
            type="text"
            placeholder="State"
            className={`p-2 border rounded-md w-full focus:outline-none focus:ring-2 mt-1 ${
              orderInfo.state === '' ? 'border-red-500 focus:ring-red-500' : 'focus:ring-blue-500'
            }`}
            value={orderInfo.state}
            disabled={!isEditing}
            onChange={handleChange}
            name="state"
          />
          {orderInfo.state === '' && (
            <p className="text-xs text-red-500 mt-1">Enter your state</p>
          )}
        </div>

        {/* Country */}
        <div className="items-center relative">
          <input
            type="text"
            placeholder="Country"
            className={`p-2 border rounded-md w-full focus:outline-none focus:ring-2 mt-1 ${
              orderInfo.country === '' ? 'border-red-500 focus:ring-red-500' : 'focus:ring-blue-500'
            }`}
            value={orderInfo.country}
            disabled={!isEditing}
            onChange={handleChange}
            name="country"
          />
          {orderInfo.country === '' && (
            <p className="text-xs text-red-500 mt-1">Enter your country</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShippingInformation;
