import React, { useEffect, useState } from "react";
import { Dropdown, Menu } from "antd";
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
        background: "#e6f0fa",
        padding: "10px 20px",
        zIndex: 1000,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
      }}
    >
      <div
        style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
        onClick={() => handleNavigate("/")}
      >
        <img
          src={logo}
          alt="Logo"
          style={{ height: "40px", marginRight: "10px" }}
        />
        <span style={{ fontSize: "18px", fontWeight: "bold", color: "#333" }}>
          LIBERO
        </span>
      </div>
      <div style={{ display: "flex", alignItems: "center" }}>
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            handleNavigate("/introduce");
          }}
          className="nav-link"
          style={{
            margin: "0 15px",
            fontSize: "14px",
            textDecoration: "none",
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
            margin: "0 15px",
            fontSize: "14px",
            textDecoration: "none",
          }}
        >
          Thư viện sách
        </a>
      </div>
      <div style={{ display: "flex", alignItems: "center" }}>
        {isLoggedIn ? (
          <>
            <Dropdown overlay={cartMenu} trigger={["hover"]}>
              <ShoppingCartOutlined
                className="cart-icon"
                style={{
                  fontSize: "20px",
                  marginRight: "15px",
                  cursor: "pointer",
                  position: "relative",
                }}
              />
            </Dropdown>
            <Dropdown overlay={userMenu} trigger={["click"]}>
              <img
                src={profilePicture}
                alt="User Profile"
                style={{
                  width: "30px",
                  height: "30px",
                  borderRadius: "50%",
                  cursor: "pointer",
                  border: "2px solid #fff",
                }}
              />
            </Dropdown>
          </>
        ) : (
          <button
            onClick={handleLogin}
            style={{
              padding: "5px 15px",
              background: "#1A73E8",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Login
          </button>
        )}
      </div>
      <style>
        {`
          .cart-icon {
            color: #333;
            transition: color 0.3s ease;
          }
          .cart-icon:hover {
            color: red;
          }
          .nav-link {
            color: #333;
            transition: color 0.3s ease;
          }
          .nav-link:hover {
            color: red;
          }
        `}
      </style>
    </div>
  );
};

export default AppHeader;
