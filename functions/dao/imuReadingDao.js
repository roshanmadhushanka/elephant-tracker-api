const constants = require('../common/constants');
const collectionManager = require('../handler/collectionHandler');

const collection = collectionManager.getCollection(constants.IMU_READINGS_COLLECTION);

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

function parseData(data) {
    return {
        subjectId: data.subjectId,
        accelerationX: data.accelerationX,
        accelerationY: data.accelerationY,
        accelerationZ: data.accelerationZ,
        gyroscopeX: data.gyroscopeX,
        gyroscopeY: data.gyroscopeY,
        gyroscopeZ: data.gyroscopeZ,
        timestamp: data.timestamp,
    }
}

async function getReadings(subjectId) {
    const readingsSnapshot = await collection
        .orderBy("timestamp", "desc")
        .where('subjectId', '==', subjectId).limit(50).get();
    const readings = [];
    readingsSnapshot.forEach(
        (doc) => {
            readings.push(parseData(doc.data()));
        }
    );

    return readings;
}

async function saveReading(subjectId, accelerationX, accelerationY, accelerationZ, gyroscopeX, gyroscopeY, gyroscopeZ,
                           timestamp) {
    const data = {
        subjectId,
        accelerationX,
        accelerationY,
        accelerationZ,
        gyroscopeX,
        gyroscopeY,
        gyroscopeZ,
        timestamp
    };

    const response = await collection.add(data);
    return response.id;
}

async function deleteAllReadings() {
    let deletedRecords = [];
    await collection.listDocuments().then(val => {
        return val.map((val) => {
            deletedRecords.push(val.id);
            return val.delete();
        })
    });
    return deletedRecords;
}

async function getReadingCount() {
    const readingSnapshot = await collection.get();
    return readingSnapshot.size;
}

module.exports = {
    getAllReadings,
    getReadings,
    saveReading,
    deleteAllReadings,
    getReadingCount
};