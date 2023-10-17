const { response } = require('express');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

const registerUser = async (req, res = response) => {
  const { name, email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (user) {
      res.status(400).json({
        ok: false,
        msg: 'user already exist with this email',
      });
    }

    user = new User(req.body);

    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt);

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

const loginUser = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (!user) {
      res.status(400).json({
        ok: false,
        msg: 'user does not exists',
      });
    }

    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
      res.status(400).json({
        ok: false,
        msg: 'Invalid password',
      });
    }

    res.status = 200;
    res.json({
      ok: true,
      uid: user.id,
      name: user.name,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      ok: false,
      error: 'please contact the administrator',
    });
  }
};

const renewToken = (req, res = response) => {
  res.status = 200;
  res.json({
    ok: true,
    msg: 'renew',
  });
};

module.exports = { registerUser, loginUser, renewToken };
