const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'gagal slur'));
db.once('open', () => console.log('Server connect slurr'));