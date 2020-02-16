const express = require('express');
const elephantService = require('../service/elephantService');

const elephantRouter = express.Router();

elephantRouter.get('/ids/:elephantId', async (req, res) => {
    const {elephantId} = req.params;
    const response = await elephantService.getImageUrl(elephantId);
    res.status(200).send(response);
});

elephantRouter.post('/', async (req, res) => {
    const {name, age, gender, description, image} = req.body;
    const response = await elephantService.saveElephant(name, age, gender, description, image);
    res.status(200).send(response);
});

elephantRouter.delete('/', async (req, res) => {
    const response = await elephantService.deleteAllElephants();
    res.status(200).send(response);
});

elephantRouter.get('/', async (req, res) => {
    const response = await elephantService.getAllElephants();
    res.status(200).send(response);
});

elephantRouter.get('/ids', async (req, res) => {
    const response = await elephantService.getElephantIds();
    res.status(200).send(response);
});

module.exports = elephantRouter;