const { StatusCodes } = require('http-status-codes');

const { Booking } = require('../MODELS/index');
const { AppError, ValidationError } = require('../UTILS/ERRORS/index');

class BookingRepository {
    
    async create(data) {
        try {
            const booking = await Booking.create(data);
            return booking;
        } catch (error) {
            if(error.name == 'SequelizeValidationError') {
                throw new ValidationError(error);
            }
            throw new AppError(
                'RepositoryError', 
                'Cannot create Booking', 
                'There was some issue creating the booking, please try again later',
                StatusCodes.INTERNAL_SERVER_ERROR);
        }
    }

    async update(bookingId, data) {
        try {
            const booking = await Booking.findByPk(bookingId);
            if(data.status) {
                booking.status = data.status;
            }
            await booking.save();
            return booking;
        } catch (error) {
            throw new AppError(
                'RepositoryError', 
                'Cannot update Booking', 
                'There was some issue updating the booking, please try again later',
                StatusCodes.INTERNAL_SERVER_ERROR);
        }
    }

    async get(bookingId) {
        try {
            const bookingdata = await Booking.findByPk(bookingId);
            return bookingdata;
        } catch (error) {
            console.log(error);
            throw{ error }
        }
    }

    async getAll(filter){
        try {
            if(filter.FlightId){
                const booking = await Booking.findAll({
                    where:{
                        FlightId : filter.FlightId
                    }
                })
                return booking;
            }
            else if(filter.userId){
                const booking = await Booking.findAll({
                    where:{
                        userId : filter.userId
                    }
                })
                return booking;
            }
            const booking = await Booking.findAll();
            return booking;
        } catch (error) {
            console.log("Something went wrong in repository");
            throw{ error }
        }
    
    }
}

module.exports = BookingRepository;