import { useNavigate, useParams } from "react-router-dom";
import APIs, { endpoints } from "../Config/APIs";
import { useEffect, useState } from "react";
import { Button, Table, Tag } from "antd";
import { formatCurrency } from "../Convert/formatcurrency";

const Orders = () => {
  const [orders, setOrders] = useState([]); // Initialize as an empty array
  const [totalOrders, setTotalOrders] = useState(0); // For pagination
  const [page, setPage] = useState(1); // Track current page
  const { user_id } = useParams();
  const navigate = useNavigate();

  // Function to load orders based on the current page
  const loadOrders = async (currentPage = 1) => {
    try {
      const url = `${endpoints["show-orders"](user_id)}?page=${currentPage}`;
      const res = await APIs.get(url);
      setOrders(res.data.results);

      setTotalOrders(res.data.count); // Set total order count for pagination
    } catch (error) {
      console.error("Failed to load orders:", error);
    }
  };

  const statusColorMap = {
    "Chờ xác nhận": "gray",
    "Đã xác nhận": "blue",
    "Đang xử lý": "orange",
    "Đang giao hàng": "teal",
    "Đã giao hàng": "green",
    "Đã hủy": "red",
    "Hoàn trả": "purple",
    "Hoàn tiền": "yellow",
    "Thất bại": "black",
  };

  useEffect(() => {
    loadOrders(page); // Load orders for the initial page
  }, [page, user_id]);

  // Table columns configuration
  const columns = [
    {
      title: "Số Thứ Tự",

      key: "stt",
      render: (_, __, index) => index + 1, // Dynamically calculate index
    },

    {
      title: "Mã Đơn Hàng",
      dataIndex: "order_id",
      key: "order_id",
      sorter: (a, b) => a.order_id - b.order_id,
    },
    {
      title: "Ngày Đặt",
      dataIndex: "order_created_date",
      key: "order_created_date",
      render: (text) => new Date(text).toLocaleString(),
      sorter: (a, b) =>
        new Date(a.order_created_date) - new Date(b.order_created_date),
    },
    {
      title: "Phí Vận Chuyển (₫)",
      dataIndex: "order_shipping_fee",
      key: "order_shipping_fee",
      render: (fee) => formatCurrency(fee),
    },
    {
      title: "Tổng Cộng (₫)",
      dataIndex: "order_total_amount",
      key: "order_total_amount",
      sorter: (a, b) => a.order_total_amount - b.order_total_amount,
      render: (amount) => formatCurrency(amount),
    },

    {
      title: "Hình Thức Thanh Toán",
      dataIndex: "order_payment_type",
      key: "order_payment_type",
    },
    {
      title: "Hình Thức Giao/Nhận Hàng",
      dataIndex: "order_shipment_type",
      key: "order_shipment_type",
    },
    {
      title: "Địa Chỉ Giao Hàng",
      dataIndex: "order_shipment_address",
      key: "order_shipment_address",
    },
    {
      title: "Ghi Chú",
      dataIndex: "order_note",
      key: "order_note",
    },
    {
      title: "Trạng Thái Thanh Toán",
      dataIndex: "order_is_payment",
      key: "order_is_payment",
      render: (isPaid) =>
        isPaid ? (
          <Tag color="green">Đã Thanh Toán</Tag>
        ) : (
          <Tag color="red">Chưa Thanh Toán</Tag>
        ),
    },
    {
      title: "Trạng Thái Đơn Hàng",
      dataIndex: "order_status",
      key: "order_status",
      render: (status) => (
        <Tag color={statusColorMap[status] || "gray"}>{status}</Tag>
      ),
    },
    {
      title: "Thời Gian Cập Nhật",
      dataIndex: "order_updated_date",
      key: "order_updated_date",
      render: (text) => new Date(text).toLocaleString(),
      sorter: (a, b) =>
        new Date(a.order_updated_date) - new Date(b.order_updated_date),
    },
    {
      title: "Chi Tiết Đơn Hàng",
      key: "actions",
      render: (_, record) => (
        <Button
          type="primary"
          onClick={() =>
            navigate(
              `/users/${user_id}/orders/${record.order_id}/list-order-details/`
            )
          }
        >
          Xem Chi Tiết
        </Button>
      ),
    },
  ];

  return (
    <main>
      <section className="main-section about-1">
        <div className="container">
          <h2 className="main-title">DANH SÁCH ĐƠN HÀNG</h2>
          <div className="row">
            <Table
              columns={columns}
              dataSource={orders}
              rowKey="order_id"
              pagination={{
                pageSize: 5,
                total: totalOrders,
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

export default Orders;
