const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  statement: {
    type: String,
    required: true
  }
});

const Application = mongoose.model('Application', applicationSchema);

module.exports = Application;
