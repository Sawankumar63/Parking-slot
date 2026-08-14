const express = require("express");
const auth = require("../middleware/auth");
const bookingController = require("../controllers/bookingController");

const router = express.Router();

router.post("/", auth, bookingController.createBooking);

module.exports = router;
