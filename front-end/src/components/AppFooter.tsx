import React from "react";
import '@fortawesome/fontawesome-free/css/all.min.css';

const AppFooter: React.FC = () => {
  return (
    <footer style={{ backgroundColor: "#333", color: "white", padding: "40px 20px" }}>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "flex-start",
          justifyContent: "space-between",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        {/* Brand and description */}
        <div style={{ flex: "1 1 400px", marginBottom: "10px" }}>
          <h2 style={{
            color: "#FF6347",
            fontSize: "28px",
            fontWeight: "bold",
            letterSpacing: "1px",
            margin: "-7px 0 10px"
          }}>
            LIBERO.
          </h2>
          <p style={{ lineHeight: "1.7" }}>
            LIBERO Book Store provides a wide range of books to ignite your knowledge and imagination.
          </p>
          {/* Social icons */}
          <div style={{ marginTop: "10px" }}>
            <a href="https://www.facebook.com/Libero.School" target="_blank" rel="noreferrer" style={{ marginRight: "10px", color: "white" }}>
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="https://www.youtube.com/@VienLibero" target="_blank" rel="noreferrer" style={{ marginRight: "10px", color: "white" }}>
              <i className="fab fa-youtube"></i>
            </a>
            <a href="https://www.linkedin.com/company/libero-school" target="_blank" rel="noreferrer" style={{ color: "white" }}>
              <i className="fab fa-linkedin-in"></i>
            </a>
          </div>
        </div>

        {/* Company links */}
        <div style={{ flex: "1 1 200px", marginBottom: "20px" }}>
          <h3 style={{
            margin: "0 0 10px",
            fontWeight: "bold",
            fontSize: "18px"
          }}>COMPANY</h3>
                    <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              <li style={{ margin: "10px 0" }}>
                <a href="https://libero.school/hop-tac/" style={{ color: "white", textDecoration: "none" }}>
                  Cooperate
                </a>
              </li>

              <li style={{ margin: "10px 0" }}>
                <a
                  href="https://libero.school/gioi-thieu/"
                  target="_blank"
                  rel="noreferrer"
                  style={{ color: "white", textDecoration: "none" }}
                >
                  About Us
                </a>
              </li>

              <li style={{ margin: "10px 0" }}>
                <a
                  href="https://libero.school/khoa-hoc/"
                  target="_blank"
                  rel="noreferrer"
                  style={{ color: "white", textDecoration: "none" }}
                >
                  Courses
                </a>
              </li>
            </ul>

        </div>

        {/* Contact info */}
            <div style={{ flex: "1 1 200px", marginBottom: "20px" }}>
              <h3 style={{ margin: 0, fontWeight: "bold", fontSize: "18px" }}>GET IN TOUCH</h3>

              <p style={{ lineHeight: "1.8", margin: "10px 0" }}>
                <i className="fas fa-envelope" style={{ marginRight: "8px", color: "#1E90FF" }}></i>
                Email: contact@liberobookstore.com
              </p>

              <p style={{ lineHeight: "1.8", margin: "10px 0" }}>
                <i className="fas fa-phone" style={{ marginRight: "8px", color: "#1E90FF" }}></i>
                Phone: +84 98 997 56 93
              </p>

              <p style={{ lineHeight: "1.8", margin: "10px 0" }}>
                <i className="fas fa-map-marker-alt" style={{ marginRight: "8px", color: "#1E90FF" }}></i>
                Address: Số 6-B12, KĐT Mỹ Đình 1, P.Cầu Diễn, Q.Nam Từ Liêm, TP.Hà Nội, Việt Nam
              </p>
            </div>
      </div>

      {/* Divider */}
      <hr style={{ borderTop: "2px solid white",width: "85%",margin: "20px auto" }} />

      {/* Copyright */}
      <p style={{ textAlign: "center", margin: 0 }}>
        © 2025 LIBERO Book Store. All rights reserved.
      </p>
    </footer>
  );
};

export default AppFooter;
