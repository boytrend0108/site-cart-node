const path = require('path');// turn relative path to absolute
// nodeExternals for ignore node-modules wher bundling webpack
const nodeExternals = require('webpack-node-externals');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: {
        server: path.join(__dirname, 'src/server/server.js'),
    },
    output: {
        path: path.join(__dirname, 'dist/server'),
        publicPath: "/",
        filename: "[name].js"
    },
    target: "node",// in order to ignore built-in modules like path, fs, etc.
    externalsPresets: { node: true }, // in order to ignore built-in modules like path, fs, etc.
    node: {
        // Только для express приложений
        __dirname: false,//Webpack won't touch your __dirname
        __filename: false //Webpack won't touch your __filename
    },
    externals: [nodeExternals()], // in order to ignore all modules in node_modules folder
    module: {
        rules: [// describe our rulse for loader
            {
                test: /\.m?js$/,//for all js file
                exclude: /node_modules/,// except file from this folder
                use: {
                    loader: "babel-loader", //use this 
                    options: {// whis thise presets
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    },
    plugins: [
        new CopyPlugin({// plugin for file transportation
            patterns: [
                {
                    from: 'src/server/db',// from ...
                    // be neatly whith '.' between [][]!!!!
                    to: 'db/[name][ext]',// to dist/server/db. Name and extantions leave the same
                    toType: `template`// determine type of 'to' directory, file or template
                }
            ],
        })
    ]
};
