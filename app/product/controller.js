const connection = require('../../config/mysql')
const path = require('path');
const fs = require('fs');
const multer = require('multer');

const index = (req, res) => {
    connection.query({
        sql: 'SELECT * FROM product',
    }, _response(res));
};

const view = (req, res) => {
    connection.query({
        sql: 'SELECT * FROM product WHERE id=?',
        values : [req.params.id],
    }, _response(res));
};

const destroy = (req, res) => {
    connection.query({
        sql: 'DELETE FROM product WHERE id=?',
        values : [req.params.id],
    }, _response(res));
};

const store = (req, res) => {
    const {user_id, name, price, stock, statu} = req.body;
    const image = req.file
    if(image) {
        const target = path.join(__dirname, '../../upload', image.originalname);
        fs.renameSync(image.path, target) 
    }
    connection.query({
        sql: 'INSERT INTO product (user_id, name, price, stock, statu, image_url) VALUE (?, ?, ?, ?, ?, ?)',
        values : [parseInt(user_id), name, price, stock, statu, `http://localhost:5000/public/${image.originalname}`],
    }, _response(res));
};


const update = (req, res) => {
    const {user_id, name, price, stock, statu} = req.body;
    const image = req.file;
    let sql = '';
    let values = [];
    if(image) {
        const target = path.join(__dirname, '../../upload', image.originalname);
        fs.renameSync(image.path, target) 
        sql = 'UPDATE product SET user_id = ?, name = ?, price = ?, stock = ?, statu = ?, image_url = ? WHERE id=?';
        values = [parseInt(user_id), name, price, stock, statu, `http://localhost:5000/public/${image.originalname}`, req.params.id]
    }else {
        sql = 'UPDATE product SET user_id = ?, name = ?, price = ?, stock = ?, statu = ? WHERE id=?';
        values = [parseInt(user_id), name, price, stock, statu, req.params.id]
    }


    connection.query({sql, values}, _response(res));
};

const _response = (res) => {
    return (error, result) => {
        if(error){
            res.send({
                status: 'failed',
                response: error
            });
        }else{
            res.send({
                status: 'success',
                response: result
            });
        }
    }
}
module.exports = {
    index,
    view,
    store,
    update,
    destroy
}