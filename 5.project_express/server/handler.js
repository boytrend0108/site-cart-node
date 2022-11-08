const fs = require('fs');
const cart = require('./cart');

const actions = {
  add: cart.add,
  change: cart.change,
};
// в обработчик приходит action:add, change or delete, а file- єто файлы из db : product.json or userCart.js
const handler = (req, res, action, file) => {
  fs.readFile(file, 'utf-8', (err, data) => {//читаем файл
    if (err) {// обрабатіваем ошибку
      res.sendStatus(404, JSON.stringify({ result: 0, text: err }));
    } else {// если все ок то в переменную newCart кладем результат метода actions[action](JSON.parse(data), req).
      //где actions[action]- это cart.add or cart.change(cм. сart.jd),(JSON.parse(data)- распарсенный объект корзина и список товаров, req)
      const newCart = actions[action](JSON.parse(data), req);// newCart єто будет json обновленной корзины.
      fs.writeFile(file, newCart, (err) => {// перезаписуем обновленную карзину в нашу db
        if (err) {
          res.send('{"result": 0}');
        } else {
          res.send('{"result": 1}');
        }
      })
    }
  });
};

module.exports = handler; // экспортируем handler в другие файлы
