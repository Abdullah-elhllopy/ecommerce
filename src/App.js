import { useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation
} from 'react-router-dom'
import Checkout from "./screens/checkout/Checkout";
import  ItemDetails  from "./screens/itemDetails/ItemDetails";
import Home from "./screens/Home/Home";
import Confirmation from "./screens/checkout/Confirmation";
import Navbar from "./screens/global/Navbar";
import CartMenu from "./screens/global/CartMenu";
import Footer from "./screens/global/Footer";
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};
function App() {
  return (
    <div className="app">

      <BrowserRouter>
        <Navbar/> 
         <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home/>} /> 
          <Route path="item/:itemId" element={<ItemDetails/>} /> 
          <Route path="checkout" element={<Checkout/>} /> 
          <Route path="/confirmation" element={<Confirmation/>} /> 
        </Routes>
        <CartMenu/>
        <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
