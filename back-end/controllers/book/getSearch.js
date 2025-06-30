const Book = require("../../models/Book");

module.exports = async (req, res) => {
  try {
    const { name, genre } = req.query;
    const filter = {};
    if (name) filter.name = new RegExp(name, "i");

    if (genre) filter.genre = new RegExp(genre, "i");

    const books = await Book.find(filter);
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
