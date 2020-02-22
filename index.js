const restify = require('restify');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const config = require('./config');

dotenv.config();

const server = restify.createServer();

server.use(restify.plugins.bodyParser());

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
