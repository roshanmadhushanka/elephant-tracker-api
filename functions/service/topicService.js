const elephantService = require('./elephantService');
const readingService = require('./readingService');
const constants = require('../common/constants');

async function getTopic(topicString) {
    const topic = constants.TOPIC.getTopic(topicString);
    switch (topic) {
        case constants.TOPIC.ELEPHANT_COUNT:
            return await getElephantCount();
        case constants.TOPIC.READING_COUNT:
            return await getReadingCount();
        default:
            return {}
    }
}

async function getElephantCount() {
    const response = await elephantService.getElephantCount();
    return {
        value: response.count
    }
}

async function getReadingCount() {
    const response = await readingService.getImuReadingCount();
    return {
        value: response.count
    }
}

module.exports = {
    getTopic,
};
