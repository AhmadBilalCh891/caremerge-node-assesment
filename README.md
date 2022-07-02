## Problem Statement

Create a node server which responds to one and only one route : GET /I/want/title
This route expects a list of websites addresses in query string format e.g.

/I/want/title/?address=google.com
etc.

The number of addresses can be more than one.

The route will make request to each of the address passed to it. It will parse out the <title></title> tags, render them in html and send back the html in response. e.g. the response to above #3 example would be:

<html>
<head></head>
<body>

    <h1> Following are the titles of given websites: </h1>

    <ul>
       <li> google.com - "Google" </li>
       <li> www.dawn.com/events/ - "Events - DAWN.COM" </li>
    </ul>
</body>
</html>
For all other routes, the server should return HTTP code 404 .

## Tasks

1 - Implement the above task using plain node.js callbacks (you can use express or http or any other helper module but nothing which absracts control flow).

2 - Implement the above using some kind of flow library e.g. async.js or step.js.

3 - Implement the above using Promises. You could use any library e.g. RSVP or Q.

Bonus* - Implement the above using Streams e.g. bacon.js or RxJs



## Install
To install the dependencies:

    npm install

For error related to express (Cannot find module 'express'):

    npm install express


## Start Server
To start the server:

    npm start
In dev mode
    npm run dev

## Example
Run following example commands for each of the questions:<br>

    http://localhost:3000/api/task1/I/want/title/?address=www.google.com.pk
    http://localhost:3000/api/task2/I/want/title/?address=www.google.com.pk&address=www.twitter.com
    http://localhost:3000/api/task3/I/want/title/?address=www.google.com.pk&address=www.twitter.com
    http://localhost:3000/api/bonus/I/want/title/?address=www.google.com.pk&address=www.twitter.com


