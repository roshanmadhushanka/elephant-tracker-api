const {admin} = require('../common/firbaseAdmin');

const storage = admin.storage();
const bucket = storage.bucket("gs://elephanttracking-1.appspot.com");

module.exports = {
    bucket,
    storage
};
