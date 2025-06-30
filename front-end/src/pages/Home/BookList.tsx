import React, { useState } from "react";
import type { Book } from "../../types/bookType";
import { Card, Pagination, Button } from "antd";
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
    <div style={{ padding: "24px", marginTop: "80px" }}>
      {showGenres ? (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
            gap: "24px",
            justifyContent: "center",
          }}
        >
          {genres.map((genre) => (
            <Card
              key={genre.name}
              hoverable
              className="genre-card"
              style={{
                width: "250px",
                borderRadius: "12px",
                overflow: "hidden",
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)",
                border: "1px solid #e8e8e8",
                background: "#fff",
                transition: "transform 0.2s, box-shadow 0.2s",
              }}
              cover={
                <div
                  style={{
                    width: "100%",
                    height: "200px",
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
                      height: "200px",
                      objectFit: "cover",
                      objectPosition: "center",
                      transition: "transform 0.3s",
                    }}
                  />
                </div>
              }
              onClick={() => handleGenreClick(genre.name)}
            >
              <div
                style={{
                  padding: "16px",
                  textAlign: "center",
                }}
              >
                <h3
                  style={{
                    fontSize: "16px",
                    fontWeight: 600,
                    color: "#333",
                    margin: 0,
                  }}
                >
                  {genre.name}
                </h3>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <>
          <Button
            style={{
              marginBottom: "24px",
              fontSize: "14px",
              padding: "8px 16px",
              borderRadius: "6px",
              color: "#4A90E2",
              borderColor: "#4A90E2",
            }}
            onClick={handleBackToGenres}
          >
            Quay lại thể loại
          </Button>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
              gap: "24px",
              justifyContent: "center",
            }}
          >
            {currentBooks.map((book) => (
              <Card
                key={book.id}
                hoverable
                className="book-card"
                style={{
                  width: "250px",
                  borderRadius: "12px",
                  overflow: "hidden",
                  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)",
                  border: "1px solid #e8e8e8",
                  background: "#fff",
                  transition: "transform 0.2s, box-shadow 0.2s",
                }}
                cover={
                  <div
                    style={{
                      width: "100%",
                      height: "300px",
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
                        height: "300px",
                        objectFit: "contain",
                        objectPosition: "center",
                        transition: "transform 0.3s",
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
                    gap: "12px",
                    minHeight: "100px",
                  }}
                >
                  <h3
                    style={{
                      fontSize: "16px",
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
                  </h3>
                  <p
                    style={{
                      fontSize: "14px",
                      color: "#666",
                      margin: 0,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {book.author || "Unknown Author"}
                  </p>
                </div>
              </Card>
            ))}
          </div>
          <Pagination
            current={currentPage}
            total={books.length}
            pageSize={itemsPerPage}
            onChange={handlePageChange}
            style={{ textAlign: "center", marginTop: "32px" }}
          />
        </>
      )}
      <style>
        {`
          .book-card:hover,
          .genre-card:hover {
            transform: translateY(-6px);
            box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12);
          }
          .book-card:hover img,
          .genre-card:hover img {
            transform: scale(1.03);
          }
          @media (max-width: 768px) {
            .book-card,
            .genre-card {
              width: 100%;
              max-width: 280px;
              margin: 0 auto;
            }
            .book-card img {
              height: 280px;
            }
            .genre-card img {
              height: 180px;
            }
          }
        `}
      </style>
    </div>
  );
};

export default BookList;
