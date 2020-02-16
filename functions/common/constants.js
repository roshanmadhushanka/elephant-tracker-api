const IMU_READINGS_COLLECTION = 'imu_readings';
const GPS_READINGS_COLLECTION = 'gps_readings';
const ELEPHANT_COLLECTION = 'elephants_data';
const ELEPHANT_IMAGE_DIRECTORY_PATH = 'Elephants';
const SOCKET_SERVER_PORT = 4000;

const TOPIC = {
    ELEPHANT_COUNT: 'ELEPHANT_COUNT',
    READING_COUNT: 'READING_COUNT',

    getTopic: function getTopic(topic) {
        switch (topic) {
            case TOPIC.ELEPHANT_COUNT:
                return TOPIC.ELEPHANT_COUNT;
            case TOPIC.READING_COUNT:
                return TOPIC.READING_COUNT;
            default:
                throw Error('Un supported topic type');
        }
    }
};

module.exports = {
    IMU_READINGS_COLLECTION,
    GPS_READINGS_COLLECTION,
    ELEPHANT_COLLECTION,
    ELEPHANT_IMAGE_DIRECTORY_PATH,
    SOCKET_SERVER_PORT,
    TOPIC,
};