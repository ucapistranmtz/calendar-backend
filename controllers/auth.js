const { response } = require('express');
const { validationResult } = require('express-validator');

const User = require('../models/User');

const registerUser = async (req, res = response) => {
  const { name, email, password } = req.body;
  try {
    const user = new User(req.body);
    await user.save();

    res.status(201).json({
      ok: false,
      ok: true,
      msg: 'register',
      name,
      email,
      password,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      ok: false,
      error: 'please contact the administrator',
    });
  }
};

const loginUser = (req, res = response) => {
  const { email, password } = req.body;

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
