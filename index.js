const restify = require('restify');
const mongoose = require('mongoose');
const config = require('./config');

const dotenv = require('dotenv');
dotenv.config();

const server = restify.createServer();

server.use(restify.plugins.bodyParser());

server.listen(config.PORT, () => {
    mongoose.connect(process.env.MONGODB_URI, { useUnifiedTopology: true, useNewUrlParser: true });
    console.log('Connected to MongoDB!');
});

const db = mongoose.connection;

