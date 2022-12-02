
const { ObjectID } = require('bson');
const db = require('../../config/mongodb');
const path = require('path');
const fs = require('fs');


const index = (req,res) => {
    db.collection('product').find()
    .toArray()
    .then(result => res.send(result))
    .catch(error => res.send(error));
};

const view = (req,res) => {
    const {id} = req.params;
    db.collection('product').findOne({_id: ObjectID(id)})
    .then(result => res.send(result))
    .catch(error => res.send(error));
};
const store = (req,res) => {
    const {name, price, stock, statu} = req.body;
    const image = req.file
    if(image) {
        const target = path.join(__dirname, '../../upload', image.originalname);
        fs.renameSync(image.path, target) 
        db.collection('product').insertOne({name, price, stock, statu, image_url:`http://localhost:5000/public/${image.originalname}`})
        .then(result => res.send(result))
        .catch(error => res.send(error));
    }
};

module.exports = {
    index,
    view,
    store
}