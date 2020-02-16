const bodyParser = require('body-parser');
const router = require('../routes');

const express = require('express');
const cors = require('cors');
const api = express();

// Automatically allow cross-origin requests
api.use(cors({ origin: true }));
api.use(bodyParser.json());
api.use(bodyParser.urlencoded({extended: true}));
api.use('/v1', router);

module.exports = {
    api,
};