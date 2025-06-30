const express = require("express");
const router = express.Router();

const getOrder = require("../controllers/order/getOrder");
const postOrder = require("../controllers/order/postOrder");
const verifyToken = require("../middleware/auth");

router.get("/order", verifyToken, getOrder);
router.post("/addorder", verifyToken, postOrder);

module.exports = router;
