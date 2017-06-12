var webpack = require('webpack');
var path = require("path");

var config = {
    entry: "./ui/main.ts",
    output: {
        path: path.resolve(__dirname, "ui/build"),
        filename: "bundle-[hash].js"
    },
    resolve: {
        extensions: [".ts", ".css", ".html", ".js"],
    },
    // Use window.angular to maintain compatibility with non-Webpack components
    externals: {
        angular: "angular",
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: [
                    "ts-loader",
                ],
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: [
                    "style-loader",
                    "css-loader",
                ],
            },
            {
                test: /\.html$/,
                use: [
                    "html-loader?exportAsEs6Default"
                ],
                exclude: /node_modules/
            }
        ]
    },
    devtool: "source-map",
};

module.exports = config;
