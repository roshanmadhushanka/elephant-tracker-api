const constants = require('../common/constants');
const collectionManager = require('../handler/collectionHandler');

const collection = collectionManager.getCollection(constants.GPS_READINGS_COLLECTION);

async function getAllReadings() {
    const readingsSnapshot = await collection.get();
    const readings = [];

    readingsSnapshot.forEach(
        (doc) => {
            readings.push({
                id: doc.id,
                data: doc.data()
            });
        }
    );
    return readings;
}

async function getReadings(subjectId) {
    const readingsSnapshot = await collection
        .orderBy("timestamp", "desc")
        .where('subjectId', '==', subjectId).limit(5).get();
    const readings = [];
    readingsSnapshot.forEach(
        (doc) => {
            readings.push(parseData(doc.data()));
        }
    );

    return readings;
}

module.exports = {
    getAllReadings,
    getReadings,
};