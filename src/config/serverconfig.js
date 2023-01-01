const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    Port: process.env.PORT,
    DB_SYNC: process.env.DB_SYNC
}