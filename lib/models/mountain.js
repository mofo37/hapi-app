const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  name: {
    type: String,
    required: true
  },
  height: {
    type: Number,
    required: true,
    min: 0,
    max: 11250
  }
});

module.exports = mongoose.model('Mountain', schema);