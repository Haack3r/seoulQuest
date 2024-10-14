import React from 'react'
<<<<<<< HEAD
import BasicLayout from '../layouts/BasicLayout';
import MainImage from '../layouts/MainImage';
import SeoulCultureQuest from './SeoulCultureQuest';
=======
// import { Link } from 'react-router-dom';
import BasicLayout from '../layouts/BasicLayout';
import ListComponent from '../components/products/ListComponent'
import MainImage from '../layouts/MainImage';
import SeoulCultureQuest from './SeoulCultureQuest';
import BasicMenu from '../components/menus/BasicMenu';
>>>>>>> origin/hyein
import TourSection from '../layouts/TourSection';
import ProductSection from '../layouts/ProductSection';

const MainPage = () => {
<<<<<<< HEAD
  return (
    <>
      <BasicLayout>
        <MainImage />
        <TourSection />
        <ProductSection />
      </BasicLayout>
      <SeoulCultureQuest />
=======
    return (
      <>
    <BasicLayout>
      <MainImage />
      <TourSection />
      <ProductSection />
    </BasicLayout>
    <SeoulCultureQuest />
>>>>>>> origin/hyein
    </>
  );
}

export default MainPage