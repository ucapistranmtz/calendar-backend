const { response } = require('express');
const jwt = require('jsonwebtoken');

const jwtValidator = (req, res = response, next) => {
  const token = req.header('x-token');

  if (!token) {
    return res.status(401).json({
      ok: false,
      msg: 'We can not find the token',
    });
  }

  try {
    const { uid, name } = jwt.verify(token, process.env.JWT_SECRET_SEED);
    req.uid = uid;
    req.name = name;
  } catch (error) {
    console.error(error);
    return res.status(401).json({
      ok: false,
      msg: 'Invalid Token',
    });
  }

  next();
};

module.exports = jwtValidator;
