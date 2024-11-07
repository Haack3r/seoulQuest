import BasicMenu from "../components/menus/BasicMenu";
import CartComponent from "../components/menus/CartComponent";
import BodyLayout from "./MainImage";
import Footer from "./Footer";

const BasicLayout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen"> {/* Flex column layout with minimum height */}
      <BasicMenu />
      <main className="flex-grow"> {/* This will grow to fill available space */}
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default BasicLayout;
