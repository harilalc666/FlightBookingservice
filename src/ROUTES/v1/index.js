const express = require('express');
const { BookingController } = require('../../CONTROLLER/index');
const router = express.Router();

const bookingController = new BookingController();

router.post('/bookings', bookingController.create);
router.get('/bookings/:id', bookingController.get);
router.get('/bookings', bookingController.getAll);

module.exports = router;

