// Create function add
const add = (cart, req) => {
  cart.contents.push(req.body); // пушим в массив  cart.contents тело запроса(из main.js)
  return JSON.stringify(cart, null, 4);// возвращаем json корзины с добавленным товаром
};
// Create function change
const change = (cart, req) => {
  //ищем есть ли в корзине товар с id товара на который мы нажали
  const find = cart.contents.find(el => el.id_product === +req.params.id);// req.params.id получаем из cartRouter.js (router.put('/:id'.....)
  find.quantity += req.body.quantity;// изменяем кол-во товара (cm main.js)
  return JSON.stringify(cart, null, 4);// возвращаем json корзины с обновленным кол-вом товара
};
const del = (cart, req) => {
  const find = cart.contents.find(el => el.id_product === +req.params.id);
  find.quantity += req.body.quantity;
  return JSON.stringify(cart, null, 4);
};

module.exports = {
  add,
  change,
};
