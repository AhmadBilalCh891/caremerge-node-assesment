exports.setBodyTags = (res) => {
	res.write(
		`<html>
            <head>
                <title>
                    Get Website Title From URL
                </title>
            </head>
        <body>
            <h1>
                Following are the titles of given websites: 
            </h1>
            <ul>`
	);
};

exports.setBodyClosingTags = (res) => {
    if(!res.finished){
	res.write(`
            </ul>
        <body>
    </html>`);
	res.end();}
};

exports.setTitle = (res, title) => {
	res.write(`<li> ${title} </li>`);
};

exports.setMessageForAddress = (res) => {
	res.write(
		`<h2>
            Enter website address in URL
        </h2>`
	);
	res.end();
};

exports.setErrorMessage = (res, message) => {
	res.write(message);
};
