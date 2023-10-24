const { response } = require('express');
const Event = require('../models/Event');
  

const getEvents = async (req, res = response) => {
  const events = await Event.find().populate('user', 'name');
  res.status(200).json({
    ok: true,
    events,
  });
};

const newEvent = async (req, res = response) => {
  const newEvent = new Event(req.body);

  try {
    console.log('req.uid', req.uid);
    newEvent.user = req.uid;

    await newEvent.save();
    res.status(201).json({
      ok: true,
      event: newEvent,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      ok: false,
      msg: 'Contact the administrator',
    });
  }
};

const updateEvent = async (req, res = response) => {
  const eventId = req.params.id;

  const uid = req.uid;

  try {
    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({
        ok: false,
        msg: 'event does not exist',
      });
    }

    if (event.user.toString() !== uid) {
      return res.status(401).json({
        ok: false,
        msn: 'User not authorized',
      });
    }

    const newEvent = {
      ...req.body,
      user: uid,
    };

    const updatedEvent = await Event.findByIdAndUpdate(eventId, newEvent);

    res.json({
      ok: true,
      event: updatedEvent,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      ok: false,
      msg: 'Contact the administrator',
    });
  }
};

const deleteEvent = async (req, res = response) => {
  const eventId = req.params.id;

  const uid = req.uid;

  try {
    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({
        ok: false,
        msg: 'event does not exist',
      });
    }

    if (event.user.toString() !== uid) {
      return res.status(401).json({
        ok: false,
        msn: 'User not authorized',
      });
    }

    await Event.findByIdAndDelete(eventId);

    res.json({
      ok: true,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      ok: false,
      msg: 'Contact the administrator',
    });
  }
};
module.exports = { getEvents, newEvent, updateEvent, deleteEvent };
