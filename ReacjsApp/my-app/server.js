// server.js
const express = require("express");
const vnpayPayment = require("./src/service/vnpay/vnpayPayment"); // Adjust this path if needed
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors()); // To allow requests from your React frontend on localhost
app.use(express.json());
app.use("/api/vnpay", vnpayPayment);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
