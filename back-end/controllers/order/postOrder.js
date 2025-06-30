const Order = require("../../models/Order");
const Cart = require("../../models/Cart");
const { sendMail } = require("../helpers/sendMail");

module.exports = async (req, res) => {
  try {
    const { _id: userId, email, name } = req.user;

    const cart = await Cart.findOne({ userId }).populate("items.book");
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Giỏ hàng trống" });
    }

    let order = await Order.findOne({ userId });
    if (!order) {
      order = new Order({
        userId,
        items: [],
        totalAmount: 0,
        rentedAt: null,
        returnDate: null,
        status: "pending",
      });
    }

    let totalAmountAdded = 0;
    let maxRentalDays = 0;
    const now = new Date();

    for (const cartItem of cart.items) {
      const { book, quantity, rentalDays } = cartItem;

      if (book.stock < quantity) {
        return res
          .status(400)
          .json({ message: `Sách "${book.name}" không đủ trong kho.` });
      }

      book.stock -= quantity;
      await book.save();

      const price = book.rentalPrice * quantity;
      totalAmountAdded += price;

      maxRentalDays = Math.max(maxRentalDays, rentalDays);

      order.items.push({
        book: book._id,
        quantity,
        rentalDays,
        price,
        rentedAt: now,
        returnDate: new Date(now.getTime() + rentalDays * 864e5),
        status: "active",
      });
    }

    order.totalAmount += totalAmountAdded;

    const newBatchReturn = new Date(now.getTime() + maxRentalDays * 864e5);
    if (!order.returnDate || newBatchReturn > order.returnDate) {
      order.returnDate = newBatchReturn;
    }

    await order.save();
    await Cart.deleteOne({ userId });

    const rentDateStr = now.toLocaleDateString("vi-VN");
    const returnDateStr = newBatchReturn.toLocaleDateString("vi-VN");

    const html = `
      <h2>📚 Thông tin đơn thuê sách</h2>
      ${cart.items
        .map(
          (item) => `
        <p><strong>Tên sách:</strong> ${item.book.name}</p>
        <p><strong>Tác giả:</strong> ${item.book.author}</p>
        <p><strong>Giá thuê:</strong> ${item.book.rentalPrice}đ</p>
        <p><strong>Số lượng:</strong> ${item.quantity}</p>
        <p><strong>Thời gian thuê:</strong> ${item.rentalDays} ngày</p>
        <hr/>
      `
        )
        .join("")}
      <p><strong>Tổng tiền:</strong> ${totalAmountAdded}đ</p>
      <p><strong>Ngày thuê:</strong> ${rentDateStr}</p>
      <p><strong>Ngày trả dự kiến:</strong> ${returnDateStr}</p>
      <p>📬 Cảm ơn ${name} đã sử dụng dịch vụ tại LIBERO!</p>
    `;

    await sendMail(
      email,
      "Xác nhận đơn thuê sách",
      `Dear ${name}, cảm ơn bạn đã đặt sách`,
      html
    );

    return res.status(201).json({ message: "Thuê sách thành công", order });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
