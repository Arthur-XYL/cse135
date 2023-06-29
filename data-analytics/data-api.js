const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');

const static_data = require('./routes/static_data');
const performance_data = require('./routes/performance_data');
const activity_data = require('./routes/activity_data');

const app = express();
app.use(express.json());
app.use(cors()); // Enable CORS for all routes
app.use('/static_data', static_data);
app.use('/performance_data', performance_data);
app.use('/activity_data', activity_data);

const uri = "mongodb+srv://yxiong:CYsxs5834XYL@cluster0.fwiefdo.mongodb.net/UserData?retryWrites=true&w=majority";

mongoose
    .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        app.listen(3001, () => {
            console.log("Node is running on port 3001");
        });
    }).catch((error) => {
        console.log(error);
    });
