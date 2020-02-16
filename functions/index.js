const {api} = require('./common/server');
const {functions} = require('./common/firbaseAdmin');

exports.api = functions.https.onRequest(api);