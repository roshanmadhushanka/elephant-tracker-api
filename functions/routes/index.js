const express = require('express');

const imuReadingRouter = require('./imuReadingRouter');
const commonRouter = require('./commonRouter');
const elephantRouter = require('./elephantRouter');
const topicRouter = require('./topicRouter');

const indexRouter = express.Router();

// Router definitions
indexRouter.use('/', commonRouter);
indexRouter.use('/imuReadings', imuReadingRouter);
indexRouter.use('/elephants', elephantRouter);
indexRouter.use('/topics', topicRouter);

module.exports = indexRouter;
