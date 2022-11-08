// Функция ищет в корзине товар по которому мі кликнули 
const findFn = (cart, req) => {
    return cart.contents.find(el => el.id_product === +req.params.id);
};
//Функция считает общую сумму для отного товара в корзине
const sumPriceFn = (cart, cartItem) => {
    const item = cart.contents[cart.contents.indexOf(cartItem)];// take out of the cart our cartItem
    item.sumPrice = item.price * item.quantity;// compute sumPrice(then use it in culcFn)
};
// Func culculate total number of goods in cart and total price
const culcFn = (cart) => {
    cart.countGoods = cart.contents
        .reduce((sum, { quantity }) => +sum + +quantity, 0);
    cart.amount = cart.contents
        .reduce((sum, { sumPrice }) => +sum + sumPrice, 0);
    return;
};
// name we'll use in logger
const returnObj = (cart, req) => {
    return { name: req.body.product_name, newCart: JSON.stringify(cart, null, 4) }
};
//------------------------------------------------------------------------------
const add = (cart, req) => {
    cart.contents.push(req.body);
    const sumPrice = req.body.price;//then use it in culcFn
    culcFn(cart);// считаем общую сумму в корзине 
    return returnObj(cart, req);
};

const change = (cart, req) => {
    let find = findFn(cart, req);//ищем в корзине товар по которому мі кликнули 
    find.quantity += req.body.quantity;// меняем кол-во
    sumPriceFn(cart, find);// пересчитываем сумму по конкретному товару.
    culcFn(cart);// считаем общую сумму в корзине
    return returnObj(cart, req);
};

const remove = (cart, req) => {
    let find = findFn(cart, req);//ищем в корзине товар по которому мі кликнули 
    cart.contents.splice(cart.contents.indexOf(find), 1);// удаляем из корзины
    culcFn(cart);// считаем общую сумму в корзине
    return returnObj(cart, req);
};

// give this out 
module.exports = {
    add,
    change,
    remove,
};
