const { Router } = require('express');
const { getEvents, newEvent, updateEvent } = require('../controllers/events');

const { inputValidator } = require('../middlewares/inputValidator');
const jwtValidator = require('../middlewares/jwtValidator');
const router = Router();

//Get eventos
router.get('/', inputValidator, getEvents);

// Create new event

router.post('/', inputValidator, newEvent);

//update event
router.put('/:id', inputValidator, updateEvent);

module.exports = router;
