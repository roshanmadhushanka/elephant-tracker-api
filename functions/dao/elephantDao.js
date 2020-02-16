const constants = require('../common/constants');
const collectionManager = require('../handler/collectionHandler');

const collection = collectionManager.getCollection(constants.ELEPHANT_COLLECTION);

async function getAllElephants() {
    const elephantSnapshot = await collection.get();
    const elephants = [];

    elephantSnapshot.forEach(
        (doc) => {
            elephants.push({
                id: doc.id,
                data: doc.data()
            });
        }
    );
    return elephants;
}

async function getElephantIds() {
    const elephantSnapshot = await collection.get();
    const elephantIds = [];
    elephantSnapshot.forEach(
        (doc) => {
            elephantIds.push(doc.data().elephantId);
        }
    );
    return elephantIds;
}

async function getElephant(elephantId) {
    const elephantSnapshot = await collection.where('elephantId', '==', elephantId).limit(1).get();
    elephantSnapshot.forEach(
        (doc) => {
            return {
                id: doc.id,
                data: doc.data()
            }
        }
    );
    return undefined;
}

async function saveElephant(elephantId, name, age, gender, description, image) {
    const data = {
        elephantId,
        name,
        age,
        gender,
        description,
        image,
    };

    const response = await collection.add(data);
    return response.id;
}

async function deleteAllElephants() {
    let deletedRecords = [];
    await collection.listDocuments().then(val => {
        return val.map((val) => {
            deletedRecords.push(val.id);
            return val.delete();
        })
    });
    return deletedRecords;
}

async function getElephantCount() {
    const elephantSnapshot = await collection.get();
    return elephantSnapshot.size;
}

module.exports = {
    getAllElephants,
    getElephantIds,
    getElephant,
    saveElephant,
    deleteAllElephants,
    getElephantCount,
};