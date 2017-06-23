const hapi = require('hapi');
const app = hapi();
const morgan = require('morgan');
const bodyParser = require('body-parser');

app.use(morgan('dev'));
app.use(bodyParser.json());

const mountains = require('./routes/mountains');

app.use('/api/mountains', mountains);

module.exports = app;