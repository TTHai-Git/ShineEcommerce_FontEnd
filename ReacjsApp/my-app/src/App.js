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

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/listproduct" element={<ListProduct />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/payment" element={<Payment />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
