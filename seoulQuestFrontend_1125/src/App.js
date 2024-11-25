import { RouterProvider } from 'react-router-dom';
import root from './router/root';
import ScrollTopButton from './components/common/ScrollTopButton';
// import PhotoGallery from './components/PhotoGallery';
// import TourMap from './components/TourMap';

function App() {
    return (
      <>
      <RouterProvider router={root}></RouterProvider>
         {/* <TourMap/> */}
         {/* <PhotoGallery /> */}
        <ScrollTopButton/>
      </>
    );
  }
  export default App;

