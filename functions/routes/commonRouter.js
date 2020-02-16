const express = require('express');

const commonRouter = express.Router();

commonRouter.get('/', async (req, res) => {
    res.status(200).send({
        description: 'Elephant Tracker API',
        version: '1.0.0',
        author: 'ENTC-15'
    })
});

module.exports = commonRouter;