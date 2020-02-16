const express = require('express');
const topicService = require('../service/topicService');

const topicRouter = express.Router();

topicRouter.get('/:topic', async (req, res) => {
    const {topic} = req.params;
    const response = await topicService.getTopic(topic);
    res.status(200).send(response);
});

module.exports = topicRouter;