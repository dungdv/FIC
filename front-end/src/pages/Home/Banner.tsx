import React from "react";

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
        maxHeight: "400px",
        overflow: "hidden",
        position: "relative",
        marginBottom: "20px",
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
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: "rgba(0, 0, 0, 0.3)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div style={{ textAlign: "center", color: "#fff" }}>
          <h1 style={{ fontSize: "48px", fontWeight: "bold", margin: 0 }}>
            Khám Phá Thế Giới Sách
          </h1>
          <p style={{ fontSize: "20px", margin: "10px 0 20px" }}>
            Tìm kiếm và thuê sách yêu thích của bạn ngay hôm nay!
          </p>
          <button
            style={{
              fontSize: "18px",
              padding: "10px 30px",
              background: "#4A90E2",
              border: "none",
              borderRadius: "4px",
              color: "#fff",
              cursor: "pointer",
              transition: "background 0.3s",
            }}
            onClick={() =>
              window.scrollTo({ top: window.innerHeight, behavior: "smooth" })
            }
            onMouseOver={(e) => (e.currentTarget.style.background = "#357ABD")}
            onMouseOut={(e) => (e.currentTarget.style.background = "#4A90E2")}
          >
            Khám Phá Ngay
          </button>
        </div>
      </div>
      <style>
        {`
          @media (max-width: 768px) {
            .banner-container {
              max-height: 200px;
            }
            .banner-container h1 {
              font-size: 24px;
            }
            .banner-container p {
              font-size: 16px;
              margin: 5px 0 10px;
            }
            .banner-container button {
              font-size: 16px;
              padding: 8px 20px;
            }
          }
        `}
      </style>
    </div>
  );
};

export default Banner;
