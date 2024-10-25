import "./App.css";
import Header from "./Components/header";
import Footer from "./Components/footer";
import Home from "./Components/home";
import About from "./Components/about";
import Contact from "./Components/contact";
import Blog from "./Components/blog";
import ListProduct from "./Components/listproduct";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Components/login";
import Cart from "./Components/cart";
import Payment from "./Components/payment";
import { useReducer } from "react";
import { MyUserReducer } from "./Config/reducers";
import { MyUserContext } from "./Config/contexts";
import ProductDetails from "./Components/productdetails";

function App() {
  const [user, dispatch] = useReducer(MyUserReducer, null);

  return (
    <div className="App">
      <MyUserContext.Provider value={{ user, dispatch }}>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="categories/:category_id/list-product"
              element={<ListProduct />}
            />
            <Route
              path="products/:selected_product_id/info-details"
              element={<ProductDetails />}
            />
            <Route path="/cart" element={<Cart />} />
            <Route path="/payment" element={<Payment />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </MyUserContext.Provider>
    </div>
  );
}

export default App;
