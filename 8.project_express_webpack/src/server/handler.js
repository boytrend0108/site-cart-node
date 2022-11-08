const fs = require('fs');
const cart = require('./cart');// connect cart.js
const logger = require('./logger');// connect logger



const actions = {
    add: cart.add,
    change: cart.change,
    remove: cart.remove,
};


const handler = (req, res, action, file) => {//file is abs.link to ./userCart.json
    fs.readFile(file, 'utf-8', (err, data) => {// here data-is our userCart.json
        if (err) {// hanling err 
            res.sendStatus(404, JSON.stringify({ result: 0, text: err }));
        } else {// if ok, ('name' we'll use in logger)
            // actions[action] - is method from cart.js: add(..) or cart.change() or cart.remove()
            const { name, newCart } = actions[action](JSON.parse(data), req);// go to cart.js 
            fs.writeFile(file, newCart, (err) => {//file is abs.link to ./userCart.json
                if (err) {
                    res.send('{"result": 0}');
                } else {
                    logger(name, action);
                    const Cart = JSON.parse(newCart);// Cart-is our uppdated cart
                    res.send({ result: 1, Cart });// send data out(in this case to CartComp)
                }
            })
        }
    });
};

module.exports = handler; 
