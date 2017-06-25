const Boom = require('boom');

exports.register = function (server, options, next) {
  const db = server.app.db;

  server.route({
    method: 'GET',
    path: '/mountains',
    handler: function (request, reply) {
      db.mountains.find((err, mountains) => {
        console.log("in mountains");
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

// router
//   .get('/', (req, res, next) => {
//     Mountain.find()
//       .then(mountain => res.send(mountains))
//       .catch(next);
//   })

//   .get('/:id', (req, res, next) => {
//     const id = req.params.id;
//     Mountain.findById(id)
//       .then(mountain => {
//         if (!mountain) res.status(404).statusMessage(`${id} not found`);
//         else res.send(mountain);
//       })
//       .catch(next);
//   })

//   .post('/', (req, res, next) => {
//     new Mountain(req.body)
//       .save()
//       .then(mountain => res.send(mountain))
//       .catch(next);
//   })

//   .put('/:id', (req, res, next) => {
//     Mountain.findByIdAndUpdate(req.params.id, req.body, { new: true })
//       .then(mountain => res.send(mountain))
//       .catch(next);
//   })

//   .delete('/:id', (req, res, next) => {
//     Mountain.findByIdAndRemove(req.params.id)
//       .then(response => {
//         res.send({ removed: response ? true : false });
//       })
//       .catch(next);
//   });


exports.register.attributes = {
  name: 'routes-mountains'
};
