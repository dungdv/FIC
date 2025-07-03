import React from "react";
import { Typography, Button } from "antd";

interface BannerProps {
  imageUrl: string;
  altText?: string;
}

const Banner: React.FC<BannerProps> = ({ imageUrl, altText = "Banner" }) => {
  return (
    <div
      className="banner-container"
      style={{
        width: "100%",
        maxHeight: "450px",
        overflow: "hidden",
        position: "relative",
        marginBottom: "32px",
      }}
    >
      <img
        src={imageUrl}
        alt={altText}
        loading="lazy"
        style={{
          width: "100%",
          height: "auto",
          objectFit: "cover",
          display: "block",
          filter: "brightness(0.9)",
          transition: "transform 0.5s ease",
        }}
        className="banner-image"
      />
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: "linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.2))",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div style={{ textAlign: "center", color: "#fff" }}>
          <Typography.Title
            level={1}
            style={{
              fontSize: "56px",
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 700,
              margin: 0,
              textShadow: "0 2px 8px rgba(0, 0, 0, 0.3)",
              animation: "fadeIn 1s ease-in-out",
              color: "#1557b0"
            }}
          >
            Khám Phá Thế Giới Sách
          </Typography.Title>
          <Typography.Text
            style={{
              fontSize: "20px",
              fontFamily: "'Inter', sans-serif",
              fontWeight: 400,
              margin: "16px 0 24px",
              display: "block",
              animation: "fadeIn 1.2s ease-in-out",
              color: "#1557b0"
            }}
          >
            Tìm kiếm và thuê sách yêu thích của bạn ngay hôm nay!
          </Typography.Text>
          <Button
            type="primary"
            size="large"
            style={{
              fontSize: "18px",
              padding: "12px 32px",
              height: "auto",
              borderRadius: "8px",
              background: "#1A73E8",
              border: "none",
              fontFamily: "'Inter', sans-serif",
              fontWeight: 500,
              transition: "all 0.3s ease",
            }}
            className="cta-button"
            onClick={() =>
              window.scrollTo({ top: window.innerHeight, behavior: "smooth" })
            }
          >
            Khám Phá Ngay
          </Button>
        </div>
      </div>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500&family=Poppins:wght@700&display=swap');

          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          .banner-container:hover .banner-image {
            transform: scale(1.03);
          }

          .cta-button:hover {
            background: #1557b0;
            transform: scale(1.05);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
          }

          @media (max-width: 768px) {
            .banner-container {
              max-height: 300px;
            }
            .banner-container h1 {
              font-size: 32px;
            }
            .banner-container p {
              font-size: 16px;
              margin: 8px 0 16px;
            }
            .cta-button {
              font-size: 16px;
              padding: 8px 24px;
            }
          }

          @media (max-width: 480px) {
            .banner-container h1 {
              font-size: 24px;
            }
            .banner-container p {
              font-size: 14px;
            }
          }
        `}
      </style>
    </div>
  );
};

export default Banner;