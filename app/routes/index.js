module.exports = (app) => {
	const Task = require('../controllers/tasks.controller.js');
	const Utils = require('../utils/index.js');
	const router = require('express').Router();

	router.get('/task1/I/want/title/', Utils.validateParams, Task.executeTask1);
	router.get('/task2/I/want/title/', Utils.validateParams, Task.executeTask2);
	router.get('/task3/I/want/title/', Utils.validateParams, Task.executeTask3);
	router.get('/bonus/I/want/title/', Utils.validateParams, Task.executeBonusTask);

	// other url handling
	router.get('*', (request, response) => {
		response.status(404).send('Not found');
	});

	app.use('/api/', router);
};
