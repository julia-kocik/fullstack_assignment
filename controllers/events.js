const Event = require('../models/Event');

exports.getEvents = async (req, res, next) => {
    try {
      const events = await Event.find();
        res.json({message: 'OK', data: events});
      }
      catch(err) {
        res.status(500).json({ message: err });
      }
  }

exports.deleteEvents = async (req, res, next) => {
    try {
      const events = await Event.deleteMany();
        res.json({message: 'OK', data: events});
      }
      catch(err) {
        console.log(err)
        res.status(500).json({ message: err });
      }
  }
exports.postEvent = async (req, res, next) => {
    try {
        const { firstName, lastName, email, date } = req.body;
        const emailPattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        const correctEmail = email.match(emailPattern);
        let errorMessage;
        if(!firstName) {
          errorMessage = 'firstname';
        } else if(!lastName) {
          errorMessage = 'last name';
        } else if(!email) {
          errorMessage = 'email';
        } else if(!correctEmail) {
          errorMessage = 'valid email';
        } else if(!date) {
          errorMessage = 'date';
        } 
        if(errorMessage) {
          res.status(500).json({ message: `Please provide a/an ${errorMessage}` });
        }
        await Event.create({ firstName, lastName, email, date });
        res.status(200).json({ message: 'OK' });
      } catch(err) {
        console.log(err)
        let errorMessage;
        if(err.errors?.firstName) {
          errorMessage = 'You have provided incorrect type for a first name. Expected: String';
        } else if(err.errors?.lastName) {
          errorMessage = 'You have provided incorrect type for a last name. Expected: String';
        } else if(err.errors?.email) {
          errorMessage = 'You have provided incorrect type for an email. Expected: String';
        } else if(err.errors?.date) {
          errorMessage = 'You have provided incorrect type for a date. Expected: Date';
        }
        res.status(500).json({ message: errorMessage });
      }
}