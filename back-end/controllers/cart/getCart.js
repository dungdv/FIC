const Cart = require("../../models/Cart");

module.exports = async (req, res) => {
  try {
    const userId = req.user._id;

    const cartItems = await Cart.findOne({ userId }).populate("items.book");

    if (!cartItems) {
      return res.status(404).json({ message: "Giỏ hàng trống" });
    }

    res.json(cartItems);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
