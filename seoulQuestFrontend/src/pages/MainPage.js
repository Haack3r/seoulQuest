import React from 'react'
// import { Link } from 'react-router-dom';
import BasicLayout from '../layouts/BasicLayout';
import ListComponent from '../components/products/ListComponent'
import MainImage from '../layouts/MainImage';
import SeoulCultureQuest from './SeoulCultureQuest';
import BasicMenu from '../components/menus/BasicMenu';

const MainPage = () => {
    return (
        <>
            <SeoulCultureQuest />
            {/* <BasicMenu /> */}
            </>
    // <BasicLayout>
    //   <MainImage />
    // </BasicLayout>

  );
}

export default MainPage