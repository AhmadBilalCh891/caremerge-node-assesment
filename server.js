const express = require('express');
const cors = require("cors");

const app = express();
const port = 3000;

var corsOptions = {
    origin: `http://localhost:${port}`
  };

app.use(cors(corsOptions));

// require("./app/routes/index")(app);

app.get('/', (req, res) => {
  res.send('Welcome to Tasks API!');
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});