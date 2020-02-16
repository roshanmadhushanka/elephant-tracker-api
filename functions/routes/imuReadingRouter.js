const express = require('express');
const readingsService = require('../service/readingService');

const imuReadingRouter = express.Router();

imuReadingRouter.post('/', async (req, res) => {
    const { subjectId, accelerationX, accelerationY, accelerationZ, gyroscopeX, gyroscopeY, gyroscopeZ } = req.body;
    const response = await readingsService.saveImuReading(subjectId, accelerationX, accelerationY, accelerationZ,
        gyroscopeX, gyroscopeY, gyroscopeZ);
    res.status(200).send(response);
});

imuReadingRouter.get('/', async (req, res) => {
    const response = await readingsService.getImuReadings();
    res.status(200).send(response);
});

imuReadingRouter.get('/:subjectId', async (req, res) => {
    const {subjectId} = req.params;
    const response = await readingsService.getImuReadingsById(subjectId);
    res.status(200).send(response);
});

imuReadingRouter.delete('/', async (req, res) => {
    const response = await readingsService.deleteImuReadings();
    res.status(200).send(response)
});
module.exports = imuReadingRouter;