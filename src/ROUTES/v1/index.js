const express = require('express');
const { BookingController } = require('../../CONTROLLER/index');
const router = express.Router();

const bookingController = new BookingController();

router.post('/bookings', bookingController.create);
// router.post('/publish', bookingController.sendMessageToQueue);


module.exports = router;

