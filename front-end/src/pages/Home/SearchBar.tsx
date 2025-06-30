import React, { useState } from "react";
import { Input } from "antd";
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
    <div style={{ padding: "80px 20px 20px", textAlign: "center" }}>
      <h1 style={{ fontSize: "36px", marginBottom: "20px" }}>TÌM KIẾM</h1>
      <Search
        placeholder="Search for books or authors"
        onSearch={handleSearch}
        style={{ width: 400, marginBottom: "20px" }}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        allowClear
      />
      {isLoading ? (
        <div style={{ marginTop: "20px" }}>Loading...</div>
      ) : (
        <BookList
          books={books}
          searchTerm={searchTerm}
          selectedGenre={selectedGenre}
          setSelectedGenre={setSelectedGenre}
        />
      )}
    </div>
  );
};

export default SearchBar;
