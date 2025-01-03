import React, { useContext } from "react";
import "../Template/shine/dist/css/core.min.css";
import "../Template/shine/dist/css/main.min.css";
import { Link } from "react-router-dom";
import { FaShoppingBasket, FaSignInAlt, FaTrash } from "react-icons/fa";
import { useCart } from "../Config/CartContext";
import { formatCurrency } from "../Convert/formatcurrency";
import { MyUserContext } from "../Config/contexts";
import "../Template/shine/dist/css/CommentForm.css";

function Cart() {
  const { cartItems, removeItem, decreaseQuantity, increaseQuantity } =
    useCart();

  const { user } = useContext(MyUserContext);
  const handleRemoveItem = (id) => {
    removeItem(id);
  };

  // Calculate the subtotal for display
  const calculateSubtotal = (item) => {
    const discount =
      (item.discount_product / 100) * item.unit_price_product * item.quantity;
    return item.unit_price_product * item.quantity - discount;
  };

  // Calculate the total amount
  const calculateTotalAmount = () => {
    return cartItems.reduce((total, item) => {
      const discount =
        (item.discount_product / 100) * item.unit_price_product * item.quantity;
      const itemTotal = item.unit_price_product * item.quantity - discount;
      return total + itemTotal;
    }, 0);
  };

  return (
    <main>
      <section className="the-shine-shop-cart py-6">
        <div className="container">
          <h1 className="shine-title">Giỏ hàng</h1>
          <div className="main-table">
            <table>
              <thead>
                <tr>
                  <th>Sản Phẩm</th>
                  <th>Đơn Giá</th>
                  <th>Số lượng</th>
                  <th>Giảm giá</th>
                  <th>Thành tiền</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((cartItem) => (
                  <tr key={cartItem.id_product}>
                    <td className="name">
                      <div className="image">
                        <img
                          src={cartItem.image_product}
                          alt={cartItem.name_product}
                        />
                      </div>
                      <div className="name-product">
                        <h3>{cartItem.name_product}</h3>

                        <div className="delete-product">
                          <FaTrash
                            onClick={() =>
                              handleRemoveItem(cartItem.id_product)
                            }
                            style={{
                              color: "red",
                              cursor: "pointer",
                              fontSize: "1.2rem",
                            }}
                            title={`Delete product ${cartItem.id_product}`}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="price">
                      {formatCurrency(`${cartItem.unit_price_product}`)}
                    </td>
                    <td className="amount">
                      <div className="quantity-box">
                        <button
                          onClick={() => decreaseQuantity(cartItem.id_product)}
                        >
                          -
                        </button>
                        <input type="text" value={cartItem.quantity} readOnly />
                        <button
                          onClick={() => increaseQuantity(cartItem.id_product)}
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td className="price">
                      {cartItem.discount_product} % = -
                      {formatCurrency(
                        (cartItem.discount_product / 100) *
                          cartItem.unit_price_product *
                          cartItem.quantity
                      )}
                    </td>
                    <td className="total">
                      + {formatCurrency(calculateSubtotal(cartItem))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="main-total-amount">
            <div className="box-amount">
              <div className="totalamount">
                <p>Cần thanh toán</p>
                <span className="total">
                  {formatCurrency(calculateTotalAmount())}
                </span>
              </div>
            </div>
          </div>

          <div className="order-now">
            <button>
              {user ? (
                <>
                  <Link to="/payment">
                    <FaShoppingBasket /> Tiến Hành Đặt Hàng
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/login" state={{ from: "/cart" }}>
                    <FaSignInAlt /> Vui Lòng Đăng Nhập Để Tiến Hành Đặt Hàng Và
                    Thanh Toán
                  </Link>
                </>
              )}
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Cart;
