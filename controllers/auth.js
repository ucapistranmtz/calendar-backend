const { response } = require('express');
const { validationResult } = require('express-validator');

const registerUser = (req, res = response) => {
  const { name, email, password } = req.body;

  const errors = validationResult(req);

  console.log(errors);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      ok: false,
      errors: errors.mapped(),
    });
  }

  res.status(201).json({
    ok: false,
    ok: true,
    msg: 'register',
    name,
    email,
    password,
  });
};

const loginUser = (req, res = response) => {
  const { email, password } = req.body;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      ok: false,
      errors: errors.mapped(),
    });
  }

  res.status = 200;
  res.json({
    ok: true,
    msg: 'login',
    email,
    password,
  });
};

const renewToken = (req, res = response) => {
  res.status = 200;
  res.json({
    ok: true,
    msg: 'renew',
  });
};

module.exports = { registerUser, loginUser, renewToken };
