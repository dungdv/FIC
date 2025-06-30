import React, { useState, useEffect } from "react";
import { Table, Button, Typography, Empty, message, Spin } from "antd";
import { useNavigate } from "react-router-dom";
import AppHeader from "../../components/AppHeader";
import AppFooter from "../../components/AppFooter";
import { useAuth } from "../../hooks/AuthContext";
import { getRentalItems } from "../../services/cartService";
import { isAuthenticated } from "../../utils/auth";

const { Title, Text } = Typography;

const RentalStatusPage: React.FC = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(isAuthenticated());
  const { token } = useAuth();
  const [rentalItems, setRentalItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchRentalItems = async () => {
      if (!token) {
        setRentalItems([]);
        return;
      }
      try {
        setLoading(true);
        const items = await getRentalItems(token);
        console.log("Fetched rental items:", items);
        setRentalItems(items || []);
      } catch (error) {
        console.error("Error fetching rental items:", error);
        message.error("Failed to load rentals. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchRentalItems();
  }, [token]);

  const columns = [
    {
      title: "Product",
      dataIndex: "name",
      key: "name",
      render: (_: any, record: any) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          <img
            src={record.image || "https://via.placeholder.com/50"}
            alt={record.name}
            style={{ width: 50, marginRight: 10 }}
          />
          <span>{record.name || "Unknown Title"}</span>
        </div>
      ),
    },
    {
      title: "Price",
      dataIndex: "rentalPrice",
      key: "rentalPrice",
      render: (price: number) => `${price ? price.toLocaleString() : "0"} đ`,
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      render: (quantity: number) => quantity || 1,
    },
    {
      title: "Rental Days",
      dataIndex: "rentalDays",
      key: "rentalDays",
      render: (rentalDays: number) => rentalDays || 7,
    },
    {
      title: "Subtotal",
      key: "subtotal",
      render: (_: any, record: any) =>
        `${(record.rentalPrice * (record.quantity || 1)).toLocaleString()} đ`,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => status || "pending",
    },
    {
      title: "Rented At",
      dataIndex: "rentedAt",
      key: "rentedAt",
      render: (rentedAt: string) =>
        rentedAt ? new Date(rentedAt).toLocaleDateString() : "N/A",
    },
    {
      title: "Return Date",
      dataIndex: "returnDate",
      key: "returnDate",
      render: (returnDate: string) =>
        returnDate ? new Date(returnDate).toLocaleDateString() : "N/A",
    },
  ];

  const totalAmount = rentalItems.reduce(
    (total, item) => total + (item.rentalPrice || 0) * (item.quantity || 1),
    0
  );

  return (
    <div>
      <AppHeader isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <div style={{ padding: "20px", maxWidth: "1200px", margin: "80px auto" }}>
        <Title level={2}>Rental Status</Title>
        {loading ? (
          <div style={{ textAlign: "center", marginTop: "20px" }}>
            <Spin size="large" />
          </div>
        ) : rentalItems.length === 0 ? (
          <Empty description="No rental items found">
            <Button type="primary" onClick={() => navigate("/")}>
              Go to Home
            </Button>
          </Empty>
        ) : (
          <>
            <Table
              columns={columns}
              dataSource={rentalItems}
              rowKey="id"
              pagination={false}
              style={{ marginBottom: 20 }}
              key={rentalItems.length}
            />
            <div style={{ textAlign: "right" }}>
              <Text strong style={{ fontSize: "18px" }}>
                Total Amount: {totalAmount.toLocaleString()} đ
              </Text>
            </div>
          </>
        )}
      </div>
      <AppFooter />
    </div>
  );
};

export default RentalStatusPage;
