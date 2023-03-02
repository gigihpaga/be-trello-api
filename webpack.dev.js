const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');

module.exports = {
    mode: 'development',
    target: 'node',
    entry: path.join(__dirname, './bin', 'www.js'),
    externals: [
        nodeExternals({
            allowlist: ['mysql2', 'pg', 'pg-hstore', 'sequelize'],
        }),
    ],
    watch: true,
    output: {
        path: path.join(__dirname, 'dist_dev'),
        publicPath: '/',
        filename: '[name].js',
        chunkFilename: '[name].js',
        clean: true,
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: [path.resolve(__dirname, 'node_modules')],
                loader: 'babel-loader',
                options: {
                    presets: [
                        [
                            '@babel/env',
                            {
                                targets: {
                                    browsers: 'last 2 chrome versions',
                                },
                            },
                        ],
                    ],
                },
            },
        ],
    },
    resolve: {
        extensions: ['.json', '.js', '.jsx'],
    },
    devtool: 'source-map',
    devServer: {
        contentBase: path.join(__dirname, '/'),
        inline: true,
        host: 'localhost',
        port: 3000,
    },
    stats: {
        errors: false,
        errorDetails: true,
    },
};
