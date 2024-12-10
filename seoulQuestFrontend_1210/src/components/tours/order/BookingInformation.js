import React from 'react';
import { Info } from 'lucide-react';

const BookingInformation = ({ bookInfo, isEditing, handleChange, handleEditModeToggle }) => {
  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-700 mb-4 mt-5">Booking Information</h3>
      <div className="flex items-start space-y-2 flex-col mb-4">
        <label className="flex items-center">
          <input
            type="radio"
            name="editMode"
            checked={!isEditing}
            onChange={handleEditModeToggle}
          />
          <span className="ml-2 text-xs">Existing Booking Information</span>
        </label>
        <label className="flex items-center">
          <input
            type="radio"
            name="editMode"
            checked={isEditing}
            onChange={handleEditModeToggle}
          />
          <span className="ml-2 text-xs">New Booking Information</span>
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
              bookInfo.firstname === '' ? 'border-red-500 focus:ring-red-500' : 'focus:ring-blue-500'
            }`}
            value={bookInfo.firstname}
            disabled={!isEditing}
            onChange={handleChange}
            name="firstname"
          />
          {bookInfo.firstname === '' && (
            <span className="absolute right-3 top-3 text-red-500 text-sm">
              <Info className="h-6 w-6 pb-3" />
            </span>
          )}
          {bookInfo.firstname === '' && (
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
              bookInfo.lastname === '' ? 'border-red-500 focus:ring-red-500' : 'focus:ring-blue-500'
            }`}
            value={bookInfo.lastname}
            disabled={!isEditing}
            onChange={handleChange}
            name="lastname"
          />
          {bookInfo.lastname === '' && (
            <span className="absolute right-3 top-3 text-red-500 text-sm">
              <Info className="h-6 w-6 pb-3" />
            </span>
          )}
          {bookInfo.lastname === '' && (
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
              bookInfo.phoneNumber === ''
                ? 'border-red-500 focus:ring-red-500'
                : 'focus:ring-blue-500'
            }`}
            value={bookInfo.phoneNumber}
            disabled={!isEditing}
            onChange={handleChange}
            name="phoneNumber"
            required
          />
          {bookInfo.phoneNumber === '' && (
            <span className="absolute right-3 top-3 text-red-500 text-sm">
              <Info className="h-6 w-6 pb-3" />
            </span>
          )}
          {bookInfo.phoneNumber === '' && (
            <p className="text-xs text-red-500 mt-1">Enter your phone Number</p>
          )}
          <p className="text-xs text-gray-600 flex items-center mt-2">
            We will contact you only regarding essential updates or changes to your reservation.
          </p>
        </div>
      </div>

      <hr className="border-t border-gray-400 my-2" />
      <div className="space-y-2 mb-5">
        <label className="block text-gray-600 font-semibold">Country</label>
        <input
          type="text"
          id="country"
          placeholder="Country"
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 mt-2 focus:ring-blue-500"
          value={bookInfo.country}
          disabled={!isEditing}
          onChange={handleChange}
          name="country"
        />
        <p className="text-xs text-gray-600 flex items-center">
          If you enter your country, we will provide you with an audio guide.
        </p>
      </div>
    </div>
  );
};

export default BookingInformation;
