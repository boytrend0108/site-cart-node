const express = require('express'); // подключаем експресс
const fs = require('fs');// подключаем файловую систему
const app = express(); //запускаем експресс
app.use(express.json()); // подключаем промежуточное пр-е обеспечение (midleware), автопреобразование в json и обратно.
app.use('/', express.static('./public'));//ecли обращаемся к корню сайта в адрессной строке- то отрисовываем всё что в ./public

const cartRouter = require('./cartRouter');// подключаем cartRouter.js
app.use('/api/cart', cartRouter);// если приходит запрос на /api/cart- обрабатываем его в cartRouter
// если приходит GET запрос по адресу api/products

app.get('/api/products', (req, res) => {
    // читаем файл products.json
    fs.readFile('./server/db/products.json', 'utf-8', (err, data) => {
        if (err) {// если есть ошибка считывания обрабатываем 
            res.send(JSON.stringify({ result: 0, text: err }));
            // res.sendStatus(404, JSON.stringify({result: 0, text: err}));
        } else {// если все ок 
            res.send(data);// отдаем данные из products.json
        }
    });
});

const port = process.env.PORT || 8081;// слушаем порт process.env.PORT или 8081

app.listen(port, () => {
    console.log(`Server started at port ${port}`);
});

// app.get(); // READ
// app.post(); // CREATE
// app.put(); // UPDATE
// app.delete(); // DELETE
