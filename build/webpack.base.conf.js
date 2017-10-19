const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const os = require('os');
const HappyPack  = require('happypack');
const happThreadPool = HappyPack.ThreadPool({size: os.cpus().length}); // 采用多进程，进程数由CPU核数决定

module.exports = {
    entry: {
        app: [path.resolve(__dirname, '../src/index.js')]
        ,
        vendor: [
            // 'history',
            // 'lodash',
            'react',
            'react-dom',
            'react-redux',
            'react-router',
            'react-router-redux',
            'redux',
            'redux-thunk'
          ]
    },
    output: {
        filename: '[name].bundle.[hash:8].js',
        path: path.resolve(__dirname, '../dist/asset'),
        publicPath: '/asset/',
        chunkFilename: '[name].[chunkhash:8].js'
    }, 
    resolve: {
        extensions: ['.js', '.jsx', '.less', '.scss', '.css'],
        modules: [
            path.join(__dirname, '../src'),
            'node_modules'
        ],
        alias: {
            "components": path.resolve(__dirname, "../src/components"),
            "utils": path.resolve(__dirname, "../src/utils")
        }
    },
    module: {
        rules: [
            {
            test: /\.jsx?$/,
            exclude: /(node_modules|bower_components)/,
            use: 'babel-loader'
        }, 
        {
            test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
            use: ['file-loader?limit=1000&name=files/[md5:hash:base64:10].[ext]']
        }]
    },
    plugins: [
        new HappyPack({
            id: 'js',
            cache: true,
            loaders: ['babel-loader?cacheDirectory=true'],
            threadPool: happThreadPool,
        }),
        // new webpack.DllReferencePlugin({
        //     context: __dirname,
        //     manifest: require('../manifest.json'),
        // }),
        new HtmlWebpackPlugin({
            title: '统一运维管理',
            filename: 'index.html',
            template: path.join(__dirname, '../index.html'),
            hash: true
        })
        ,
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor'
        })
    ],
};
