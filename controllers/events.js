const { response } = require('express');

const getEvents = (req, res = response) => {
  res.status(200).json({
    ok: true,
    msg: 'getting events',
  });
};

const newEvent = (req, res = response) => {
  res.status(201).json({
    ok: true,
    msg: 'New event created',
  });
};

const updateEvent = (req, res = response) => {
  res.status(200).json({
    ok: true,
    msg: 'Event updated',
  });
};

const deleteEvent = (req, res = response) => {
  res.status(200).json({
    ok: true,
    msg: 'Delete updated',
  });
};
module.exports = { getEvents, newEvent, updateEvent, deleteEvent };
