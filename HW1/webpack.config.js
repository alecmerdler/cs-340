var webpack = require('webpack');
var path = require("path");

var config = {
    entry: "./app/main.ts",
    output: {
        path: path.resolve(__dirname, "build"),
        filename: "bundle.js"
    },
    resolve: {
        extensions: [".ts", ".css", ".js"],
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
        ]
    },
    devtool: "source-map",
};

module.exports = config;
