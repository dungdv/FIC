const Cart = require("../../models/Cart");

module.exports = async (req, res) => {
  const userId = req.user._id;
  const { bookId, quantity = 1, rentalDays = 7 } = req.body;

  try {
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({
        userId,
        items: [{ book: bookId, quantity, rentalDays }],
      });
    } else {
      const existingItem = cart.items.find(
        (item) => item.book.toString() === bookId
      );
      if (existingItem) {
        existingItem.quantity += quantity;
        existingItem.rentalDays = rentalDays;
      } else {
        cart.items.push({ book: bookId, quantity, rentalDays });
      }
    }
    await cart.save();
    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
