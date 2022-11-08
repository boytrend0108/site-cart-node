const express = require('express');
const fs = require('fs');
const handler = require('./handler');// connect handler
const router = express.Router(); // подключаем метод роутер
const logger = require('./logger');
const path = require('node:path');

const cartJSONPath = path.resolve(__dirname, './db/userCart.json');// collect abs.link

// '/' означает пустое место, вместо '/' подставляется /api/cart из app.use('/api/cart', cartRouter) см. server.js
// если запрос GET
router.get('/', (req, res) => {
    //считываем  userCart.json
    fs.readFile(cartJSONPath, 'utf-8', (err, data) => {
        if (err) {// обрабатываем и отправляем ошибку если есть.
            res.sendStatus(404, JSON.stringify({ result: 0, text: err }));
        } else { // если все ок.
            res.send(data); // отдаем данные из userCart.json  
        }
    });
});
// if request POST
router.post('/', (req, res) => {// go to handlder
    handler(req, res, 'add', cartJSONPath);
});
// if request PUT
router.put('/:id', (req, res) => {// go to handlder
    handler(req, res, 'change', cartJSONPath);
});
// if request DELETE
router.delete('/:id', (req, res) => {
    if (req.params.id === `clear`) {
        fs.readFile(cartJSONPath, `utf-8`, (err, data) => {
            const cart = JSON.parse(data);// get content of userCart.json
            // and delete each elem
            for (const el of cart.contents) { cart.contents.splice(el) };
            cart.amount = 0;
            cart.countGoods = 0;
            const clearedCart = JSON.stringify(cart);
            fs.writeFile(cartJSONPath, clearedCart, (err) => {
                if (err) {
                    res.send('{"result": 0}');
                } else {
                    const Cart = JSON.parse(clearedCart);
                    res.send({ result: 1, Cart });// send response out
                    logger(`Cart`, `clear all`);// go to logger
                }
            })
        })
    } else {// if 'id === id of product
        handler(req, res, 'remove', cartJSONPath)
    };
});

module.exports = router;
