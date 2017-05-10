const { resolve } = require('path');
const path = require('path');
const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');

const vendor = require ('./vendor');

const basePath = resolve(__dirname, 'dist');
module.exports = {
    context: resolve(__dirname, 'src'),
    entry: {
        vendor,
        app: [
            './index.js'
        ]
    },
    output: {
        filename: '[name].[chunkhash:8].js',
        chunkFilename: '[name].[chunkhash:8].chunk.js',
        // the output bundle

        path: basePath,

        publicPath: '/',
        // necessary for HMR to know where to load the hot update chunks
        sourceMapFilename: '[name].map'
    },

    module: {
        rules: [
            {
                test: /\.jsx?$/,
                use: [ 'babel-loader', ],
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: [ 'style-loader', 'css-loader?modules', ],
            },
        ],
    },

    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: true,
            debug: false
        }),
        new webpack.optimize.UglifyJsPlugin({
            beautify: false,
            mangle: {
                screw_ie8: true,
                keep_fnames: true
            },
            compress: {
                screw_ie8: true
            },
            comments: false
        }),
        new webpack.optimize.CommonsChunkPlugin({
            names: ['vendor', 'manifest'],
            minChunks: Infinity
        }),
        new HtmlWebpackPlugin({
            title: 'Zap da Costura',
            template: './index.ejs'
        })
    ]
};