import React from "react";

const AppFooter: React.FC = () => {
  return (
    <div
      style={{
        backgroundColor: "#333",
        color: "white",
        padding: "20px",
        textAlign: "center",
        marginTop: "20px",
      }}
    >
      <div>
        <a href="/contact" style={{ color: "#1E90FF", margin: "0 10px" }}>
          Contact Us
        </a>
        <a href="/about" style={{ color: "#1E90FF", margin: "0 10px" }}>
          About Us
        </a>
        <a href="/privacy" style={{ color: "#1E90FF", margin: "0 10px" }}>
          Privacy Policy
        </a>
      </div>
      <p style={{ marginTop: "10px" }}>
        Email: contact@liberobookstore.com | Phone: +84 123 456 789
      </p>
      <p>© 2025 LIBERO Book Store. All rights reserved.</p>
    </div>
  );
};

export default AppFooter;
