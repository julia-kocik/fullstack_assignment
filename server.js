require('dotenv').config({path: "./config.env"});
const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');

// Connect DB
connectDB();

const app = express();

//middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }))
app.use('/api/events', require('./routes/events'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));

process.on("unhandledRejection", (err) => {
    console.log(err);
})