require('dotenv').load();
console.log(process.env.NODE_ENV);
require('babel-register');
require('./src/lyrics/server/server.js');
