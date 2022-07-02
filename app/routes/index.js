module.exports = (app) => {
	const Task = require('../controllers/tasks.controller.js');

	var router = require('express').Router();

	router.post('1/I/want/title/', Task.executeTask1);

	// other url handling
	router.post('*', (request, response) => {
		response.status(404).send('Not found');
	});

	app.use('/api/task', router);
};
