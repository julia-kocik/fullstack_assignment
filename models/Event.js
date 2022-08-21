const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
    firstName: {
        type: String,
        // required: [true, 'Please provide a first name']
    },
    lastName: {
        type: String,
        // required: [true, 'Please provide a last name']
    },
    email: {
        type: String,
        // required: [true, 'Please provide an email'],
        // match: [
        //    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
        //     "Please provide a valid email"
        // ],
    },
    date: {
        type: Date,
        // required: [true, 'Please provide a date'],
    },
});

const Event = mongoose.model("Event", EventSchema);

module.exports = Event;