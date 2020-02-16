const {admin} = require('../common/firbaseAdmin');

const db = admin.firestore();

function getCollection(collectionName) {
    return db.collection(collectionName);
}

module.exports = {
    getCollection
};