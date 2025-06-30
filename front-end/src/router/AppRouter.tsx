import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/Home/HomePage";
import BookDetailPage from "../pages/BookDetail/BookDetailPage";
import IntroducePage from "../pages/Introduce/IntroducePage";
import CartPage from "../pages/Cart/CartPage";
import RentalStatusPage from "../pages/RentalStatus/RentalStatusPage";

const AppRouter: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/books" element={<HomePage />} />
      <Route path="/book/:id" element={<BookDetailPage />} />
      <Route path="/introduce" element={<IntroducePage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/rental-status" element={<RentalStatusPage />} />
    </Routes>
  );
};

export default AppRouter;
