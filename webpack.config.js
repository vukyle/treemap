var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require("html-webpack-plugin");
var CleanWebpackPlugin = require("clean-webpack-plugin");

var extractPlugin = new ExtractTextPlugin({
   filename: 'main.css'
});

module.exports = {
    entry: {
        main: './src/js/index.js',
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name]bundle.js',
        //filename: 'bundle.js',
        //publicPath: '/dist'
    },
    resolve: {
         modules: [path.resolve(__dirname, "src"), "node_modules"]
    },

    module: {

        rules: [
            {
                test: /\.js$/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ["es2015"]
                        }
                    }
                ]
            },
            {
                test: /\.(css|sass|scss)$/i,
                use: extractPlugin.extract({
                    use: [{ loader: 'css-loader', options: { importLoaders: 1 } },'postcss-loader', 'sass-loader']
                })
            },
            {
                test: /\.html$/,
                use: ['html-loader']
            },
            {
                test: /\.(jpe?g|png|gif|woff|woff2|eot|ttf|svg)$/i,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: "[name].[ext]",
                            outputPath: 'img/',
                            //publicPath: 'img/'
                        }
                    },
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            gifsicle: {
                                interlaced: false,
                              },
                              optipng: {
                                optimizationLevel: 7,
                              },
                              pngquant: {
                                quality: '65-90',
                                speed: 4
                              },
                              mozjpeg: {
                                progressive: true,
                                quality: 65
                              }
                        }
                    }
                ]
            },
            {
                test: /\.json$/i,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: "[name].[ext]",
                            outputPath: 'data/',
                            //publicPath: 'img/'
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        extractPlugin,
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: "src/index.html",
            chunks: ['main']
        }),
        new CleanWebpackPlugin(["dist"])
    ]
};
