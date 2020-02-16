const uuid = require('uuid');
const path = require('path');
const constants = require('../common/constants');
const {bucket, storage} = require('../handler/sotrageHandler');
const elephantDao = require('../dao/elephantDao');

async function getImageUrl(elephantId) {
    const file = bucket.file(path.join(constants.ELEPHANT_IMAGE_DIRECTORY_PATH, elephantId));
    const response = await file.getSignedUrl({
        action: 'read',
        expires: '03-09-2491'
    });
    return {
        url: response[0]
    }
}

async function saveElephant(name, age, gender, description, image) {
    const elephantId = uuid();
    await elephantDao.saveElephant(elephantId, name, age, gender, description, image);
    return {
        id: elephantId
    }
}

async function getElephantIds() {
    const response = await elephantDao.getElephantIds();
    return {
        ids: response
    }
}

async function getAllElephants() {
    const response = await elephantDao.getAllElephants();
    let elephants = [];
    await Promise.all(response.map(async (value, index) => {
        const imageUrl = await getImageUrl(value.data.image);
        elephants.push({
            elephantId: value.data.elephantId,
            name: value.data.name,
            age: value.data.age,
            description: value.data.description,
            image: {
                name: value.data.image,
                url: imageUrl.url,
            },
        })
    }));

    return {
        elephants: elephants,
    };
}

async function deleteAllElephants() {
    const response = await elephantDao.deleteAllElephants();
    return {
        deletedRecords: response
    }
}

async function getElephantCount() {
    const elephantCount = await elephantDao.getElephantCount();
    return {
        count: elephantCount
    }
}


module.exports = {
    getImageUrl,
    saveElephant,
    getElephantIds,
    getAllElephants,
    deleteAllElephants,
    getElephantCount,
};