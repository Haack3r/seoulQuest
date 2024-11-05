import { RouterProvider } from 'react-router-dom';
import root from './router/root';
import TouristPhotoGallery from './components/TouristPhotoGallery';
// import TourMap from './components/TourMap';

function App() {
    return (
      <RouterProvider router={root}></RouterProvider>
       
        // <TouristPhotoGallery />
    );
  }
  export default App;

