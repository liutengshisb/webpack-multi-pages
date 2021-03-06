
const path = require('path');
const util = require('./util');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");



module.exports = {
    entry: util.plugins.Entries,
    output: {
        filename: './js/[name].bundle.js',
        path: path.join(__dirname,'../dist')
    },
    module: {
        rules: [
            {
                test: /\.html$/,
                use: ['html-loader']
            },
            {
                test:/\.js$/,
                exclude:[path.resolve(__dirname,'../node_modules')],
                use:{
                    loader: 'babel-loader',
                    options: {
                        presets: ['env'],
                        plugins:['@babel/plugin-transform-runtime']
                      }
                }
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[hash:7].[ext]',
                        outputPath:'./static/images'
                    }
                }],
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: 'static/fonts/[name].[hash:7].[ext]',
                        publicPath:'../'
                    }
                }]
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: 'static/media/[name].[hash:7].[ext]',
                        publicPath:'../'
                    }
                }],
            },
            {
                test: /\.(le|c)ss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options:{
                            publicPath:'../'
                        }
                    },
                    'css-loader',
                    'less-loader'
                ]
            },
            {
                test: require.resolve('jquery'),
                use: [
                    {
                        loader: 'expose-loader',
                        options: '$'
                    },
                    {
                        loader: 'expose-loader',
                        options: 'jQuery'
                    }
                ]
            }
        ]
    },
    plugins: util.plugins.plugins,
    optimization: {
        //主要就是根据不同的策略来分割打包出来的bundle。
        splitChunks: {
            chunks: 'async',//分割异步打包的代码，
            minSize: 30000,
            minChunks: 2,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            name: true
        }
    }
}