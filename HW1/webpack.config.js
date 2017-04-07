var webpack = require('webpack');
var path = require("path");

var config = {
    entry: "./app/main.ts",
    output: {
        path: path.resolve(__dirname, "build"),
        filename: "bundle.js"
    },
    resolve: {
        extensions: [".ts", ".js"],
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
        ]
    },
    devtool: "source-map",
};

module.exports = config;
