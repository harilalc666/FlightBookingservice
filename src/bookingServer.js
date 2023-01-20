const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const { Port } = require('./config/serverconfig');
const apiRoutes = require('./ROUTES/index');
// const db = require('./MODELS/index');

const setupserver = () => {

    app.use(bodyparser.json());
    app.use(bodyparser.urlencoded({extended: true}));
    
    app.use('/bookingservice/api',apiRoutes);

    app.listen(Port, () => {
        console.log(`Server started on port ${Port}`);
        // if(process.env.DB_SYNC){
        //     db.sequelize.sync({alter:true})
        // }
    })
}

setupserver();
