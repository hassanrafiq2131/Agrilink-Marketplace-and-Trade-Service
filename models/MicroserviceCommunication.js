const mongoose = require("mongoose");

const microserviceCommunicationSchema = new mongoose.Schema({
  serviceName: String,
  operation: String,
  payload: Object,
  response: Object,
});

module.exports = mongoose.model("MicroserviceCommunication", microserviceCommunicationSchema);
