/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/server/cart.js":
/*!****************************!*\
  !*** ./src/server/cart.js ***!
  \****************************/
/***/ ((module) => {

eval("// Функция ищет в корзине товар по которому мі кликнули \nvar findFn = function findFn(cart, req) {\n  return cart.contents.find(function (el) {\n    return el.id_product === +req.params.id;\n  });\n};\n//Функция считает общую сумму для отного товара в корзине\nvar sumPriceFn = function sumPriceFn(cart, cartItem) {\n  var item = cart.contents[cart.contents.indexOf(cartItem)]; // take out of the cart our cartItem\n  item.sumPrice = item.price * item.quantity; // compute sumPrice(then use it in culcFn)\n};\n// Func culculate total number of goods in cart and total price\nvar culcFn = function culcFn(cart) {\n  cart.countGoods = cart.contents.reduce(function (sum, _ref) {\n    var quantity = _ref.quantity;\n    return +sum + +quantity;\n  }, 0);\n  cart.amount = cart.contents.reduce(function (sum, _ref2) {\n    var sumPrice = _ref2.sumPrice;\n    return +sum + sumPrice;\n  }, 0);\n  return;\n};\n// name we'll use in logger\nvar returnObj = function returnObj(cart, req) {\n  return {\n    name: req.body.product_name,\n    newCart: JSON.stringify(cart, null, 4)\n  };\n};\n//------------------------------------------------------------------------------\nvar add = function add(cart, req) {\n  // cart is our cart\n  cart.contents.push(req.body); // req.body is our item, that clicked we on\n  culcFn(cart); // считаем общую сумму в корзине \n  return returnObj(cart, req);\n};\nvar change = function change(cart, req) {\n  //here req is {quantity:1}\n  var find = findFn(cart, req); //ищем в корзине товар по которому мі кликнули \n  find.quantity += req.body.quantity; // меняем кол-во\n  sumPriceFn(cart, find); // пересчитываем сумму по конкретному товару.\n  culcFn(cart); // считаем общую сумму в корзине\n  return returnObj(cart, req);\n};\nvar remove = function remove(cart, req) {\n  var find = findFn(cart, req); //ищем в корзине товар по которому мі кликнули \n  cart.contents.splice(cart.contents.indexOf(find), 1); // удаляем из корзины\n  culcFn(cart); // считаем общую сумму в корзине\n  return returnObj(cart, req);\n};\n\n// give this out \nmodule.exports = {\n  add: add,\n  change: change,\n  remove: remove\n};\n\n//# sourceURL=webpack://project_express/./src/server/cart.js?");

/***/ }),

/***/ "./src/server/cartRouter.js":
/*!**********************************!*\
  !*** ./src/server/cartRouter.js ***!
  \**********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== \"undefined\" && o[Symbol.iterator] || o[\"@@iterator\"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === \"number\") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError(\"Invalid attempt to iterate non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\"); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it[\"return\"] != null) it[\"return\"](); } finally { if (didErr) throw err; } } }; }\nfunction _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === \"string\") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === \"Object\" && o.constructor) n = o.constructor.name; if (n === \"Map\" || n === \"Set\") return Array.from(o); if (n === \"Arguments\" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }\nfunction _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }\nvar express = __webpack_require__(/*! express */ \"express\");\nvar fs = __webpack_require__(/*! fs */ \"fs\");\nvar handler = __webpack_require__(/*! ./handler */ \"./src/server/handler.js\"); // connect handler\nvar router = express.Router(); // подключаем метод роутер\nvar logger = __webpack_require__(/*! ./logger */ \"./src/server/logger.js\");\nvar path = __webpack_require__(/*! node:path */ \"node:path\");\nvar cartJSONPath = path.resolve(__dirname, './db/userCart.json'); // collect abs.link\n\n// '/' означает пустое место, вместо '/' подставляется /api/cart из app.use('/api/cart', cartRouter) см. server.js\n// если запрос GET\nrouter.get('/', function (req, res) {\n  //считываем  userCart.json\n  fs.readFile(cartJSONPath, 'utf-8', function (err, data) {\n    if (err) {\n      // обрабатываем и отправляем ошибку если есть.\n      res.sendStatus(404, JSON.stringify({\n        result: 0,\n        text: err\n      }));\n    } else {\n      // если все ок.\n      res.send(data); // отдаем данные из userCart.json  \n    }\n  });\n});\n// if request POST\nrouter.post('/', function (req, res) {\n  // go to handlder\n  handler(req, res, 'add', cartJSONPath);\n});\n// if request PUT\nrouter.put('/:id', function (req, res) {\n  // go to handlder\n  handler(req, res, 'change', cartJSONPath);\n});\n// if request DELETE\nrouter[\"delete\"]('/:id', function (req, res) {\n  if (req.params.id === \"clear\") {\n    fs.readFile(cartJSONPath, \"utf-8\", function (err, data) {\n      var cart = JSON.parse(data); // get content of userCart.json\n      // and delete each elem\n      var _iterator = _createForOfIteratorHelper(cart.contents),\n        _step;\n      try {\n        for (_iterator.s(); !(_step = _iterator.n()).done;) {\n          var el = _step.value;\n          cart.contents.splice(el);\n        }\n      } catch (err) {\n        _iterator.e(err);\n      } finally {\n        _iterator.f();\n      }\n      ;\n      cart.amount = 0;\n      cart.countGoods = 0;\n      var clearedCart = JSON.stringify(cart);\n      fs.writeFile(cartJSONPath, clearedCart, function (err) {\n        if (err) {\n          res.send('{\"result\": 0}');\n        } else {\n          var Cart = JSON.parse(clearedCart);\n          res.send({\n            result: 1,\n            Cart: Cart\n          }); // send response out\n          logger(\"Cart\", \"clear all\"); // go to logger\n        }\n      });\n    });\n  } else {\n    // if 'id === id of product\n    handler(req, res, 'remove', cartJSONPath);\n  }\n  ;\n});\nmodule.exports = router;\n\n//# sourceURL=webpack://project_express/./src/server/cartRouter.js?");

/***/ }),

/***/ "./src/server/handler.js":
/*!*******************************!*\
  !*** ./src/server/handler.js ***!
  \*******************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("var fs = __webpack_require__(/*! fs */ \"fs\");\nvar cart = __webpack_require__(/*! ./cart */ \"./src/server/cart.js\"); // connect cart.js\nvar logger = __webpack_require__(/*! ./logger */ \"./src/server/logger.js\"); // connect logger\n\nvar actions = {\n  add: cart.add,\n  change: cart.change,\n  remove: cart.remove\n};\nvar handler = function handler(req, res, action, file) {\n  //file is abs.link to ./userCart.json\n  fs.readFile(file, 'utf-8', function (err, data) {\n    // here data-is our userCart.json\n    if (err) {\n      // hanling err \n      res.sendStatus(404, JSON.stringify({\n        result: 0,\n        text: err\n      }));\n    } else {\n      // if ok, ('name' we'll use in logger)\n      // actions[action] - is method from cart.js: add(..) or cart.change() or cart.remove()\n      var _actions$action = actions[action](JSON.parse(data), req),\n        name = _actions$action.name,\n        newCart = _actions$action.newCart; // go to cart.js \n      fs.writeFile(file, newCart, function (err) {\n        //file is abs.link to ./userCart.json\n        if (err) {\n          res.send('{\"result\": 0}');\n        } else {\n          logger(name, action);\n          var Cart = JSON.parse(newCart); // Cart-is our uppdated cart\n          res.send({\n            result: 1,\n            Cart: Cart\n          }); // send data out(in this case to CartComp)\n        }\n      });\n    }\n  });\n};\n\nmodule.exports = handler;\n\n//# sourceURL=webpack://project_express/./src/server/handler.js?");

/***/ }),

/***/ "./src/server/logger.js":
/*!******************************!*\
  !*** ./src/server/logger.js ***!
  \******************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("var moment = __webpack_require__(/*! moment */ \"moment\"); // connect moment library\nvar fs = __webpack_require__(/*! fs */ \"fs\");\nvar path = __webpack_require__(/*! node:path */ \"node:path\");\nvar statsJSON = path.resolve(__dirname, './db/stats.json'); // create ablolute link\n// const statsJSON = 'C:/Users/Lenovo/YandexDisk/GeekBrains/JS/All_repo_from_JS_class/site-cart2/8.1.project_express_src/dist/server/db/stats.json'\nvar logger = function logger(name, action) {\n  fs.readFile(statsJSON, 'utf-8', function (err, data) {\n    if (err) {\n      console.log(err);\n    } else {\n      var stat = JSON.parse(data);\n      stat.push({\n        time: moment().format('DD MMM YYYY, h:mm:ss a'),\n        prod_name: name,\n        action: action\n      });\n      fs.writeFile(statsJSON, JSON.stringify(stat, null, 4), function (err) {\n        if (err) {\n          console.log(err);\n        }\n      });\n    }\n  });\n};\n// export logger outside\nmodule.exports = logger;\n\n//# sourceURL=webpack://project_express/./src/server/logger.js?");

/***/ }),

/***/ "./src/server/server.js":
/*!******************************!*\
  !*** ./src/server/server.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("var express = __webpack_require__(/*! express */ \"express\"); // подключаем експресс\nvar fs = __webpack_require__(/*! fs */ \"fs\"); // подключаем файловую систему\nvar cartRouter = __webpack_require__(/*! ./cartRouter */ \"./src/server/cartRouter.js\"); // подключаем cartRouter.js\nvar app = express(); //запускаем експресс\nvar path = __webpack_require__(/*! node:path */ \"node:path\");\n//-----------------------------------------------------------------------------\nvar webpack = __webpack_require__(/*! webpack */ \"webpack\");\nvar webpackDevMiddleware = __webpack_require__(/*! webpack-dev-middleware */ \"webpack-dev-middleware\");\nvar config = __webpack_require__(/*! ../../webpack.dev.config */ \"./webpack.dev.config.js\");\nvar compiler = webpack(config);\napp.use(webpackDevMiddleware(compiler, {\n  publicPath: config.output.publicPath\n}));\n\n//------------------------------------------------------------------\napp.use(express.json()); // подключаем промежуточное пр-е обеспечение (midleware), автопреобразование в json и обратно.\napp.use('/', express[\"static\"](path.resolve(__dirname, '../public'))); //ecли обращаемся к корню сайта в адрессной строке- то отрисовываем всё что в ./public\napp.use('/api/cart', cartRouter); // если приходит запрос на /api/cart- обрабатываем его в cartRouter\n// если приходит GET запрос по адресу api/products\n// Используем path дабы избежать проблем с относительными путями до файлов. Делаем их абсолютными.\n\nvar catalogJSONPath = path.resolve(__dirname, './db/products.json'); // collect abs.link\napp.get('/api/products', function (req, res) {\n  // читаем файл products.json\n  fs.readFile(catalogJSONPath, 'utf-8', function (err, data) {\n    if (err) {\n      // если есть ошибка считывания обрабатываем \n      res.send(JSON.stringify({\n        result: 0,\n        text: err\n      }));\n      // res.sendStatus(404, JSON.stringify({result: 0, text: err}));\n    } else {\n      // если все ок \n      res.send(data); // отдаем данные из products.json\n    }\n  });\n});\n\nvar port = process.env.PORT || 7777; // слушаем порт process.env.PORT или 8081\n\napp.listen(port, function () {\n  console.log(\"Server started at port \".concat(port));\n});\n\n// app.get(); // READ\n// app.post(); // CREATE\n// app.put(); // UPDATE\n// app.delete(); // DELETE\n\n//# sourceURL=webpack://project_express/./src/server/server.js?");

/***/ }),

/***/ "./webpack.dev.config.js":
/*!*******************************!*\
  !*** ./webpack.dev.config.js ***!
  \*******************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("var path = __webpack_require__(/*! path */ \"path\");\nvar HtmlWebpackPlugin = __webpack_require__(/*! html-webpack-plugin */ \"html-webpack-plugin\");\nmodule.exports = {\n  mode: \"development\",\n  // add\n  entry: {\n    main: [\"@babel/polyfill\", \"./src/public/index.js\"]\n  },\n  output: {\n    path: path.join(__dirname, 'dist/public'),\n    publicPath: \"/\",\n    filename: \"js/[name].js\"\n  },\n  target: 'web',\n  devtool: \"inline-source-map\",\n  // change\n  devServer: {\n    \"static\": './dist'\n  },\n  module: {\n    rules: [{\n      test: /\\.js$/,\n      exclude: /node_modules/,\n      loader: \"babel-loader\"\n    }, {\n      test: /\\.html$/,\n      use: [{\n        loader: \"html-loader\"\n      }]\n    }, {\n      test: /\\.css$/,\n      use: ['style-loader', 'css-loader']\n    }, {\n      test: /\\.(png|jpg|svg|gif)$/,\n      use: ['file-loader']\n    }]\n  },\n  plugins: [new HtmlWebpackPlugin({\n    template: 'src/public/index.html',\n    filename: 'index.html',\n    excludeChunks: ['server']\n  })]\n};\n\n//# sourceURL=webpack://project_express/./webpack.dev.config.js?");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/***/ ((module) => {

"use strict";
module.exports = require("express");

/***/ }),

/***/ "html-webpack-plugin":
/*!**************************************!*\
  !*** external "html-webpack-plugin" ***!
  \**************************************/
/***/ ((module) => {

"use strict";
module.exports = require("html-webpack-plugin");

/***/ }),

/***/ "moment":
/*!*************************!*\
  !*** external "moment" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("moment");

/***/ }),

/***/ "webpack":
/*!**************************!*\
  !*** external "webpack" ***!
  \**************************/
/***/ ((module) => {

"use strict";
module.exports = require("webpack");

/***/ }),

/***/ "webpack-dev-middleware":
/*!*****************************************!*\
  !*** external "webpack-dev-middleware" ***!
  \*****************************************/
/***/ ((module) => {

"use strict";
module.exports = require("webpack-dev-middleware");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/***/ ((module) => {

"use strict";
module.exports = require("fs");

/***/ }),

/***/ "node:path":
/*!****************************!*\
  !*** external "node:path" ***!
  \****************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:path");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("path");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/server/server.js");
/******/ 	
/******/ })()
;