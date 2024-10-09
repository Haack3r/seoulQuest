import React from 'react'
// import { Link } from 'react-router-dom';
import BasicLayout from '../layouts/BasicLayout';
import ListComponent from '../components/products/ListComponent'
import MainImage from '../layouts/MainImage';
import SeoulCultureQuest from './SeoulCultureQuest';
import BasicMenu from '../components/menus/BasicMenu';
import TourSection from '../layouts/TourSection';
import ProductSection from '../layouts/ProductSection';

const MainPage = () => {
    return (
      <>
    <BasicLayout>
      <MainImage />
      {/* <TourSection />
      <ProductSection /> */}
    </BasicLayout>
    <SeoulCultureQuest />
    </>
  );
}

export default MainPage