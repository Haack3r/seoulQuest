import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTourItemsAsync, postChangeTourAsync } from "../slices/tourSlice"; // Assuming these are defined

const useCustomTour = () => {
  // Safely access tour items, default to an empty array if undefined
  const tourItems = useSelector((state) => state.tour?.items || []);
  console.log("Tour items:", tourItems); // Debug output to check items

  const dispatch = useDispatch();

  // Dispatch to refresh tour items
  const refreshTour = () => {
    dispatch(getTourItemsAsync());
  };

  // Optional: Uncomment if you have a function to change tour items
  // const changeTour = (param) => {
  //   dispatch(postChangeTourAsync(param));
  // };

  return { tourItems, refreshTour };
};

export default useCustomTour;
