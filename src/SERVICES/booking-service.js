const axios = require('axios');

const { createChannel, publishMessage } = require('../UTILS/ERRORS/messageQueue');
const { REMINDER_BINDING_KEY } = require('../config/serverconfig');

const { BookingRepository } = require('../REPOSITORY/index');
const { FLIGHT_SERVICE_PATH } = require('../config/serverconfig');
const { ServiceError } = require('../UTILS/ERRORS');

class BookingService {
    constructor() {
        this.bookingRepository = new BookingRepository();
    }

    async createBooking(data) {
        try {
        
            const flightId = data.FlightId;
            const getFlightRequestURL = `${FLIGHT_SERVICE_PATH}/api/v1/flight/${flightId}`;
            const response = await axios.get(getFlightRequestURL);
            // console.log('After making axios request to flight search db',response.data.data);
            const flightData = response.data.data;
            let priceOfTheFlight = flightData.price;
            if(data.noOfSeats > flightData.totalSeats) {
                throw new ServiceError('Something went wrong in the booking process', 'Insufficient seats in the flight');
            }
            const totalCost = priceOfTheFlight*data.noOfSeats;
            const bookingPayload = {...data, totalCost};
            const booking = await this.bookingRepository.create(bookingPayload);
            const updateFlightRequestURL = `${FLIGHT_SERVICE_PATH}/api/v1/flight/${booking.FlightId}`;
            // console.log('After making axios request to flight search sb to get flight ID',updateFlightRequestURL);
            await axios.patch(updateFlightRequestURL, {totalSeats: flightData.totalSeats - booking.noOfSeats});
            const finalBooking = await this.bookingRepository.update(booking.id, {status: "Booked"});

            // publish message in the queue to create notificationticket
            const channel = await createChannel();
            const payload = {
                data1: {
                    subject: "Ticket booked new time",
                    content: "You have coming upcoming flight journey",
                    recepientEmail: "harilalc66@gmail.com",
                    notificationTime: "2023-01-19T01:10:00"
                },
                service: "CREATE_TICKET",
                data2: {
                    subject: "Booking Confirmation new time",
                    content: "Your ticket has been booked",
                    recepientEmail: "harilalc66@gmail.com",
                    notificationTime: new Date()
                },
                mail: "SEND_MAIL"
            };
            publishMessage(channel, REMINDER_BINDING_KEY, JSON.stringify(payload));

            return finalBooking;

        } catch (error) {
            console.log(error);
            if(error.name == 'RepositoryError' || error.name == 'ValidationError') {
                throw error;
            }
            throw new ServiceError();
        }
    }
}

module.exports = BookingService;