import { RouterProvider } from 'react-router-dom';
import root from './router/root';
import TourMap from './components/TourMap';

function App() {
    return (
      <RouterProvider router={root}></RouterProvider>
      // <TourMap/>
    );
  }
  export default App;

