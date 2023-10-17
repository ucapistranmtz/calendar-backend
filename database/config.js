const mongoose = require('mongoose');

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.DB_CNN, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('DB Online');
  } catch (error) {
    console.error('db connection error ', error);
  }
};

module.exports = { dbConnection };
