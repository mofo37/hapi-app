const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const app = require('../../server');

// module.exports = chai.request('http://localhost:3000');
module.exports = chai.request(app);