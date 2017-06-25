const Boom = require('boom');

exports.register = function (server, options, next) {
  const db = server.app.db;

  server.route({
    method: 'GET',
    path: '/mountains',
    handler: function (request, reply) {
      db.mountains.find((err, mountains) => {
        if (err) {
          return reply(Boom.wrap(err, 'FAILURE'));
        }
        reply(JSON.stringify(mountains));
      });
    }
  });

  server.route({
    method: 'GET',
    path: '/mountains/{id}',
    handler: function (request, reply) {
      db.mountains.findOne({ 'id': request.params.mountainId }, (err, mountains) => {
        if (err) {
          return reply(Boom.wrap(err, 'FAILURE'));
        }
        reply(JSON.stringify(mountains));
      });
    }
  });

  server.route({
    method: 'POST',
    path: '/mountains',
    handler: function (request, reply) {
      db.mountains.insert({ 'name': request.payload.name, 'height': request.payload.height }, (err, mountains) => {
        if (err) {
          return reply(Boom.wrap(err, 'FAILURE'));
        }
        reply(JSON.stringify(mountains));
      });
    }
  });

  return next();

};

exports.register.attributes = {
  name: 'routes-mountains'
};
