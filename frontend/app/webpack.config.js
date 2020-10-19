const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    entry: "./src/index.js", // webpack entry point. Module to start building dependency graph
    output: {
        path: path.resolve(__dirname, 'build'), // Folder to store generated bundle
        filename: 'build.js',  // Name of generated bundle after build
        publicPath: '/' // public URL of the output directory when referenced in a browser
    },
    resolve: {
        extensions: ['.js', '.jsx', '.json', '.css', '.scss']
    },
    module: {  // where we defined file patterns and their loaders
        rules: [
            {
                test: /\.js$/,
                use: "babel-loader",
                include: path.resolve(__dirname, 'src')
            },
            {
                test: /\.s?css$/,
                use: [MiniCssExtractPlugin.loader, {
                    loader: "css-loader",
                    options: {
                        modules: true
                    }
                }, "sass-loader"]
            }
        ]
    },
    plugins: [  // Array of plugins to apply to build chunk
        new HtmlWebpackPlugin({
            template: "./src/public/index.html",
        }),
        new MiniCssExtractPlugin()
    ],
    devServer: {
        host: '0.0.0.0',
        port: 3000,
        hot: true,
        historyApiFallback: true,
        compress: true
    }
};