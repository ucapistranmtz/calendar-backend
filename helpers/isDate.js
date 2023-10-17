const isDate = (value, { req, location, path }) => {
  console.log(value);
  console.log(req);
  console.log(location);
  console.log(path);
};

module.exports = { isDate };
