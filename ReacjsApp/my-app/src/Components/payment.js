import React, { useContext, useEffect, useState } from "react";
import "../Template/shine/dist/css/core.min.css";
import "../Template/shine/dist/css/main.min.css";
import shipment_1 from "../Template/shine/dist/img/shipment-1.png";
import shipment_2 from "../Template/shine/dist/img/shipment-2.png";
import shipment_3 from "../Template/shine/dist/img/shipment-3.png";
import shipment_4 from "../Template/shine/dist/img/shipment-4.png";
import { FaShoppingBasket } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";
import { useCart } from "../Config/CartContext";
import { formatCurrency } from "../Convert/formatcurrency";
import { MyUserContext } from "../Config/contexts";
import APIs, { authApi, endpoints } from "../Config/APIs";
function Payment() {
  // const [userInfo, setUserInfo] = useState({
  //   name: "",
  //   email: "",
  //   address: "",
  //   phone: "",
  // });

  const { cartItems } = useCart();

  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [distance, setDistance] = useState(0);
  const [addressShop, setAddressShop] = useState(
    "198 Đ. Hoàng Văn Thụ, Phường 8, Phú Nhuận, Hồ Chí Minh, Việt Nam"
  );
  const [discountVoucher, setDiscountVoucher] = useState(0);
  const SHIPPING_RATE_PER_KM = 1500;
  const { user } = useContext(MyUserContext);

  // Calculate the subtotal for display
  const calculateSubtotal = (item) => {
    const discount =
      (item.discount_product / 100) * item.present_price * item.quantity;
    return item.present_price * item.quantity - discount;
  };

  // Calculate the total amount
  const calculateTotalAmount = () => {
    return cartItems.reduce((total, item) => {
      const discount =
        (item.discount_product / 100) * item.present_price * item.quantity;
      const itemTotal = item.present_price * item.quantity - discount;
      return total + itemTotal;
    }, 0);
  };

  const [order, setOrder] = useState({
    user_id: user.id ? user.id.toString() : user.uid.toString(),
    city_id: 0,
    city: "",

    district_id: 0,
    district: "",

    ward_id: 0,
    ward: "",

    note: "",

    payment_type: "",
    shipment_type: "",

    shipment_address: "",

    temp_total_amount: calculateTotalAmount(),
    vat_price: (calculateTotalAmount() * 10) / 100,
    shipping_fee: SHIPPING_RATE_PER_KM * distance,
    promotion_ticket_code: "",
    total_amount:
      calculateTotalAmount() -
      discountVoucher +
      (calculateTotalAmount() * 10) / 100,
    termsAccepted: false,
  });

  useEffect(() => {
    setOrder((prev) => ({
      ...prev,
      temp_total_amount: calculateTotalAmount().toString(),
      vat_price: (calculateTotalAmount() * 0.1).toString(),
      shipping_fee:
        order.shipment_type === "Nhận tại cửa hàng"
          ? "0"
          : (SHIPPING_RATE_PER_KM * distance).toString(),
      total_amount:
        order.shipment_type === "Nhận tại cửa hàng"
          ? (
              calculateTotalAmount() -
              discountVoucher +
              (calculateTotalAmount() * 10) / 100
            ).toString()
          : (
              calculateTotalAmount() -
              discountVoucher +
              (calculateTotalAmount() * 10) / 100 +
              distance * SHIPPING_RATE_PER_KM
            ).toString(),
    }));
  }, [cartItems, distance, order.shipment_type, discountVoucher]);

  useEffect(() => {
    // Fetch cities on mount
    axios
      .get("https://vapi.vnappmob.com/api/province/")
      .then((response) => setCities(response.data.results))
      .catch((error) => console.error("Error fetching cities:", error));
  }, []);

  const handleCityChange = (e) => {
    const selectedCityId = e.target.value;
    const selectedCity = cities.find(
      (city) => city.province_id === selectedCityId
    );

    setOrder({
      ...order,
      city_id: selectedCity.province_id,
      city: selectedCity.province_name, // Save city name for display
      district: "",
      ward: "",
    });

    // Fetch districts for the selected city
    axios
      .get(`https://vapi.vnappmob.com/api/province/district/${selectedCityId}`)
      .then((response) => setDistricts(response.data.results))
      .catch((error) => {
        console.error("Error fetching districts:", error);
        setDistricts([]); // Clear districts if there's an error
      });
  };

  const handleDistrictChange = (e) => {
    const selectedDistrictId = e.target.value;
    const selectedDistrict = districts.find(
      (district) => district.district_id === selectedDistrictId
    );

    setOrder({
      ...order,
      district_id: selectedDistrict.district_id,
      district: selectedDistrict.district_name,
      ward: "",
    });

    // Fetch wards for the selected district
    axios
      .get(`https://vapi.vnappmob.com/api/province/ward/${selectedDistrictId}`)
      .then((response) => setWards(response.data.results))
      .catch((error) => {
        console.error("Error fetching wards:", error);
        setWards([]); // Clear wards if there's an error
      });
  };

  const handleWardChange = (e) => {
    const selectedWardId = e.target.value;
    const selectedWard = wards.find((ward) => ward.ward_id === selectedWardId);

    setOrder({
      ...order,
      ward_id: selectedWard.ward_id,
      ward: selectedWard.ward_name,
    });
  };

  const handleSubmit = async (order, cartItems) => {
    console.log(order);

    // Check if the terms are accepted
    if (!order.termsAccepted) {
      alert("Please accept the terms and conditions.");
      return;
    }

    // Initialize the orderDetails array
    const orderDetails = [];

    // Loop through the cart items and push details to orderDetails
    for (let index = 0; index < cartItems.length; index++) {
      orderDetails.push({
        id_product: cartItems[index].id_product.toString(),
        quantity: cartItems[index].quantity, // Correct the index here
        total_amount: calculateSubtotal(cartItems[index]).toString(), // Ensure this function is defined
        discount_price: (
          (cartItems[index].discount_product / 100) *
          cartItems[index].present_price *
          cartItems[index].quantity
        ).toString(),
      });
    }

    // Send the order details to the API
    try {
      const { data } = await authApi(user.access_token).post(
        endpoints["user-payment"],
        {
          // headers: {
          //   "Content-Type": "multipart/form-data",
          // },
          order: order,
          order_details: orderDetails,
        }
      );

      if (data && data.message) {
        alert(data.message);
      }
    } catch (error) {
      alert("An error occurred: " + error.message);
    }
  };

  const handleValidatePromotionTicketCode = async (
    promotion_ticket_code,
    total_amount_order
  ) => {
    console.log(promotion_ticket_code);
    console.log(total_amount_order);
    const url = `${endpoints["validate-promotion-ticket"]}?promotion_ticket_code=${promotion_ticket_code}&total_amount_order=${total_amount_order}`;
    const { data } = await authApi(user.access_token).get(url);
    console.log(data);
    if (data.discount_voucher) {
      setDiscountVoucher(data.discount_voucher);
    } else {
      setDiscountVoucher(0);
    }
    alert(data.message);
  };

  const calculateDistance = async (originAddress, destinationAddress) => {
    try {
      const mapboxToken = process.env.REACT_APP_MapToken;

      // Step 1: Geocode both addresses in parallel
      const [originResponse, destinationResponse] = await Promise.all([
        axios.get(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
            originAddress
          )}.json`,
          {
            params: { access_token: mapboxToken },
          }
        ),
        axios.get(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
            destinationAddress
          )}.json`,
          {
            params: { access_token: mapboxToken },
          }
        ),
      ]);

      // Check if both geocoding responses have valid coordinates
      const originCoordinates = originResponse.data.features[0]?.center;
      const destinationCoordinates =
        destinationResponse.data.features[0]?.center;

      if (!originCoordinates || !destinationCoordinates) {
        console.error("Lỗi: Tọa độ điểm đi hoặc điểm đến không hợp lệ");
        return null;
      }

      // Step 2: Calculate distance using Directions API
      const directionsResponse = await axios.get(
        `https://api.mapbox.com/directions/v5/mapbox/driving/${originCoordinates.join(
          ","
        )};${destinationCoordinates.join(",")}`,
        {
          params: { access_token: mapboxToken, geometries: "geojson" },
        }
      );

      const distanceInKilometers =
        (directionsResponse.data.routes[0]?.distance || 0) / 1000; // Convert to kilometers
      console.log(`Distance: ${distanceInKilometers.toFixed(2)} km`);
      if (distanceInKilometers <= 0) {
        alert("ĐỊA CHỈ GIAO HÀNG KHÔNG HỢP LỆ! VUI LÒNG HÃY KIỂM TRA LẠI!!!");
      } else {
        setDistance(distanceInKilometers.toFixed(2));
      }
    } catch (error) {
      console.error("Error calculating distance:", error);
      return null;
    }
  };

  const handelPaymenByVNPay = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/vnpay/create-payment-url",
        {
          amount: order.total_amount, // Payment amount in VND
          orderId: Date.now().toString(),
        }
      );
      window.location.href = response.data.paymentUrl;
      handleSubmit(order, cartItems);
    } catch (error) {
      console.error("Payment error:", error);
    }
  };

  return (
    <main>
      <section className="shipment-detail py-5">
        <div className="container">
          <h1 className="shine-title">Thông tin giao hàng</h1>
          <div className="row">
            <div className="col-lg-7">
              <div className="box-wrapper">
                <div className="heading">Thông tin cơ bản</div>
                <div className="content">
                  <div className="form-group">
                    <div className="input-group">
                      <input
                        id="sex-1"
                        type="radio"
                        name="sex"
                        checked={user.sex ? true : false}
                      />
                      <label htmlFor="sex-1">Anh</label>
                    </div>
                    <div className="input-group">
                      <input
                        id="sex-2"
                        type="radio"
                        name="sex"
                        checked={!user.sex ? true : false}
                      />
                      <label htmlFor="sex-2">Chị</label>
                    </div>
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      placeholder="Họ tên"
                      value={user.last_name + " " + user.first_name}
                    />
                  </div>
                  <div className="form-group">
                    <input type="text" placeholder="Email" value={user.email} />
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      placeholder="Địa chỉ"
                      value={user.address}
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      placeholder="Số điện thoại"
                      value={user.phone}
                    />
                  </div>
                </div>
              </div>
              <div className="box-wrapper">
                <div className="heading">Địa chỉ giao hàng</div>
                <div className="content">
                  <div className="form-group">
                    <select
                      name="city"
                      value={order.city_id}
                      onChange={handleCityChange}
                    >
                      <option value="">Tỉnh/ Thành phố</option>
                      {cities.map((city) => (
                        <option key={city.province_id} value={city.province_id}>
                          {city.province_name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <select
                      name="district"
                      value={order.district_id}
                      onChange={handleDistrictChange}
                      disabled={!order.city}
                    >
                      <option value="">Quận/ Huyện</option>
                      {districts.map((district) => (
                        <option
                          key={district.district_id}
                          value={district.district_id}
                        >
                          {district.district_name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <select
                      name="ward"
                      value={order.ward_id}
                      onChange={handleWardChange}
                      disabled={!order.district}
                    >
                      <option value="">Phường/ Xã</option>
                      {wards.map((ward) => (
                        <option key={ward.ward_id} value={ward.ward_id}>
                          {ward.ward_name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <textarea
                      name="notes"
                      placeholder="Địa chỉ đầy đủ"
                      value={order.shipment_address}
                      onChange={(e) =>
                        setOrder((prev) => ({
                          ...prev,
                          shipment_address: e.target.value,
                        }))
                      }
                    ></textarea>
                  </div>
                  <div className="form-group">
                    <textarea
                      name="notes"
                      placeholder="Ghi chú khác"
                      value={order.note}
                      onChange={(e) =>
                        setOrder((prev) => ({
                          ...prev,
                          note: e.target.value,
                        }))
                      }
                    ></textarea>
                  </div>
                </div>
                <button
                  onClick={() =>
                    calculateDistance(addressShop, order.shipment_address)
                  }
                >
                  Xác nhận địa chỉ giao hàng
                </button>
              </div>
              <div className="box-wrapper">
                <div className="heading">Phương thức thanh toán</div>
                <div className="content">
                  <div className="form-group method">
                    <input
                      id="payment1"
                      type="radio"
                      name="payment_type"
                      value="Thanh toán bằng thẻ ATM nội địa"
                      checked={
                        order.payment_type === "Thanh toán bằng thẻ ATM nội địa"
                      }
                      onChange={(e) =>
                        setOrder((prev) => ({
                          ...prev,
                          payment_type: e.target.value,
                        }))
                      }
                    />
                    <label htmlFor="payment1">
                      <figure>
                        <div className="ic">
                          <img src={shipment_1} alt="" />
                        </div>
                        <figcaption>
                          <h5>Thanh toán bằng thử ATM nội địa</h5>
                          <p>
                            Thẻ ATM của bạn cần đăng ký sử dụng dịch vụ Internet
                            Banking. Bạn sẽ được quyền chuyển tới OnePay để
                            thanh toán
                          </p>
                        </figcaption>
                      </figure>
                    </label>
                  </div>
                  <div className="form-group method">
                    <input
                      id="payment2"
                      type="radio"
                      name="payment_type"
                      value="Thanh toán thẻ Visa/MasterCard"
                      checked={
                        order.payment_type === "Thanh toán thẻ Visa/MasterCard"
                      }
                      onChange={(e) =>
                        setOrder((prev) => ({
                          ...prev,
                          payment_type: e.target.value,
                        }))
                      }
                    />
                    <label htmlFor="payment2">
                      <figure>
                        <div className="ic">
                          <img src={shipment_2} alt="" />
                        </div>
                        <figcaption>
                          <h5>Thanh toán thẻ visa, mastercard</h5>
                          <p>
                            Hỗ trợ thẻ VISA, Mastercard, JCB, Amex. Bạn sẽ được
                            chuyển tới OnePay để thanh toán
                          </p>
                        </figcaption>
                      </figure>
                    </label>
                  </div>
                  <div className="form-group method">
                    <input
                      id="payment3"
                      type="radio"
                      name="payment_type"
                      value="Thanh toán khi nhận hàng"
                      checked={
                        order.payment_type === "Thanh toán khi nhận hàng"
                      }
                      onChange={(e) =>
                        setOrder((prev) => ({
                          ...prev,
                          payment_type: e.target.value,
                        }))
                      }
                    />
                    <label htmlFor="payment3">
                      <figure>
                        <div className="ic">
                          <img src={shipment_3} alt="" />
                        </div>
                        <figcaption>
                          <h5>Thanh toán khi nhận hàng (COD)</h5>
                          <p>
                            Quý khách sẽ thanh toán bằng tiền mặt khi The Shine
                            Shop giao hàng cho quý khách
                          </p>
                        </figcaption>
                      </figure>
                    </label>
                  </div>
                  <div className="form-group method">
                    <input
                      id="payment4"
                      type="radio"
                      name="payment_type"
                      value="Chuyển khoản"
                      checked={order.payment_type === "Chuyển khoản"}
                      onChange={(e) =>
                        setOrder((prev) => ({
                          ...prev,
                          payment_type: e.target.value,
                        }))
                      }
                    />
                    <label htmlFor="payment4">
                      <figure>
                        <div className="ic">
                          <img src={shipment_4} alt="" />
                        </div>
                        <figcaption>
                          <h5>Chuyển khoản</h5>
                          <p>
                            Quý khách thanh toán bằng cách chuyển khoản qua
                            Internet Banking hoặc tại ngân hàng
                          </p>
                        </figcaption>
                      </figure>
                    </label>
                  </div>
                </div>
                <button onClick={() => handelPaymenByVNPay()}>
                  Thanh toán qua cổng thanh toán VNPay
                </button>
              </div>
              <div className="box-wrapper">
                <div className="heading">Phương thức giao hàng</div>
                <div className="content">
                  <div className="form-group">
                    <div className="input-group">
                      <input
                        id="shipment-1"
                        type="radio"
                        name="shipment_type"
                        value="Nhận tại cửa hàng"
                        checked={order.shipment_type === "Nhận tại cửa hàng"}
                        onChange={(e) =>
                          setOrder((prev) => ({
                            ...prev,
                            shipment_type: e.target.value,
                          }))
                        }
                      />
                      <label htmlFor="shipment-1">Nhận tại cửa hàng</label>
                    </div>
                    <div className="input-group">
                      <input
                        id="shipment-2"
                        type="radio"
                        name="shipment_type"
                        value="Giao hàng tận nơi"
                        checked={order.shipment_type === "Giao hàng tận nơi"}
                        onChange={(e) =>
                          setOrder((prev) => ({
                            ...prev,
                            shipment_type: e.target.value,
                          }))
                        }
                      />
                      <label htmlFor="shipment-2">Giao hàng tận nơi</label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="accept">
                <input
                  id="accept-input"
                  type="checkbox"
                  checked={order.termsAccepted}
                  onChange={() =>
                    setOrder((prev) => ({
                      ...prev,
                      termsAccepted: !prev.termsAccepted,
                    }))
                  }
                />
                <label htmlFor="accept-input">
                  Tôi đã đọc và đồng ý với
                  <a href="#"> các điều khoản</a>
                </label>
              </div>
              <div className="bottom-wrapper">
                <div className="back">
                  <Link to={"/cart"}>
                    <em className="mdi mdi-reply"></em>Quay lại giỏ hàng
                  </Link>
                </div>
                <div className="done">
                  <a href="#" onClick={() => handleSubmit(order, cartItems)}>
                    <FaShoppingBasket /> Thanh Toán
                  </a>
                </div>
              </div>
            </div>
            <div className="col-lg-5">
              <div className="cart-summary">
                <div className="box-wrapper">
                  <div className="heading">
                    Giỏ hàng
                    <Link to={"/cart"}>
                      <em className="fas fa-pencil-alt"></em>
                    </Link>
                  </div>
                  <div className="content">
                    {cartItems.map((cartItem) => (
                      <div className="item" key={cartItem.id_product}>
                        <figure>
                          <div className="image">
                            <img
                              src={cartItem.image_product}
                              alt={cartItem.name_product}
                            />
                          </div>
                          <figcaption>
                            <p>
                              <span className="title">
                                {cartItem.name_product}
                              </span>
                              <span className="price">
                                {formatCurrency(calculateSubtotal(cartItem))}
                              </span>
                            </p>
                            <p>
                              <span>Số lượng</span>
                              <span> {cartItem.quantity}</span>
                            </p>
                            <p>
                              <span>Giảm giá </span>
                              <span>
                                {formatCurrency(
                                  (cartItem.discount_product / 100) *
                                    cartItem.present_price *
                                    cartItem.quantity
                                )}
                              </span>
                            </p>
                          </figcaption>
                        </figure>
                      </div>
                    ))}
                    <div className="price-wrapper">
                      <p>
                        <span>Tạm tính</span>
                        <span className="price">
                          {formatCurrency(calculateTotalAmount())}
                        </span>
                      </p>
                      <p>
                        <span>VAT (10%)</span>
                        <span>
                          +{" "}
                          {formatCurrency((calculateTotalAmount() * 10) / 100)}
                        </span>
                      </p>
                      <p>
                        {order.shipment_type === "Nhận tại cửa hàng" ? (
                          <>
                            <span>
                              Phí vận chuyển ( +{" "}
                              {formatCurrency(`${SHIPPING_RATE_PER_KM}`)}/km)
                            </span>

                            <span>0đ</span>
                          </>
                        ) : (
                          <>
                            <span>
                              Phí vận chuyển ( +{" "}
                              {formatCurrency(`${SHIPPING_RATE_PER_KM}`)}/km)
                            </span>

                            <span>
                              +{" "}
                              {formatCurrency(distance * SHIPPING_RATE_PER_KM)}
                            </span>
                          </>
                        )}
                      </p>
                      <p>
                        <span>Voucher giảm giá</span>
                        <span>- {formatCurrency(`${discountVoucher}`)}</span>
                      </p>
                      <p className="total">
                        <span>Tổng cộng</span>
                        {order.shipment_type === "Nhận tại cửa hàng" ? (
                          <span className="price">
                            {formatCurrency(
                              calculateTotalAmount() -
                                discountVoucher +
                                (calculateTotalAmount() * 10) / 100
                            )}
                          </span>
                        ) : (
                          <span className="price">
                            {formatCurrency(
                              calculateTotalAmount() -
                                discountVoucher +
                                (calculateTotalAmount() * 10) / 100 +
                                distance * SHIPPING_RATE_PER_KM
                            )}
                          </span>
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="the-shine-shop-cart">
        <div className="container">
          <div className="main-discount">
            <div className="box-discount">
              <div className="title">
                <h5>Sử dụng mã giảm giá</h5>
              </div>
              <div className="form-group">
                <input
                  placeholder="Nhập mã khuyến mãi"
                  value={order.promotion_ticket_code}
                  onChange={(e) =>
                    setOrder((prev) => ({
                      ...prev,
                      promotion_ticket_code: e.target.value,
                    }))
                  }
                />
                <button
                  onClick={() =>
                    handleValidatePromotionTicketCode(
                      order.promotion_ticket_code,
                      calculateTotalAmount()
                    )
                  }
                >
                  ÁP DỤNG
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Payment;
