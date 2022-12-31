const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const { Port } = require('./config/serverconfig');
const apiRoutes = require('./ROUTES/index')

const setupserver = () => {

    app.use(bodyparser.json());
    app.use(bodyparser.urlencoded({extended: true}));
    app.use('/api',apiRoutes);

    app.listen(Port, () => {
        console.log(`Server started on port ${Port}`);
    })
}

setupserver();
