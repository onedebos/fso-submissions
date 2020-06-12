const unknownEndPoint = (request, response) => {
  response.status(404).send({ error: 'Endpoint does not exist' });
};

const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization');
  if (authorization && authorization.toLowerCase().startsWith('bearer')) {
    request.token = authorization.substring(7);
  }

  // if (authorization === undefined || authorization === null) {
  //   return response.status(401).json({ error: 'token missing or invalid' });
  // }

  next();
};

module.exports = { unknownEndPoint, tokenExtractor };
