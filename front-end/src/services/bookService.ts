import axiosInstance from "./axios";
import type { Book } from "../types/bookType";

export const getAllBooks = async (): Promise<Book[]> => {
  const response = await axiosInstance.get("/books");
  return response.data.map((book: any) => ({
    id: book._id,
    name: book.name,
    author: book.author,
    genre: book.genre,
    rentalPrice: book.rentalPrice,
    stockStatus: book.stockStatus,
    image: book.image || "https://via.placeholder.com/150",
    yearPublished: book.yearPublished,
    detail: book.detail,
  }));
};

export const getBooksByGenre = async (genre: string): Promise<Book[]> => {
  const response = await axiosInstance.get(`/books/genre/${genre}`);
  return response.data.map((book: any) => ({
    id: book._id,
    name: book.name,
    author: book.author,
    genre: book.genre,
    rentalPrice: book.rentalPrice,
    stockStatus: book.stockStatus,
    image: book.image || "https://via.placeholder.com/150",
    yearPublished: book.yearPublished,
    detail: book.detail,
  }));
};

export const getBookById = async (id: string): Promise<Book> => {
  const response = await axiosInstance.get(`/books/${id}`);
  const book = response.data;
  return {
    id: book._id,
    name: book.name,
    author: book.author,
    genre: book.genre,
    rentalPrice: book.rentalPrice,
    stockStatus: book.stockStatus,
    image: book.image || "https://via.placeholder.com/150",
    yearPublished: book.yearPublished,
    detail: book.detail,
  };
};

export const searchBooks = async (
  name: string,
  genre: string
): Promise<Book[]> => {
  const params: { name?: string; genre?: string } = {};
  if (name) params.name = name;
  if (genre && genre !== "all") params.genre = genre;

  const response = await axiosInstance.get("/search", { params });
  return response.data.map((book: any) => ({
    id: book._id,
    name: book.name,
    author: book.author,
    genre: book.genre,
    rentalPrice: book.rentalPrice,
    stockStatus: book.stockStatus,
    image: book.image || "https://via.placeholder.com/150",
    yearPublished: book.yearPublished,
    detail: book.detail,
  }));
};
