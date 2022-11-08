const path = require('path');
//simplifies creation of HTML files to serve your webpack bundles
const HtmlWebpackPlugin = require('html-webpack-plugin');
//This plugin extracts CSS into separate files
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');// to minify/minimize your JavaScript
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');// to optimize and minify your CSS.

module.exports = {
    mode: 'production',// use this in production mode
    entry: {// point of entry
        main: ["./src/public/index.js"]// where we start app
    },
    output: {
        path: path.resolve(__dirname, 'dist/public'),
        publicPath: "/",
        filename: "js/[name].js"
    },
    target: 'web',// were we we'll be use this pack
    devtool: "source-map",//how source maps are generated.
    optimization: {// option fon otpimization
        minimize: true,
        minimizer: [new TerserPlugin(), new CssMinimizerPlugin()],
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: "html-loader",
                        // options: {
                        //     minimize: true
                        // }
                    }
                ]
            },
            {
                test: /\.css$/,// for all css files usr
                // at first 'css-loader', then MiniCssExtractPlugin.loader
                use: [MiniCssExtractPlugin.loader, 'css-loader']
            },
            {
                test: /\.(png|jpg|gif)$/i,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                        },
                    },
                ],
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({//copy html
            template: 'src/public/index.html',//from 
            filename: 'index.html',// to output path(here we use PablicPath)
            excludeChunks: ['server']// exclude chanks from folder 'server'
        }),
        new MiniCssExtractPlugin({
            filename: 'css/[name].css',// specify output folder
            chunkFilename: '[id].css'//determines the name of non-initial chunk files
        }),

    ]
};
