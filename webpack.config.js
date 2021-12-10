const HtmlWebpackPlugin = require('html-webpack-plugin');
const WasmPackPlugin = require('@wasm-tool/wasm-pack-plugin');
const path = require('path');

module.exports = {
    entry: './src/index.jsx',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.[fullhash].js'
    },
    devServer: {
        compress: true,
        port: 8080,
        hot: true,
        static: './dist',
        historyApiFallback: true,
        open: true
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader', 'eslint-loader']
                // type: "webassembly/async",
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            // eslint-disable-next-line no-path-concat
            template: __dirname + '/public/index.html',
            filename: 'index.html'
        }),
        new WasmPackPlugin({
            crateDirectory: path.resolve(__dirname, '.')
        })
    ],
    mode: 'development',
    devtool: 'inline-source-map',
    experiments: {
        // executeModule: true,
        // outputModule: true,
        syncWebAssembly: true,
        // topLevelAwait: true,
        asyncWebAssembly: true
        // layers: true,
        // lazyCompilation: true,
    }
};
