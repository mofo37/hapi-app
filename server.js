/* eslint no-console: "off" */
const Hapi = require('hapi');
const mongojs = require('mongojs');


const server = new Hapi.Server();
server.connection({ port: 3000, host: 'localhost' });

server.app.db = mongojs('mongodb://localhost:27017/mountains', ['mountains']);


server.register([
  require('./lib/routes/mountains')
], (err) => {

  if (err) {
    throw err;
  }

  server.start((err) => {
    console.log('Server running at:', server.info.uri);
  });

});

module.exports = server;
