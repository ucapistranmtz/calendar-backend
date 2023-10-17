const { Router } = require('express');
const { registerUser, loginUser, renewToken } = require('../controllers/auth');
const { check } = require('express-validator');
const { inputValidator } = require('../middlewares/inputValidator');
const jwtValidator = require('../middlewares/jwtValidator');
const router = Router();

router.post(
  '/new',
  [
    check('name', 'name is required').not().isEmpty(),
    check('email', 'email is required').isEmail(),
    check('password', 'password should have minimun 6 characters').isLength({
      min: 6,
    }),
    inputValidator,
  ],
  registerUser,
);

router.post(
  '/',
  [
    check('email', 'email is required').isEmail(),
    check('password', 'password should have minimun 6 characters').isLength({
      min: 6,
    }),
    inputValidator,
  ],
  loginUser,
);

router.get('/renew', jwtValidator, renewToken);

module.exports = router;
