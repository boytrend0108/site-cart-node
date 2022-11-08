// Предварительно установили фреймворк express и с помощью команды npm i 
//подключили модули которые указаны в package.json


const express = require('express');
// подключаем его
// подключаем библиотеку для работы с файловой системой
const fs = require('fs');

const app = express();// создаем приложение (экземпляр еxpress)

// Далее подключаем библиотеки "midlewhere", которые будут выполнятся между req и res
//в нашем случае мы указали что експресс будет работать в формате json(ос будет самотоятельно конвертировать данніе json  массивы, объекты и т.д. и обратно в json)
app.use(express.json());
// при запросе к корню нашего сайта '/' отдаем содержимое папки public
app.use('/', express.static('./public'));

// -------------ОПИСАНИЕ ДЕЙСТВИЙ В АПИ-------------------------------------
// получаем данные о продуктах
app.get('/api/products', (req, res) => {// на адресс /api/products
    // считіваем файл по єтому адрессу и передаем в колбек функцию
    fs.readFile('./server/db/products.json', 'utf-8', (err, data) => {
        if (err) res.send(JSON.stringify({ result: 0, err }));// если ошибка- показываем ошибку
        else res.send(data);// если ОК то отправляем данные
    });
});
// получаем данные о товарах в корзине
app.get('/api/cart', (req, res) => {
    fs.readFile('./server/db/userCart.json', 'utf-8', (err, data) => {
        if (err) res.send(JSON.stringify({ result: 0, err }));
        else res.send(data);
    });
});
// при добавлении нового товара в корзину 
app.post('/api/cart', (req, res) => {
    fs.readFile('./server/db/userCart.json', 'utf-8', (err, data) => {// считываем нашу корзину
        if (err) res.send(JSON.stringify({ result: 0, err }));// обрабатваем ошибку
        else { // если ошибок нет 
            const cart = JSON.parse(data); // разпасим data в обїект
            cart.contents.push(req.body);// в обїекте находим contents и пушим в этот массив объект который мы добавляем. body берем из main.js(мы его создаем в момент взаимодействия клиента с сервером). т.к. body єто строка- сервер(благодаря mildlewhere) сам преобразует его в нужній формат.

            // делее перезаписуем файл userCart.json (обновленная корзина)
            fs.writeFile('./server/db/userCart.json', JSON.stringify(cart), (err) => {
                if (err) res.end(JSON.stringify({ result: 0, err })); // если ошибка - возвращаем result:0 и информацию об ошибке.
                else res.end(JSON.stringify({ result: 1 }));//если ошибки нет - возвращаем result:1
            });
        }
    });
});
// обновление кол-ва товара
// /api/cart/:id - означает: найди мне /api/cart/ -a все что после  положи в объект params под ключем id
app.put('/api/cart/:id', (req, res) => {
    fs.readFile('./server/db/userCart.json', 'utf-8', (err, data) => {//стучимся в userCart.json
        if (err) res.send(JSON.stringify({ result: 0, err }));// обрабатываем ошибку если есть
        else {// если нет
            const cart = JSON.parse(data); // парсим data(обїект который мы хотим добавить) в переменную
            // далее с помощью метода find находим товар с таким id в корзине
            const find = cart.contents.find(good => good.id_product === Number(req.params.id)); // params.id  мы записали выше.
            find.quantity += req.body.quantity; // и увеличиваем кол-во на body.quantity(см. main.js)

            fs.writeFile('./server/db/userCart.json', JSON.stringify(cart), (err) => {// перезаписуем обновленный файл в userCart.json
                if (err) res.end(JSON.stringify({ result: 0, err }));// обрабатываем ошибки если есть.
                else res.end(JSON.stringify({ result: 1 }));
            });
        }
    });
});
app.delete('/api/cart/:id', (req, res) => {
    fs.readFile('./server/db/userCart.json', 'utf-8', (err, data) => {//стучимся в userCart.json
        if (err) res.send(JSON.stringify({ result: 0, err }));// обрабатываем ошибку если есть
        else {// если нет
            const cart = JSON.parse(data); // парсим data(обїект который мы удалить ) в переменную cart
            // далее с помощью метода find находим товар с таким id в корзине
            const find = cart.contents.find(good => good.id_product === Number(req.params.id)); // params.id  мы записали выше.
            if (find.quantity > 1) {
                find.quantity += req.body.quantity; // и уменьшаем кол-во на body.quantity(см. main.js)
            } else {
                cart.contents.splice(cart.contents.indexOf(find), 1);
            };

            fs.writeFile('./server/db/userCart.json', JSON.stringify(cart), (err) => {// перезаписуем обновленный файл в userCart.json
                if (err) res.end(JSON.stringify({ result: 0, err }));// обрабатываем ошибки если есть.
                else res.end(JSON.stringify({ result: 1 }));
            });
        }
    });
})

//-----------------ЗАПУСК СЕРВЕРА-------------------------------------------
app.listen(7777, () => {
    console.log('Server started!');
});
