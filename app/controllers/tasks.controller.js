const Async = require('async');
const RSVP = require('rsvp');
const Rx = require('rxjs');
const TaskView = require('../views/tasks.view.js');
const Utils = require('../utils/index.js');

// Execute Task-1: Implement using plain node.js callbacks
exports.executeTask1 = (req, res) => {
	TaskView.setBodyTags(res);

	if (Array.isArray(req.query.address)) {
		let urls = req.query.address;
		for (let url of urls) {
			Utils.getTitle(url, (title) => {
				TaskView.setTitle(res, title);
			});
			if (urls.indexOf(url) === urls.length - 1) {
				TaskView.setBodyClosingTags(res);
			}
		}
	} else {
		Utils.getTitle(req.query.address, (title) => {
			TaskView.setTitle(res, title);
			TaskView.setBodyClosingTags(res);
		});
	}
};

// Execute Task-2: Implement the above using async
exports.executeTask2 = (req, res) => {
	let requests = [];
	TaskView.setBodyTags(res);

	if (Array.isArray(req.query.address)) {
		for (let url of req.query.address) {
			requests.push((callback) => {
				Utils.getTitle(url, (title) => {
					callback(null, title);
				});
			});
		}
	} else {
		requests.push((callback) => {
			Utils.getTitle(req.query.address, (title) => {
				callback(null, title);
			});
		});
	}

	Async.parallel(requests, (err, titles) => {
		if (!err) {
			titles.map((item) => {
				TaskView.setTitle(res, item);
			});
			TaskView.setBodyClosingTags(res);
		}
	});
};

// Execute Task-3: Implement using RSVP Promises
exports.executeTask3 = (req, res) => {
	TaskView.setBodyTags(res);
	if (Array.isArray(req.query.address)) {
		let promises = [];
		for (let url of req.query.address) {
			promises.push(
				new RSVP.Promise((resolve, reject) => {
					Utils.getTitle(url, (title) => {
						resolve(title);
					});
				})
			);
		}
		RSVP.all(promises).then((titles) => {
			titles.map((item) => {
				TaskView.setTitle(res, item);
			});
			TaskView.setBodyClosingTags(res);
		});
	} else {
		new RSVP.Promise((resolve, reject) => {
			Utils.getTitle(req.query.address, (title) => {
				resolve(title);
			});
		}).then((title) => {
			TaskView.setTitle(res, title);
			TaskView.setBodyClosingTags(res);
		});
	}
};

// Execute Task-Bonus: Implement using Promises RXjs
exports.executeBonusTask = (req, res) => {
	TaskView.setBodyTags(res);
	if (Array.isArray(req.query.address)) {
		let promises = [];
		for (let url of req.query.address) {
			promises.push(
				new Promise((resolve, reject) => {
					Utils.getTitle(url, (title) => {
						resolve(title);
					});
				})
			);
		}
		Rx.from(Promise.all(promises)).subscribe((titles) => {
			titles.map((item) => {
				TaskView.setTitle(res, item);
			});
			TaskView.setBodyClosingTags(res);
		});
	} else {
		let promise = new Promise((resolve, reject) => {
			Utils.getTitle(req.query.address, (title) => {
				resolve(title);
			});
		});

		Rx.from(promise).subscribe((title) => {
			TaskView.setTitle(res, title);
			TaskView.setBodyClosingTags(res);
		});
	}
};
