const Event = require('../models/Event');

exports.getEvents = async (req, res, next) => {
    try {
      const events = await Event.find();
        res.json({message: 'OK', data: events});
      }
      catch(err) {
        res.status(500);
        res.json({ message: err });
      }
  }

exports.deleteEvents = async (req, res, next) => {
    try {
      const events = await Event.deleteMany();
        res.json({message: 'OK', data: events});
      }
      catch(err) {
        console.log(err)
        res.status(500);
        res.json({ message: err });
      }
  }
exports.postEvent = async (req, res, next) => {
    try {
        const { firstName, lastName, email, date } = req.body;
        await Event.create({ firstName, lastName, email, date });
        res.status(200);
        res.json({ message: 'OK' });
      } catch(err) {
        let errorMessage;
        if(err.errors?.firstName) {
          if(err.errors?.firstName?.kind === 'required') {
            errorMessage = 'Please provide a firstname';
          } else if(err.errors?.firstName?.valueType !== 'string') {
            errorMessage = 'You have provided incorrect type for a first name. Expected: String';
          }
        } else if(err.errors?.lastName) {
            if(err.errors?.lastName?.kind === 'required') {
              errorMessage = 'Please provide a lastname';
            } else if(err.errors?.lastName?.valueType !== 'string') {
              errorMessage = 'You have provided incorrect type for a last name. Expected: String';
            }
        } else if(err.errors?.email) {
          if(err.errors?.email?.kind === 'required') {
            errorMessage = 'Please provide an email';
          } else if(err.errors?.email?.kind === 'regexp') {
            errorMessage = 'Please provide a valid email';
          } else if(err.errors?.email?.valueType !== 'string') {
            errorMessage = 'You have provided incorrect type for a email. Expected: String';
          }
        } else if(err.errors?.date) {
          if(err.errors?.date?.kind === 'required') {
            errorMessage = 'Please provide a lastname';
          } else if(err.errors?.date?.valueType !== 'date') {
            errorMessage = 'You have provided incorrect type for a date. Expected: Date';
          }
        }
        res.status(500);
        res.json({ message: errorMessage || 'Network error'});
      }
}