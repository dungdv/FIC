const Cart = require("../../models/Cart");

module.exports = async function removeFromCart(req, res) {
  const { bookId } = req.params;
  const userId = req.user._id;

  try {
    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: "Giỏ hàng không tồn tại" });
    }

    cart.items = cart.items.filter((item) => item.book.toString() !== bookId);

    await cart.save();
    res.json({ message: "Removed book from cart", cart });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
