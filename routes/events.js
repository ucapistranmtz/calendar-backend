const { Router } = require('express');
const { check } = require('express-validator');
const {
  getEvents,
  newEvent,
  updateEvent,
  deleteEvent,
} = require('../controllers/events');

const { inputValidator } = require('../middlewares/inputValidator');
const { isDate } = require('../helpers/isDate');

const router = Router();

//all routes should validate the token
router.use(inputValidator);
//Get eventos
router.get('/', getEvents);

// Create new event

router.post(
  '/',
  [
    check('title', 'title is required').not().isEmpty(),
    check('start', 'start date  is required').custom(isDate),
  ],
  newEvent,
);

//update event
router.put('/:id', updateEvent);

//delete event
router.delete('/:id', deleteEvent);

module.exports = router;
