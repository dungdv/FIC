const express = require("express");
const router = express.Router();

const getBooks = require("../controllers/book/getBooks");
const getBookById = require("../controllers/book/getBookById");
const getSearch = require("../controllers/book/getSearch");

router.get("/books", getBooks);
router.get("/books/:id", getBookById);
router.get("/search", getSearch);

module.exports = router;
