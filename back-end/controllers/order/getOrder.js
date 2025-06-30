const Order = require("../../models/Order");

module.exports = async (req, res) => {
  try {
    const userId = req.user._id;

    const orders = await Order.find({ userId })
      .populate("items.book")
      .sort({ createdAt: -1 });

    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
