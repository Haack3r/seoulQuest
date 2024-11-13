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
      <div className="space-y-4">
        <label className="block text-gray-600 font-semibold">Recipient Information</label>
        <input
          type="text"
          placeholder="First Name"
          className={`w-full p-3 border rounded-md ${!isEditing ? "bg-gray-100" : ""}`}
          value={orderInfo.firstname}
          disabled={!isEditing}
          onChange={handleChange}
          name="firstname"
        />
        <input
          type="text"
          placeholder="Last Name"
          className={`w-full p-3 border rounded-md ${!isEditing ? "bg-gray-100" : ""}`}
          value={orderInfo.lastname}
          disabled={!isEditing}
          onChange={handleChange}
          name="lastname"
        />
        <input
          type="text"
          placeholder="Contact Number"
          className={`w-full p-3 border rounded-md ${!isEditing ? "bg-gray-100" : ""}`}
          value={orderInfo.phoneNumber}
          disabled={!isEditing}
          onChange={handleChange}
          name="phoneNumber"
        />
        <p className="text-xs ml-1">Please enter your phone number with dashes(-).</p>
      </div>
      <hr className="border-t border-gray-400 my-4" />
      <div className="space-y-4">
        <label className="block text-gray-600 mb-2 font-semibold">Address</label>
        <div className="flex space-x-2">
          <input
            type="text"
            placeholder="Zip Code"
            className={`p-3 border rounded-md w-2/3 ${!isEditing ? "bg-gray-100" : ""}`}
            value={orderInfo.zipcode}
            disabled={!isEditing}
            onChange={handleChange}
            name="zipcode"
          />
        </div>
        <input
          type="text"
          placeholder="Street"
          className={`w-full p-3 border rounded-md mt-2 ${!isEditing ? "bg-gray-100" : ""}`}
          value={orderInfo.street}
          disabled={!isEditing}
          onChange={handleChange}
          name="street"
        />
        <input
          type="text"
          placeholder="City"
          className={`w-full p-3 border rounded-md mt-2 ${!isEditing ? "bg-gray-100" : ""}`}
          value={orderInfo.city}
          disabled={!isEditing}
          onChange={handleChange}
          name="city"
        />
        <input
          type="text"
          placeholder="State"
          className={`w-full p-3 border rounded-md mt-2 ${!isEditing ? "bg-gray-100" : ""}`}
          value={orderInfo.state}
          disabled={!isEditing}
          onChange={handleChange}
          name="state"
        />
        <input
          type="text"
          placeholder="Country"
          className={`w-full p-3 border rounded-md mt-2 ${!isEditing ? "bg-gray-100" : ""}`}
          value={orderInfo.country}
          disabled={!isEditing}
          onChange={handleChange}
          name="country"
        />
      </div>
    </div>
  );
};

export default ShippingInformation;
