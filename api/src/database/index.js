const mongoose = require('mongoose');

const { DB_PORT, DB_HOST, DB_NAME } = process.env;

mongoose.connect(`mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`);
mongoose.Promise = global.Promise;

module.exports = mongoose;
