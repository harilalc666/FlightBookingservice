const { StatusCodes } = require('http-status-codes');

const { BookingService } = require('../SERVICES/index');
const { REMINDER_BINDING_KEY } = require('../config/serverconfig');

const bookingService = new BookingService();

// const create = async (req, res) => {
//     try {
        
//         const response = await bookingService.createBooking(req.body);
//         // console.log("FROM BOOKING CONTROLLER", response);
//         return res.status(StatusCodes.OK).json({
//             message: 'Successfully completed booking',
//             success: true,
//             err: {},
//             data: response
//         })
//     } catch (error) {
//         return res.status(error.statusCode).json({
//             message: error.message,
//             success: false,
//             err: error.explanation,
//             data: {}
//         });
//     }
// }

class BookingController {

    constructor() {
    }

    // async sendMessageToQueue(req, res){
    //     const channel = await createChannel();
    //     const payload = {
    //         data: {
    //             subject: "Testing Mail from RabbitMQ",
    //             content: "Your ticket created",
    //             recepientEmail: "harilalc66@gmail.com",
    //             notificationTime: "2023-01-19T05:35:00"
    //         },
    //         service: "CREATE_TICKET"
    //     };
    //     publishMessage(channel, REMINDER_BINDING_KEY, JSON.stringify(payload));
    //     return res.status(200).json({
    //         message: 'Succesfully published the event'
    //     });
    // }

    async create (req, res) {
        try {
            const response = await bookingService.createBooking(req.body);
            console.log("FROM BOOKING CONTROLLER", response);
            return res.status(StatusCodes.OK).json({
                message: 'Successfully completed booking',
                success: true,
                err: {},
                data: response
            })
        } catch (error) {
            return res.status(error.statusCode).json({
                message: error.message,
                success: false,
                err: error.explanation,
                data: {}
            });
        }
    }
}

module.exports = BookingController;