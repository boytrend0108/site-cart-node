const fs = require('fs');
const cart = require('./cart');// connect cart.js
const logger = require('./logger');// connect logger

const actions = {
    add: cart.add,
    change: cart.change,
    remove: cart.remove,
};


const handler = (req, res, action, file) => {
    fs.readFile(file, 'utf-8', (err, data) => {
        if (err) {// hanling err 
            res.sendStatus(404, JSON.stringify({ result: 0, text: err }));
        } else {// if ok(name we'll use in logger)
            const { name, newCart } = actions[action](JSON.parse(data), req);// go to cart.js 
            fs.writeFile(file, newCart, (err) => {
                if (err) {
                    res.send('{"result": 0}');
                } else {
                    logger(name, action);
                    const Cart = JSON.parse(newCart);
                    res.send({ result: 1, Cart });// send data out
                }
            })
        }
    });
};

module.exports = handler; 
