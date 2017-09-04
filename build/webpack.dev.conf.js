var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var GenerateJsonPlugin = require('generate-json-webpack-plugin');

function resolve(dir) {
    return path.join(__dirname, '..', dir)
}

module.exports = {
    watch: true,
    devtool: 'eval-source-map',
    entry: {
        main: '../src/main.inject.js',
        popup: '../src/main.popup.js'
    },
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: '[name].js'
    },
    module: {
        rules: [{
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        'scss': 'vue-style-loader!css-loader!sass-loader',
                        'sass': 'vue-style-loader!css-loader!sass-loader?indentedSyntax'
                    }
                }
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015', 'stage-0'],
                    plugins: ['transform-class-properties', 'transform-async-to-generator']
                }
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]?[hash]'
                }
            },
            {
                test: /\.json$/,
                loader: 'json-loader'
            },
            {
                test: /\.less$/,
                loader: 'style-loader!css-loader!less-loader'
            },
            {
                test: /\.css$/,
                loader: 'css-loader'
            },
            {
                test: /\.html$/,
                loader: 'html-loader'
            }
        ]
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            'src': resolve('src')
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'popup.html',
            template: '../src/index.popup.html',
            inject: true,
            excludeChunks: ['inject']
        }),
        new GenerateJsonPlugin('manifest.json', require(resolve('src/manifest.js')))        
    ]
}
// const webpack = require('webpack')
// const HtmlWebpackPlugin = require('html-webpack-plugin')
// const ExtractTextPlugin = require('extract-text-webpack-plugin')
// const path = require('path')
// const srcPath = './src'
// const buildPath = '/build'
// const GenerateJsonPlugin = require('generate-json-webpack-plugin');

// function resolve(dir) {
//     return path.join(__dirname, '..', dir)
// }

// module.exports = {
//     watch: true,

//     devtool: 'eval-source-map',

//     entry: {
// main: '../src/main.inject.js',
// popup: '../src/main.popup.js'
//     },
//     output: {
//         path: path.resolve(__dirname, '../dist'),
//         filename: '[name].js'
//     },

//     module: {
//         loaders: [{
//                 test: /\.json$/,
//                 loader: 'json'
//             },
//             {
//                 test: /\.js$/,
//                 exclude: /node_modules/,
//                 loader: 'babel',
// query: {
//     presets: ['es2015', 'stage-0'],
//     plugins: ['transform-class-properties', 'transform-async-to-generator']
// }
//             },
//             {
//                 test: /\.scss$/,
//                 loaders: ['style', 'css', 'sass']
//             },
//             {
//                 test: /\.css$/,
//                 loader: 'style-loader!css-loader'
//             },
//             {
//                 test: /\.(png|jpg)$/,
//                 loader: 'url-loader?limit=8192'
//             },
//             {
//                 test: /\.vue$/,
//                 loader: 'vue'
//             },
//             {
//                 test: /\.(woff|woff2|eot|ttf|svg)$/,
//                 loader: 'url-loader?limit=100000'
//             },
//             {
//                 test: require.resolve('jquery'),
//                 loader: 'expose?jQuery!expose?$'
//             },
//             {
//                 test: /\.(jpe?g|png|gif|svg)$/i,
//                 loaders: [
//                     'image-webpack'
//                 ]
//             }
//         ]
//     },

//     vue: {
//         loaders: {
//             js: 'babel'
//         }
//     },

//     postcss: [],

//     sassLoader: {
//         includePaths: [path.resolve(__dirname, srcPath)]
//     },

//     imageWebpackLoader: {
//         pngquant: {
//             quality: '65-90',
//             speed: 4
//         },
//         jpegtran: {
//             progressive: false
//         }
//     },

//     resolve: {
//         alias: {
//             'src': resolve('src'),
//         }
//     },

//     plugins: [
//         new HtmlWebpackPlugin({
//             filename: 'popup.html',
//             template: resolve('src/popup.tmpl.html'),
//             excludeChunks: ['main']
//         }),
//         // new ExtractTextPlugin('[name].css'),
//         new webpack.ProvidePlugin({
//             $: 'jquery',
//             jQuery: 'jquery'
//         }),
//         // generate manifest.json
        // new GenerateJsonPlugin('manifest.json', require(resolve('src/manifest.js')))
//     ]
// }
