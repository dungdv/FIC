export interface Book {
  id: string;
  name?: string;
  author?: string;
  genre?: string;
  rentalPrice?: number;
  stockStatus?: "in stock" | "out of stock";
  image?: string;
  yearPublished?: number;
  detail?: string;
  rentalDays?: number;
  quantity?: number;
  rentedAt?: string;
  returnDate?: string;
  status?: "pending" | "active" | "returned" | "cancelled";
}
