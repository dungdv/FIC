import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import AppHeader from "../../components/AppHeader";
import AppFooter from "../../components/AppFooter";
import SearchBar from "./SearchBar";
import Banner from "./Banner";
import bannerImage from "../../assets/banner-image.jpg";
import { isAuthenticated, login } from "../../utils/auth";
import { useAuth } from "../../hooks/AuthContext";

const HomePage: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(isAuthenticated());
  const location = useLocation();
  const { setToken } = useAuth();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get("token");
    const user = params.get("user");

    if (token && user) {
      localStorage.setItem("user", user);
      setToken(token);
      login();
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(isAuthenticated());
    }
  }, [location, setToken]);

  return (
    <div>
      <AppHeader isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <Banner imageUrl={bannerImage} altText="Book Store Banner" />
      <SearchBar />
      <AppFooter />
    </div>
  );
};

export default HomePage;
