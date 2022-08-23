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

//We can validate request data or catch database validation error 
//Here implemented both options
exports.postEvent = async (req, res, next) => {
    try {
        const { firstName, lastName, email, date } = req.body;
        const emailPattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        const correctEmail = email.match(emailPattern);
        const pattern = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;
        const correctDate = date.match(pattern);
        if(firstName && lastName && email && correctEmail && date && correctDate) {
          await Event.create({ firstName, lastName, email, date });
          res.status(200);
          res.json({ message: 'OK' });
        } else {
          let errorMessage;
          if(!firstName) {
            errorMessage = 'Please provide firstname'
          } else if(!lastName) {
            errorMessage = 'Please provide lastname'
          } else if(!email) {
            errorMessage = 'Please provide email'
          } else if(!correctEmail) {
            errorMessage = 'Please provide valid email'
          } else if(!date) {
            errorMessage = 'Please provide date'
          } else if(!correctDate) {
            errorMessage = 'Please provide valid date'
          }
          res.status(500);
          res.json({ message: errorMessage})
        }
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
            errorMessage = 'Please provide a date';
          } else if(err.errors?.date?.valueType !== 'date') {
            errorMessage = 'You have provided incorrect type for a date. Expected: Date';
          }
        }
        res.status(500);
        res.json({ message: errorMessage || 'Network error'});
      }
}