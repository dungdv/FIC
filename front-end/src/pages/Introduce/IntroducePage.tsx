import React from "react";
//import { Row, Col, Typography } from "antd";
import AppHeader from "../../components/AppHeader";
import AppFooter from "../../components/AppFooter";
import { isAuthenticated } from "../../utils/auth";

const { Title, Paragraph } = Typography;

const IntroducePage: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = React.useState(isAuthenticated());

  return (
    <div>
      <AppHeader isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <div
        style={{
          padding: "80px 20px 20px",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        <Title level={1}>GIỚI THIỆU</Title>
        <Paragraph>
          Viện Phát triển Giáo dục Khai phóng Libero (Viện Libero) là mô hình
          viện giáo dục tư thụ, thực hành công ty Agilead Global. Vì sự phát
          triển giáo dục khai phóng, Viện Libero nỗ lực kiến tạo thay đổi tích
          cực và bền vững cho giáo dục Việt Nam.
        </Paragraph>
        <Paragraph>
          <strong>Viện Libero thúc đẩy các chiến lược:</strong>
        </Paragraph>
        <ul style={{ paddingLeft: "20px" }}>
          <li>Nhận diện và phát triển tài năng giáo dục.</li>
          <li>
            Thúc đẩy các chương trình giáo dục khai phóng trong trường học.
          </li>
          <li>
            Thúc đẩy các chương trình giáo dục khai phóng, xây dựng, truyền
            thông và tạo ra các giá trị mới.
          </li>
          <li>
            Thúc đẩy sự phát triển giáo dục khai phóng, đưa giáo dục khai phóng
            vào thực tế và môi trường giáo dục.
          </li>
        </ul>
        <Paragraph>
          Thành lập từ ngày 22 tháng 6 năm 2022, nhắm đến xây dựng "khai phóng
          tiềm năng con người" và "thế đổi giá trị mới trong giáo dục". Libero
          đã xây dựng và phát triển các chương trình giáo dục khai phóng trong
          các trường học, doanh nghiệp và cộng đồng.
        </Paragraph>
        <Paragraph>
          <strong>Trọng tâm hoạt động của Libero:</strong>
        </Paragraph>
        <ul style={{ paddingLeft: "20px" }}>
          <li>
            Chương trình Giáo dục Khai phóng Libero365 (dẫn dắt 3 khóa Libero21,
            Libero22, Libero23).
          </li>
          <li>Truyền thông Tu duy 2023.</li>
          <li>Khóa học Tri Đạo (chương trình doanh nghiệp).</li>
          <li>Thư viện học liệu mở (OER), phối hợp cùng Đại học Thanh Đô.</li>
          <li>Dự án nghiên cứu Giáo dục Khai phóng, phối hợp với RCISS.</li>
          <li>
            Chương trình Bế giảng cùng các dự án hoc (dẫn dắt khóa UPP23).
          </li>
          <li>
            Chương trình Nhân bản học khai phóng, phối hợp với Đại học Văn Nhất.
          </li>
          <li>
            Chương trình Khoa học Nhân văn CLB Sach và nhận thức chuuyện, phối
            hợp với The Bookstop.
          </li>
          <li>CLB Cha mẹ sáng tạo, phối hợp với Interconnection My Dinh.</li>
        </ul>
      </div>
      <AppFooter />
    </div>
  );
};

export default IntroducePage;
