import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Home from "./home";

const PaymentReturn = () => {
  const query = new URLSearchParams(useLocation().search);
  const vnp_ResponseCode = query.get("vnp_ResponseCode");
  const navigate = useNavigate();

  useEffect(() => {
    if (vnp_ResponseCode === "00") {
      alert("Payment successful!");
    } else {
      alert("Payment failed or canceled.");
    }
    navigate("/");
  }, [vnp_ResponseCode]);

  return <Home />;
};

export default PaymentReturn;
