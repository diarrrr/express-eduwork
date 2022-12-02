const router = require('express').Router();
const multer = require('multer');
const upload = multer({dest: 'upload'});
const Product = require('./model');
const path = require('path');
const fs = require('fs');


router.post('/product', upload.single('image'), (req,res) => {
    const {name, price, stock, statu} = req.body;
    const image = req.file
    if(image) {
        const target = path.join(__dirname, '../../upload', image.originalname);
        fs.renameSync(image.path, target) 
        Product.create({name, price, stock, statu, image_url:`http://localhost:5000/public/${image.originalname}`})
        .then(result => res.send(result))
        .catch(error => res.send(error));
    }} );

router.get('/product', (req, res) => {
        Product.find()
        .then(result => res.send(result))
        .catch(error => res.send(error));
    });

module.exports = router