const express = require('express');
const bodyParser = require('body-parser');
const pino = require('express-pino-logger')();
var cors = require('cors');
const queries = require('./queries');

require('dotenv').config();

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(pino);

let whitelist = ['http://localhost:3000'];
let corsOptions = {
  origin: (origin, callback)=>{
    if (whitelist.indexOf(origin) !== -1) {
        callback(null, true)
    } else {
        callback(new Error('Not allowed by CORS'))
    }
  },credentials: true
}
app.use(cors(corsOptions));

/**
 * Post Requests
 */
app.post('/api/discount', queries.createDiscount);
app.post('/api/user', queries.signUp);

/**
 * Get Requests
 */
app.get('/api/discounts', queries.getDiscounts);
app.get('/api/discount', queries.getDiscount);
app.get('/api/group-discount', queries.getGroupDiscount);

var server = app.listen(3001, () =>
  console.log('Express server is running on localhost:3001')
);
