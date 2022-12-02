const router = require('express').Router();
const Product = require('./modul');
const multer = require('multer');
const upload = multer({dest: 'upload'});
const path = require('path');
const fs = require('fs');

router.post('/product', upload.single('image') , async (req, res) => {
    const {user_id, name, price, stock, status} = req.body;
    const image = req.file;
    if(image) {
        const target = path.join(__dirname, '../../upload', image.originalname);
        fs.renameSync(image.path, target) 
    }

    try {
     await Product.sync();
     const result = await Product.create({user_id, name, price, stock, status, image_url : `http://localhost:5000/public/${image.originalname}`});
     res.send(result);
    }catch(e) {
        res.send(e)
    }
})

module.exports = router
