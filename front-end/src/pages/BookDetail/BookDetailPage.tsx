import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Row,
  Col,
  Typography,
  Image,
  Spin,
  Alert,
  Button,
  InputNumber,
} from "antd";
import AppHeader from "../../components/AppHeader";
import AppFooter from "../../components/AppFooter";
import { getBookById } from "../../services/bookService";
import { useAuth } from "../../hooks/AuthContext";
import { addToCart } from "../../services/cartService";
import type { Book } from "../../types/bookType";
import { isAuthenticated } from "../../utils/auth";

const { Title, Paragraph, Text } = Typography;

const BookDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(isAuthenticated());
  const [quantity, setQuantity] = useState(1);
  const { token } = useAuth();

  useEffect(() => {
    const fetchBookDetails = async () => {
      if (!id) {
        setError("Invalid book ID");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const bookData = await getBookById(id);
        if (!bookData) {
          setError("Book not found");
          setBook(null);
          setLoading(false);
          return;
        }

        setBook(bookData);
      } catch (err) {
        setError("Failed to load book details. Please try again later.");
        console.error("Error fetching book details:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBookDetails();
  }, [id]);

  const handleAddToCart = async () => {
    if (!token) {
      alert("Please login to add items to cart.");
      return;
    }
    if (!book) return;
    try {
      await addToCart(book.id, token);
      alert("Book added to cart!");
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("Failed to add book to cart. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <Spin size="large" />
      </div>
    );
  }

  if (error || !book) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24">
        <Alert message={error || "Book not found"} type="error" showIcon />
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <AppHeader isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24 mb-12">
        <Row gutter={[32, 32]} className="bg-white rounded-lg shadow-lg p-8">
          <Col xs={24} md={10}>
            <Image
              src={book.image || "https://via.placeholder.com/300x450"}
              alt={`Cover of ${book.name || "Unknown"} by ${
                book.author || "Unknown"
              }`}
              preview={false}
              className="w-full h-[500px] object-cover transition-transform duration-300 hover:scale-105"
            />
          </Col>
          <Col xs={24} md={14}>
            <Title
              level={1}
              className="text-4xl font-bold text-gray-900 mb-4 text-center md:text-left"
            >
              {book.name || "Unknown Title"}
            </Title>
            <div className="flex flex-col gap-2 text-base text-gray-600 mb-6 text-center md:text-left">
              <Paragraph>
                <Text strong>Author:</Text> {book.author || "Unknown Author"}
              </Paragraph>
              <Paragraph>
                <Text strong>Genre:</Text> {book.genre || "N/A"}
              </Paragraph>
              <Paragraph>
                <Text strong>Year:</Text> {book.yearPublished || "N/A"}
              </Paragraph>
            </div>
            <Paragraph className="text-3xl font-bold text-red-600 mb-6 text-center md:text-left">
              {book.rentalPrice
                ? `${book.rentalPrice.toLocaleString()} đ`
                : "N/A"}
            </Paragraph>
            <Paragraph className="text-sm text-gray-500 mb-6 text-center md:text-left">
              Status:{" "}
              <span
                className={
                  book.stockStatus === "in stock"
                    ? "text-green-600 font-semibold"
                    : "text-red-600 font-semibold"
                }
              >
                {book.stockStatus
                  ? book.stockStatus === "in stock"
                    ? "In Stock"
                    : "Out of Stock"
                  : "Unknown"}
              </span>
            </Paragraph>
            <Paragraph className="text-base text-gray-700 leading-relaxed mb-8">
              {book.detail || "No description available."}
            </Paragraph>
            <div className="flex justify-center md:justify-start items-center gap-4">
              <InputNumber
                min={1}
                value={quantity}
                onChange={(value) => setQuantity(value as number)}
                className="w-16"
              />
              <Button
                type="primary"
                size="large"
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200"
                onClick={handleAddToCart}
              >
                Thêm vào giỏ hàng
              </Button>
            </div>
          </Col>
        </Row>
      </div>
      <AppFooter />
    </div>
  );
};

export default BookDetailPage;
