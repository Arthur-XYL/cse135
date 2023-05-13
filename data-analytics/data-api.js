const mongoose = require('mongoose');
const express = require('express');

const static_data = require('./routes/static_data');
const performance_data = require('./routes/performance_data');
const activity_data = require('./routes/activity_data');

const app = express();
app.use(express.json());
app.use('/static_data', static_data);
app.use('/performance_data', performance_data);
app.use('/activity_data', activity_data);

mongoose
    .connect('mongodb://127.0.0.1:27017/UserData')
    .then(() => {
        app.listen(3001, () => {
            console.log("Node is running on port 3001");
        });
    }).catch((error) => {
        console.log(error);
    });