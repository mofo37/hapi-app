const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const app = require('../../lib/routes/mountains');

module.exports = chai.request(app);