import axiosInstance from "./axios";
import type { Book } from "../types/bookType";

export const addToCart = async (
  bookId: string,
  token: string
): Promise<void> => {
  await axiosInstance.post(
    "/addcart",
    { bookId },
    { headers: { Authorization: `Bearer ${token}` } }
  );
};

export const getCartItems = async (token: string): Promise<Book[]> => {
  try {
    const response = await axiosInstance.get("/cart", {
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = response.data;
    if (!data || !data.items) {
      console.warn("No items found in response:", data);
      return [];
    }
    return data.items.map((item: any) => ({
      id: item.book._id || item.book,
      name: item.book.name || "Unknown Title",
      author: item.book.author || "Unknown Author",
      genre: item.book.genre || "Unknown Genre",
      rentalPrice: item.book.rentalPrice || 0,
      stockStatus: item.book.stockStatus || "Available",
      image: item.book.image || "https://via.placeholder.com/150",
      yearPublished: item.book.yearPublished || 0,
      quantity: item.quantity || 1,
    }));
  } catch (error) {
    console.error("Error in getCartItems:", error);
    return [];
  }
};

export const removeFromCart = async (
  bookId: string,
  token: string
): Promise<void> => {
  await axiosInstance.delete(`/item/${bookId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const checkout = async (
  bookIds: string[],
  token: string
): Promise<void> => {
  await axiosInstance.post(
    "/addorder",
    { bookIds },
    { headers: { Authorization: `Bearer ${token}` } }
  );
};

export const getRentalItems = async (token: string): Promise<Book[]> => {
  try {
    const response = await axiosInstance.get("/order", {
      headers: { Authorization: `Bearer ${token}` },
    });

    const orders = Array.isArray(response.data) ? response.data : [];

    const items = orders.flatMap((order: any) =>
      order.items.map(
        (item: any): Book => ({
          id: item.book?._id || item.book,
          name: item.book?.name || "Unknown Title",
          author: item.book?.author || "Unknown Author",
          genre: item.book?.genre || "Unknown Genre",
          rentalPrice: item.price || 0,
          stockStatus: item.book?.stockStatus || "Available",
          image: item.book?.image || "https://via.placeholder.com/150",
          yearPublished: item.book?.yearPublished || 0,
          quantity: item.quantity || 1,
          rentalDays: item.rentalDays || 7,
          rentedAt: item.rentedAt,
          returnDate: item.returnDate,
          status: item.status || "pending",
        })
      )
    );
    return items;
  } catch (error) {
    console.error("Error in getRentalItems:", error);
    return [];
  }
};
