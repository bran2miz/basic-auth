'use strict';

function handle404(req, res, next) {
  const errorObject = {
    status: 404,
    message: 'Sorry, what your looking for is not here'
  };
  res.status(404).json(errorObject);
};

module.exports = handle404