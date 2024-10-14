import React from 'react'
import BasicLayout from '../layouts/BasicLayout';
import MainImage from '../layouts/MainImage';
import SeoulCultureQuest from './SeoulCultureQuest';
import TourSection from '../layouts/TourSection';
import ProductSection from '../layouts/ProductSection';

const MainPage = () => {
  return (
    <>
      <BasicLayout>
        <MainImage />
        <TourSection />
        <ProductSection />
      </BasicLayout>
      <SeoulCultureQuest />
    </>
  );
}

export default MainPage