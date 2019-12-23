const configureServer = require('./graphql/server');
const functions = require('firebase-functions');

const server = configureServer();

module.exports = {
  api: functions.https.onRequest(server),
};
