const readingsDao = require('../dao/imuReadingDao');

async function getImuReadings() {
    const response = await readingsDao.getAllReadings();
    return {
        data: response
    };
}

function calculatePitchValue(accelerationX, accelerationY, accelerationZ) {
    return Math.atan2(-accelerationX, Math.sqrt(accelerationY * accelerationY + accelerationZ * accelerationZ))
}

function calculateRollValue(accelerationY, accelerationZ) {
    return Math.atan2(accelerationY, accelerationZ);
}

function processImuReadings(response) {

    let rollValue = 0;
    let pitchValue = 0;
    let totalAccelerationX = 0;
    let totalAccelerationY = 0;
    let totalAccelerationZ = 0;
    let accelerationX = 0;
    let accelerationY = 0;
    let accelerationZ = 0;
    let records = [];

    response.forEach(record => {
        accelerationX = record.accelerationX;
        accelerationY = record.accelerationY;
        accelerationZ = record.accelerationZ;

        rollValue += calculateRollValue(accelerationY, accelerationZ);
        pitchValue += calculatePitchValue(accelerationX, accelerationY, accelerationZ);

        totalAccelerationX += accelerationX;
        totalAccelerationY += accelerationY;
        totalAccelerationZ += accelerationZ;

        records.push({
            accelerationX: accelerationX,
            accelerationY: accelerationY,
            accelerationZ: accelerationZ,
            gyroscopeX: record.gyroscopeX,
            gyroscopeY: record.gyroscopeY,
            gyroscopeZ: record.gyroscopeZ,
            timestamp: record.timestamp,
        });
    });

    const averageRollValue = rollValue / response.length;
    const averagePitchValue = pitchValue / response.length;
    const averageAccelerationX = totalAccelerationX / response.length;
    const averageAccelerationY = totalAccelerationZ / response.length;
    const averageAccelerationZ = totalAccelerationZ / response.length;

    let absolutionAccelerationDeviationX = 0;
    let absolutionAccelerationDeviationY = 0;
    let absolutionAccelerationDeviationZ = 0;

    records.forEach(record => {
        absolutionAccelerationDeviationX += Math.abs(record.accelerationX - averageAccelerationX);
        absolutionAccelerationDeviationY += Math.abs(record.accelerationY - averageAccelerationY);
        absolutionAccelerationDeviationZ += Math.abs(record.accelerationZ - averageAccelerationZ);
    });

    const obdaValue = (absolutionAccelerationDeviationX + absolutionAccelerationDeviationY +
        absolutionAccelerationDeviationZ) / (response.length);

     let status = "Undefined";
     if (obdaValue > 0 && obdaValue < 0.05) {
         status = "Resting";
     } else if (obdaValue >= 0.05 && obdaValue < 0.15) {
         status = "Feeding"
     } else if (obdaValue >= 0.15 && obdaValue < 0.30) {
         status = "Walking";
     } else if (obdaValue >= 0.30) {
         status = "Rapidly Walking";
     } else {
         status = "Undefined";
     }


    return {
        roll: averageRollValue.toFixed(4),
        pitch: averagePitchValue.toFixed(4),
        obda: obdaValue.toFixed(4),
        averageAccelerationX: averageAccelerationX.toFixed(4),
        averageAccelerationY: averageAccelerationY.toFixed(4),
        averageAccelerationZ: averageAccelerationZ.toFixed(4),
        records: records,
        status: status,
    };
}

async function getImuReadingsById(subjectId) {
    const response = await readingsDao.getReadings(subjectId);
    const parsedData = processImuReadings(response);

    return {
        values: parsedData.records.reverse(),
        roll: parsedData.roll,
        pitch: parsedData.pitch,
        obda: parsedData.obda,
        averageAccelerationX: parsedData.averageAccelerationX,
        averageAccelerationY: parsedData.averageAccelerationY,
        averageAccelerationZ: parsedData.averageAccelerationZ,
        status: parsedData.status,
    }
}

async function saveImuReading(subjectId, accelerationX, accelerationY, accelerationZ, gyroscopeX, gyroscopeY, gyroscopeZ) {
    const response = await readingsDao.saveReading(subjectId, accelerationX, accelerationY, accelerationZ, gyroscopeX,
        gyroscopeY, gyroscopeZ, Date.now());
    return {
        id: response
    }
}

async function deleteImuReadings() {
    const response = await readingsDao.deleteAllReadings();
    return {
        deletedRecords: response
    }
}

async function getImuReadingCount() {
    const response = await readingsDao.getReadingCount();
    return {
        count: response
    }
}

module.exports = {
    getImuReadings: getImuReadings,
    getImuReadingsById: getImuReadingsById,
    saveImuReading: saveImuReading,
    deleteImuReadings: deleteImuReadings,
    getImuReadingCount: getImuReadingCount,
};