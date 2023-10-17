const jwt = require('jsonwebtoken');

const generateJWT = (uid, name) => {
  return new Promise((resolve, reject) => {
    const payload = {
      uid,
      name,
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET_SEED,
      {
        expiresIn: '2h',
      },
      (err, token) => {
        if (err) {
          console.error(err);
          reject('unable to create jwt');
        }
        resolve(token);
      },
    );
  });
};

module.exports = { generateJWT };
