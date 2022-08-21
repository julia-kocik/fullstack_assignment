const Event = require('../models/Event');

exports.getEvents = async (req, res, next) => {
    try {
      const events = await Event.find();
        res.json({message: 'OK', data: events});
      }
      catch(err) {
        res.status(500).json({ message: err });
      }}

exports.postEvent = async (req, res, next) => {
    try {
        const { firstName, lastName, email, date } = req.body;
        const provide = 'Please provide'
        if(!firstName) {
          res.status(500).json({ message: `${provide} firstname` });
        } 
         if(!lastName) {
          res.status(500).json({ message: `${provide} lastname` });
        } else if(!email) {
          res.status(500).json({ message: `${provide} email` });
        } else if(!date) {
          res.status(500).json({ message: `${provide} date` });
        } 
        const emailPattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        const correctEmail = email.match(emailPattern);
        console.log(correctEmail)
        if(!correctEmail) {
          res.status(500).json({ message: `${provide} a valid email` });
        }
        const newEvent = new Event({ firstName, lastName, email, date });
        await newEvent.save();
        res.status(200).json({ message: 'OK' });
      } catch(err) {
        console.log(err)
        let message;
        if(err.code === 11000) message='Duplicate email'
        res.status(500).json({ message });
      }
}