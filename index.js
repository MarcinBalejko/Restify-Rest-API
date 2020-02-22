const restify = require('restify');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const config = require('./config');
const rjwt = require('restify-jwt-community');

dotenv.config();

const server = restify.createServer();

// Middleware
server.use(restify.plugins.bodyParser());

// Protect Routes
// server.use(rjwt({ secret: config.JWT_SECRET }).unless({ path: ['/auth'] })); // Unless it's auth, it should be protected

server.listen(config.PORT, () => {
  mongoose.connect(process.env.MONGODB_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true
  });
});

const db = mongoose.connection;

db.on('open', err => console.log(err));

db.once('open', () => {
  require('./routes/customers')(server);
  require('./routes/users')(server);
  console.log(`Server started on port ${config.PORT}`);
});
