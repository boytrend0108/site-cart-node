// !!!!!!! Предварительно установили фреймворк express и с помощью команды npm i 
//подключили модули которые указаны в package.json!!!!!!!

const express = require('express');
const fs = require('fs');
const cartRouter = require('./cartRouter');
const app = express();

app.use(express.json());// express будет работать в JSON
app.use('/', express.static('./public'));// при запросе к корню сайта отдаем содержимое public
app.use('/api/cart', cartRouter);// аналогично

app.get('/api/products', (req, res) => {
  fs.readFile('./server/db/products.json', 'utf-8', (err, data) => {
    if (err) {
      res.send(JSON.stringify({ result: 0, text: err }));
      // res.sendStatus(404, JSON.stringify({result: 0, text: err}));
    } else {
      res.send(data);
    }
  });
});
//----------------------START SERVER--------------------------------------------
const port = process.env.PORT || 3000; // в port кладём или что-то из PORT или 3000
app.listen(port, () => {
  console.log(`Listening ${port} port`);
});

// app.get(); // READ
// app.post(); // CREATE
// app.put(); // UPDATE
// app.delete(); // DELETE
