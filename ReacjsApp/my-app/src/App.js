// src/App.js
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
import { MyDispatchContext, MyUserContext } from "./Config/contexts";
import ProductDetails from "./Components/productdetails";
import Register from "./Components/register";
import BlogDetail from "./Components/blogdetail";
import { CartProvider } from "./Config/CartContext";
import PaymentReturn from "./Components/paymenreturn";
import Orders from "./Components/orders";
import OrdersDetails from "./Components/ordersdetails";
import ForgotPassword from "./Components/forgotpassword";

function App() {
  const [user, dispatch] = useReducer(MyUserReducer, null);

  return (
    <div className="App">
      <MyUserContext.Provider value={{ user }}>
        <CartProvider>
          <MyDispatchContext.Provider value={dispatch}>
            <BrowserRouter>
              <Header />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/blogs" element={<Blog />} />
                <Route
                  path="/blogs/:blog_id/info-details"
                  element={<BlogDetail />}
                />
                <Route path="/contact" element={<Contact />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
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
                <Route path="/payment-return" element={<PaymentReturn />} />
                <Route path="/users/:user_id/orders" element={<Orders />} />
                <Route
                  path="/users/:user_id/orders/:order_id/list-order-details"
                  element={<OrdersDetails />}
                />
                <Route
                  path="/users/change-password"
                  element={<ForgotPassword />}
                />
              </Routes>
              <Footer />
            </BrowserRouter>
          </MyDispatchContext.Provider>
        </CartProvider>
      </MyUserContext.Provider>
    </div>
  );
}

export default App;
