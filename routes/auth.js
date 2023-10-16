const { Router } = require('express');
const { registerUser, loginUser, renewToken } = require('../controllers/auth');
const { check } = require('express-validator');
const router = Router();

router.post(
  '/new',
  [
    check('name', 'name is required').not().isEmpty(),
    check('email', 'email is required').isEmail(),
    check('password', 'password should have minimun 6 characters').isLength({
      min: 6,
    }),
  ],
  registerUser,
);

router.post(
  '/',

  check('email', 'email is required').isEmail(),
  check('password', 'password should have minimun 6 characters').isLength({
    min: 6,
  }),
  loginUser,
);

router.get('/renew', renewToken);

module.exports = router;
