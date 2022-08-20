const Event = require('../models/Event');

exports.getEvents = async (req, res, next) => {
    try {
        res.json(await Event.find());
      }
      catch(err) {
        res.status(500).json({ message: err });
      }}

exports.postEvent = async (req, res, next) => {
    try {
        const { firstName, lastName, email, date } = req.body;
        const newEvent = new Event({ firstName, lastName, email, date });
        await newEvent.save();
        res.json({ message: 'OK' });
      } catch(err) {
        res.status(500).json({ message: err });
      }
}