const { response } = require('express');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { generateJWT } = require('../helpers/jwt');
const jwt = require('jsonwebtoken');
const jwtValidator = require('../middlewares/jwtValidator');

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
    const token = await generateJWT(user.id, user.name);

    res.status(201).json({
      ok: false,
      ok: true,
      msg: 'register',
      name,
      email,
      token,
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

    const token = await generateJWT(user.id, user.name);
    res.status = 200;
    res.json({
      ok: true,
      uid: user.id,
      name: user.name,
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      ok: false,
      error: 'please contact the administrator',
    });
  }
};

const renewToken = async (req, res = response) => {
  const { uid, name } = req;

  const token = await generateJWT(uid, name);
  try {
  } catch (error) {
    console.error(error);
  }
  res.status = 200;
  res.json({
    ok: true,
    msg: 'renew',
    uid,
    name,
    token,
  });
};

module.exports = { registerUser, loginUser, renewToken };
