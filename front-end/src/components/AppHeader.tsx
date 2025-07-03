import React, { useEffect, useState } from "react";
import { Dropdown, Menu, Typography, Space } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import logo from "../assets/logo.png";
import axios from "../services/axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/AuthContext";

interface HeaderProps {
  isLoggedIn: boolean;
  setIsLoggedIn: (value: boolean) => void;
}

const AppHeader: React.FC<HeaderProps> = ({ isLoggedIn, setIsLoggedIn }) => {
  const navigate = useNavigate();
  const { token, setToken } = useAuth();
  const [profilePicture, setProfilePicture] = useState<string>(
    "https://via.placeholder.com/40"
  );

  useEffect(() => {
    const fetchUserPicture = async () => {
      if (isLoggedIn && token) {
        try {
          const response = await axios.get("/user/picture", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setProfilePicture(
            response.data.picture || "https://via.placeholder.com/40"
          );
        } catch (error) {
          console.error("Error fetching user picture:", error);
          setProfilePicture("https://via.placeholder.com/40");
        }
      }
    };

    fetchUserPicture();
  }, [isLoggedIn, token]);

  const handleLogin = async () => {
    try {
      const response = await axios.get("/auth/google");
      window.location.href = response.data.authUrl;
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setToken(null);
    setProfilePicture("https://via.placeholder.com/40");
  };

  const userMenu = (
    <Menu>
      <Menu.Item key="logout" onClick={handleLogout}>
        Logout
      </Menu.Item>
    </Menu>
  );

  const cartMenu = (
    <Menu>
      <Menu.Item key="cart" onClick={() => navigate("/cart")}>
        Giỏ hàng
      </Menu.Item>
      <Menu.Item key="rental" onClick={() => navigate("/rental-status")}>
        Sách đã thuê
      </Menu.Item>
    </Menu>
  );

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        width: "100%",
        background: "linear-gradient(90deg, #e6f0fa 0%, #ffffff 100%)",
        padding: "12px 24px",
        zIndex: 1000,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          cursor: "pointer",
          transition: "transform 0.3s ease",
        }}
        onClick={() => handleNavigate("/")}
        className="logo-container"
      >
        <img
          src={logo}
          alt="Logo"
          style={{
            height: "48px",
            marginRight: "12px",
            filter: "drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2))",
          }}
        />
        <Typography.Title
          level={3}
          style={{
            margin: 0,
            color: "#333",
            fontFamily: "'Poppins', sans-serif",
            fontWeight: 700,
            letterSpacing: "1px",
          }}
        >
          LIBERO
        </Typography.Title>
      </div>
      <Space size="large" style={{ display: "flex", alignItems: "center" }}>
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            handleNavigate("/introduce");
          }}
          className="nav-link"
          style={{
            fontSize: "16px",
            fontFamily: "'Inter', sans-serif",
            fontWeight: 500,
            color: "#333",
            textDecoration: "none",
            position: "relative",
            paddingBottom: "4px",
          }}
        >
          Giới thiệu
        </a>
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            handleNavigate("/books");
          }}
          className="nav-link"
          style={{
            fontSize: "16px",
            fontFamily: "'Inter', sans-serif",
            fontWeight: 500,
            color: "#333",
            textDecoration: "none",
            position: "relative",
            paddingBottom: "4px",
          }}
        >
          Thư viện sách
        </a>
      </Space>
      <div style={{ display: "flex", alignItems: "center" }}>
        {isLoggedIn ? (
          <>
            <Dropdown overlay={cartMenu} trigger={["hover"]}>
              <div className="cart-icon-wrapper">
                <ShoppingCartOutlined
                  style={{
                    fontSize: "24px",
                    color: "#1A73E8",
                    position: "relative",
                    transition: "all 0.3s ease",
                  }}
                />
              </div>
            </Dropdown>
            <Dropdown overlay={userMenu} trigger={["click"]}>
              <div className="avatar-wrapper">
                <img
                  src={profilePicture}
                  alt="User Profile"
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    cursor: "pointer",
                    border: "2px solid #1A73E8",
                    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
                    transition: "transform 0.3s ease",
                  }}
                />
              </div>
            </Dropdown>
          </>
        ) : (
          <button
            onClick={handleLogin}
            style={{
              padding: "8px 20px",
              background: "#1A73E8",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontFamily: "'Inter', sans-serif",
              fontWeight: 500,
              transition: "background 0.3s ease",
            }}
            className="login-button"
          >
            Login
          </button>
        )}
      </div>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=Poppins:wght@700&display=swap');

          .logo-container:hover {
            transform: scale(1.05);
          }

          .nav-link::after {
            content: '';
            position: absolute;
            width: 0;
            height: 2px;
            bottom: 0;
            left: 0;
            background-color: #1A73E8;
            transition: width 0.3s ease;
          }

          .nav-link:hover::after {
            width: 100%;
          }

          .nav-link:hover {
            color: #1A73E8;
          }

          .cart-icon-wrapper {
            position: relative;
            padding: 8px;
            border-radius: 50%;
            transition: all 0.3s ease;
          }

          .cart-icon-wrapper:hover {
            background: rgba(26, 115, 232, 0.1);
            transform: scale(1.1);
          }

          .avatar-wrapper:hover img {
            transform: scale(1.1);
          }

          .login-button:hover {
            background: #1557b0;
          }
        `}
      </style>
    </div>
  );
};

export default AppHeader;
