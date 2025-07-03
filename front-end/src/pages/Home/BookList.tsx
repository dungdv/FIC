import React, { useState } from "react";
import type { Book } from "../../types/bookType";
import { Card, Pagination, Button, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import economicsImage from "../../assets/kinh-te.jpg";
import mediaImage from "../../assets/truyen-thong.jpg";
import technologyImage from "../../assets/cong-nghe.jpg";
import selfHelpImage from "../../assets/self-help.jpg";
import childrenImage from "../../assets/thieu-nhi.jpg";

interface BookListProps {
  books: Book[];
  searchTerm: string;
  selectedGenre: string | null;
  setSelectedGenre: (genre: string | null) => void;
}

const genres = [
  { name: "Kinh tế", image: economicsImage },
  { name: "Truyền thông", image: mediaImage },
  { name: "Công nghệ", image: technologyImage },
  { name: "Self-Help", image: selfHelpImage },
  { name: "Thiếu nhi", image: childrenImage },
];

const BookList: React.FC<BookListProps> = ({
  books,
  searchTerm,
  selectedGenre,
  setSelectedGenre,
}) => {
  const itemsPerPage = 12;
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  const indexOfLastBook = currentPage * itemsPerPage;
  const indexOfFirstBook = indexOfLastBook - itemsPerPage;
  const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleGenreClick = (genre: string) => {
    setSelectedGenre(genre);
    setCurrentPage(1);
  };

  const handleBackToGenres = () => {
    setSelectedGenre(null);
    setCurrentPage(1);
  };

  const showGenres = !selectedGenre && !searchTerm.trim();

  return (
    <div
      style={{
        padding: "32px 24px",
        marginTop: "80px",
        background: "linear-gradient(180deg, #f5faff 0%, #ffffff 100%)",
      }}
    >
      {showGenres ? (
        <>
          <Typography.Title
            level={2}
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 700,
              color: "#1A73E8",
              textAlign: "center",
              marginBottom: "32px",
              animation: "fadeIn 1s ease-in-out",
            }}
          >
            Khám Phá Thể Loại
          </Typography.Title>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
              gap: "24px",
              justifyContent: "center",
            }}
          >
            {genres.map((genre, index) => (
              <Card
                key={genre.name}
                hoverable
                className="genre-card"
                style={{
                  width: "260px",
                  borderRadius: "16px",
                  overflow: "hidden",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                  border: "2px solid transparent",
                  background: "linear-gradient(white, white) padding-box, linear-gradient(45deg, #1A73E8, #34c759) border-box",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  animation: `fadeInUp 0.5s ease-in-out ${index * 0.1}s both`,
                }}
                cover={
                  <div
                    style={{
                      width: "100%",
                      height: "180px",
                      overflow: "hidden",
                      background: "#f7f7f7",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <img
                      alt={genre.name}
                      src={genre.image}
                      style={{
                        width: "100%",
                        height: "180px",
                        objectFit: "cover",
                        objectPosition: "center",
                        transition: "transform 0.3s ease",
                      }}
                    />
                  </div>
                }
                onClick={() => handleGenreClick(genre.name)}
              >
                <Typography.Title
                  level={4}
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 600,
                    color: "#333",
                    textAlign: "center",
                    margin: 0,
                  }}
                >
                  {genre.name}
                </Typography.Title>
              </Card>
            ))}
          </div>
        </>
      ) : (
        <>
          <Button
            style={{
              marginBottom: "24px",
              fontSize: "16px",
              padding: "8px 24px",
              borderRadius: "8px",
              color: "#fff",
              background: "#1A73E8",
              border: "none",
              fontFamily: "'Inter', sans-serif",
              fontWeight: 500,
              transition: "background 0.3s ease",
            }}
            className="back-button"
            onClick={handleBackToGenres}
          >
            Quay lại thể loại
          </Button>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
              gap: "24px",
              justifyContent: "center",
            }}
          >
            {currentBooks.map((book, index) => (
              <Card
                key={book.id}
                hoverable
                className="book-card"
                style={{
                  width: "260px",
                  borderRadius: "16px",
                  overflow: "hidden",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                  border: "2px solid transparent",
                  background: "linear-gradient(white, white) padding-box, linear-gradient(45deg, #1A73E8, #34c759) border-box",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  animation: `fadeInUp 0.5s ease-in-out ${index * 0.1}s both`,
                }}
                cover={
                  <div
                    style={{
                      width: "100%",
                      height: "280px",
                      overflow: "hidden",
                      background: "#f7f7f7",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <img
                      alt={book.name || "Unknown"}
                      src={
                        book.image ||
                        "https://via.placeholder.com/200x300?text=No+Image"
                      }
                      style={{
                        width: "100%",
                        height: "280px",
                        objectFit: "contain",
                        objectPosition: "center",
                        transition: "transform 0.3s ease",
                      }}
                    />
                  </div>
                }
                onClick={() => navigate(`/book/${book.id}`)}
              >
                <div
                  style={{
                    padding: "16px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px",
                    minHeight: "100px",
                  }}
                >
                  <Typography.Title
                    level={5}
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontWeight: 600,
                      color: "#333",
                      margin: 0,
                      lineHeight: "1.4",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                    }}
                  >
                    {book.name || "Unknown Title"}
                  </Typography.Title>
                  <Typography.Text
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "14px",
                      color: "#666",
                      margin: 0,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {book.author || "Unknown Author"}
                  </Typography.Text>
                </div>
              </Card>
            ))}
          </div>
          <Pagination
            current={currentPage}
            total={books.length}
            pageSize={itemsPerPage}
            onChange={handlePageChange}
            style={{
              textAlign: "center",
              marginTop: "32px",
              fontFamily: "'Inter', sans-serif",
            }}
            className="custom-pagination"
          />
        </>
      )}
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Poppins:wght@700&display=swap');

          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          .book-card:hover,
          .genre-card:hover {
            transform: translateY(-8px);
            box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
          }

          .book-card:hover img,
          .genre-card:hover img {
            transform: scale(1.05);
          }

          .back-button:hover {
            background: #1557b0;
          }

          .custom-pagination .ant-pagination-item a,
          .custom-pagination .ant-pagination-prev button,
          .custom-pagination .ant-pagination-next button {
            font-family: 'Inter', sans-serif;
            color: #1A73E8;
          }

          .custom-pagination .ant-pagination-item-active a {
            color: #fff;
            background: #1A73E8;
            border-color: #1A73E8;
          }

          .custom-pagination .ant-pagination-item:hover a,
          .custom-pagination .ant-pagination-prev:hover button,
          .custom-pagination .ant-pagination-next:hover button {
            color: #1557b0;
            border-color: #1557b0;
          }

          @media (max-width: 768px) {
            .book-card,
            .genre-card {
              width: 100%;
              max-width: 300px;
              margin: 0 auto;
            }
            .book-card img {
              height: 260px;
            }
            .genre-card img {
              height: 160px;
            }
          }
        `}
      </style>
    </div>
  );
};

export default BookList;