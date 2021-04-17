const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
const app = express();
const db = require('./db');
const apiPort = process.env.PORT;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
app.get('/', (req, res) => {
    res.send('Node Server');
});
require('./app/routes')(app);
app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`));
module.exports = app; 