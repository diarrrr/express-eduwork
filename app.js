const express = require('express');
const app = express();
// const productRouter = require('./app/product/routes');
// const productRouter2 = require('./app/productV2/routes');
require('./config/mongoose');
const productRouter3 = require('./app/productV3/routes');
const productRouter4 = require('./app/productV4/routes');
const logger = require('morgan');
const e = require('express');
const path = require('path');


app.use(logger('dev'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use('/public', express.static(path.join(__dirname, 'upload')))
// app.use('/api/v1', productRouter);
// app.use('/api/v2', productRouter2);
app.use('/api/v3', productRouter3);
app.use('/api/v4', productRouter4);
app.listen(5000, () => console.log('Server: http://localhost:5000'))