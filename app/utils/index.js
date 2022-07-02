const http = require('http');
const TaskView = require('../views/tasks.view.js');

exports.validateParams = (req, res, next) => {
	if (!req.query.address) {
		TaskView.setMessageForAddress(res);
	} else {
		next();
	}
};

exports.getTitle = (url, setTitle) => {
	try {
		let regex = /(<\s*title[^>]*>(.+?)<\s*\/\s*title)>/gi;
		let splitUrl = url.split('/');

		let host = splitUrl.find((item) => {
			return item.includes('.com');
		});

		let options = {
			host: host.includes('www') ? host : `www.${host}`,
			path: splitUrl[1] ? `/${splitUrl[1]}/` : '/',
		};

		let callback = (resp) => {
			resp.on('data', (chunk) => {
				let match = regex.exec(chunk.toString());
				if (match && match[2]) {
					setTitle(
						`${url} - ${
							resp.statusCode == 200 ? match[2] : 'Not found'
						}`
					);
					return;
				}
			});
		};
		http.request(options, callback).end();
	} catch (e) {
		TaskView.setMessageForAddress(res);
	}
};
