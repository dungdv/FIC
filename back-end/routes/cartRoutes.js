const express = require("express");
const router = express.Router();

const getCart = require("../controllers/cart/getCart");
const postCart = require("../controllers/cart/postCart");
const deleteCart = require("../controllers/cart/deleteCart");
const verifyToken = require("../middleware/auth");

router.get("/cart", verifyToken, getCart);
router.post("/addcart", verifyToken, postCart);
router.delete("/item/:bookId", verifyToken, deleteCart);

module.exports = router;
