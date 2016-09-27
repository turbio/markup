const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');

const config = require('../env/config.json');
const routes = require('./routes');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.set('trust proxy', 1);
app.use(session({
  secret: config.secret,
  resave: false,
  saveUninitialized: true,
  httpOnly: false,
  cookie: { secure: false }
}));

app.use(express.static('./client/public'));

app.use(routes);

app.listen(config.server.port, () => {
  console.log(`started on port ${config.server.port}`);
});

module.exports = app;
