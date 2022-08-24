require('dotenv').config({path: "./config.env"});
const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const path = require('path');

// Connect DB
connectDB();

const app = express();

//middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }))
app.use('/api/events', require('./routes/events'));

const PORT = process.env.PORT || 5000;

//serving app
app.use(express.static(path.join(__dirname, '/client/build')));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/client/build/index.html'));
});

const server = app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));

process.on("unhandledRejection", (err) => {
    console.log(err);
    server.close(() => process.exit(1));
})