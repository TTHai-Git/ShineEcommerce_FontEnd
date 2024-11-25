import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Table, Image } from "antd";
import APIs, { endpoints } from "../Config/APIs";
import { formatCurrency } from "../Convert/formatcurrency";

const OrdersDetails = () => {
  const { order_id } = useParams();
  const [ordersDetails, setOrdersDetails] = useState([]); // Initialize as an empty array
  const [totalOrdersDetails, setTotalOrdersDetails] = useState([]); // For pagination
  const [page, setPage] = useState(1); // Track current page

  const loadOrdersDetails = async (currentPage = 1) => {
    try {
      const url = `${endpoints["list-order-details"](
        order_id
      )}?page=${currentPage}`;
      const res = await APIs.get(url);
      setOrdersDetails(res.data.results);
      //   console.log(res.data.results);

      setTotalOrdersDetails(res.data.count); // Set total order count for pagination
    } catch (error) {
      console.error("Failed to load orders:", error);
    }
  };

  useEffect(() => {
    loadOrdersDetails();
  }, []);

  const columns = [
    {
      title: "Số Thứ Tự",
      key: "stt",
      render: (_, __, index) => index + 1, // Dynamically calculate index
    },
    {
      title: "Mã Sản Phẩm",
      dataIndex: "order_detail_id",
      key: "order_detail_id",
      sorter: (a, b) => a.order_detail_id - b.order_detail_id,
    },
    {
      title: "Ảnh Sản Phẩm",
      dataIndex: "order_detail_product_image",
      key: "order_detail_product_image",
      render: (url) => <Image src={url} alt="Product Image" width={50} />,
    },
    {
      title: "Tên Sản Phẩm",
      dataIndex: "order_detail_product_name",
      key: "order_detail_product_name",
    },
    {
      title: "Đơn Giá (₫)",
      dataIndex: "order_detail_product_unit_price",
      key: "order_detail_product_unit_price",
      sorter: (a, b) =>
        a.order_detail_product_unit_price - b.order_detail_product_unit_price,
      render: (price) => formatCurrency(price),
    },
    {
      title: "Số Lượng",
      dataIndex: "order_detail_product_quantity",
      sorter: (a, b) =>
        a.order_detail_product_quantity - b.order_detail_product_quantity,
      key: "order_detail_product_quantity",
    },
    {
      title: "Phần Trăm Giảm Giá (%)",
      dataIndex: "order_detail_product_discount",
      sorter: (a, b) =>
        a.order_detail_product_discount - b.order_detail_product_discount,
      key: "order_detail_product_discount",
    },
    {
      title: "Giảm Giá (₫)",
      dataIndex: "order_detail_discount_price",
      sorter: (a, b) =>
        a.order_detail_discount_price - b.order_detail_discount_price,
      key: "order_detail_discount_price",
      render: (price) => formatCurrency(price),
    },
    {
      title: "Thành Tiền (₫)",
      dataIndex: "order_detail_total_amount",
      key: "order_detail_total_amount",
      sorter: (a, b) =>
        a.order_detail_total_amount - b.order_detail_total_amount,
      render: (amount) => formatCurrency(amount),
    },
  ];
  return (
    <main>
      <section className="main-section about-1">
        <div className="container">
          <h2 className="main-title">DANH SÁCH CHI TIẾT ĐƠN HÀNG</h2>
          <div className="row">
            <Table
              columns={columns}
              dataSource={ordersDetails}
              rowKey="order_detail_id"
              pagination={{
                pageSize: 5,
                total: totalOrdersDetails,
                current: page,
                onChange: (newPage) => {
                  setPage(newPage);
                },
              }}
            />
          </div>
        </div>
      </section>
    </main>
  );
};
export default OrdersDetails;
