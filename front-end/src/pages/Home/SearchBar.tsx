import React, { useState } from "react";
import { Input, Typography, Spin } from "antd";
import { useQuery } from "@tanstack/react-query";
import { searchBooks } from "../../services/bookService";
import BookList from "./BookList";
import type { Book } from "../../types/bookType";

const { Search } = Input;

const SearchBar: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);

  const { data: books = [], isLoading } = useQuery<Book[], Error>({
    queryKey: ["books", searchTerm, selectedGenre],
    queryFn: () => searchBooks(searchTerm, selectedGenre || ""),
  });

  const handleSearch = (value: string) => {
    setSearchTerm(value.trim());
  };

  return (
    <div
      style={{
        padding: "100px 24px 24px",
        textAlign: "center",
        background: "linear-gradient(180deg, #f5faff 0%, #ffffff 100%)",
        minHeight: "100vh",
      }}
    >
      <Typography.Title
        level={1}
        style={{
          fontSize: "40px",
          fontFamily: "'Poppins', sans-serif",
          fontWeight: 700,
          color: "#1A73E8",
          marginBottom: "32px",
          animation: "fadeIn 1s ease-in-out",
        }}
        className="search-title"
      >
        TÌM KIẾM
      </Typography.Title>
      <Search
        placeholder="Tìm kiếm sách hoặc tác giả"
        onSearch={handleSearch}
        style={{
          width: "min(90%, 500px)",
          marginBottom: "32px",
          fontFamily: "'Inter', sans-serif",
        }}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        allowClear
        size="large"
        className="custom-search"
      />
      {isLoading ? (
        <Spin
          size="large"
          style={{ marginTop: "24px", color: "#1A73E8" }}
          tip="Đang tải sách..."
        />
      ) : (
        <BookList
          books={books}
          searchTerm={searchTerm}
          selectedGenre={selectedGenre}
          setSelectedGenre={setSelectedGenre}
        />
      )}
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500&family=Poppins:wght@700&display=swap');

          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(-10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          .search-title {
            text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          }

          .custom-search .ant-input-search {
            border-radius: 12px !important;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
            transition: all 0.3s ease;
            border: 2px solid transparent;
            background: linear-gradient(white, white) padding-box,
                        linear-gradient(45deg, #1A73E8, #34c759) border-box;
          }

          .custom-search .ant-input-search:hover,
          .custom-search .ant-input-search:focus-within {
            transform: scale(1.02);
            box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
            border-color: #1A73E8;
          }

          .custom-search .ant-input {
            font-size: 16px;
            font-family: 'Inter', sans-serif;
            color: #333;
          }

          .custom-search .ant-input-clear-icon {
            font-size: 16px;
            color: #1A73E8;
            transition: color 0.3s ease;
          }

          .custom-search .ant-input-clear-icon:hover {
            color: #1557b0;
          }

          .custom-search .ant-btn {
            border-radius: 0 12px 12px 0 !important;
            background: #1A73E8;
            border-color: #1A73E8;
            transition: background 0.3s ease;
          }

          .custom-search .ant-btn:hover {
            background: #1557b0;
            border-color: #1557b0;
          }

          @media (max-width: 768px) {
            .search-title {
              font-size: 32px;
            }
            .custom-search {
              width: 100% !important;
            }
          }
        `}
      </style>
    </div>
  );
};

export default SearchBar;
