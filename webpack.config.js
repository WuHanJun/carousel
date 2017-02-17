/**
 * Created by lenovo on 2017/2/17.
 */

var webpack = require('webpack');

module.exports = {
    entry: {
        app: './main.js'
    },
    output: {
        filename: 'bundle.js'
    },
    module: {
        loaders:[
            {
                test: /\.js[x]?$/,
                exclude: /node_modules/,
                loader: 'babel-loader?presets[]=es2015'
            },
            {
                test: /\.css/,
                exclude: /node_mudules/,
                loader: 'style-loader!css-loader'
            },
            {
                test: /\.(png|jpg|woff|woff2|eot|ttf|svg)(\?.*$|$)/,
                loader: 'url-loader?importLoaders=1&limit=1000&name=./font/[name].[ext]'
            }
        ]
    },
    externals: {
        jquery: 'window.$'
    }

};