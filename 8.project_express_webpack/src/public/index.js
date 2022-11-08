
import appMain from './js/main.js' //import main.js
// import scc work only with webpack(MiniCssExtractPlugin)
import './css/normalize.css'
import './css/style.css'
// import img from './image.png'if   we use img 
// import './css/style.sass'- if we want use sass, we need to plug sass-louder for webpack

const app = new Vue(appMain);// init app

