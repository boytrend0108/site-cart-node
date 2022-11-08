const path = require('path');
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
    target: "node",
    node: {
        // Только для express приложений
        __dirname: false,
        __filename: false
    },
    externals: [nodeExternals()], // Только для express приложений
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
            }
        ]
    },
    plugins: [
        new CopyPlugin({// plugin for file transportation
            patterns: [
                {
                    from: 'src/server/db',// from ...
                    to: 'db/[name][ext]',// to dist/server/db. Name and extantions leave the same
                    toType: `template`
                }
            ],
        })
    ]
};
