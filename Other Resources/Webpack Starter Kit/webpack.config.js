const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
    entry: './src/index.js',
    mode: 'development',
    output: {
        path: `${__dirname}/dist`,
        filename: 'main.js',
    },
	  plugins: [new HtmlWebpackPlugin({
      template: './src/index.html',
      inject: true,
      chunks: ['index'],
      filename: 'index.html'
    })],
    devServer: {
        static: "./dist",
    },
    devtool: "source-map",
    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: ["", ".webpack.js", ".web.js", ".ts", ".tsx", ".js"],
    },
    module: {
        rules: [

            // It's important to note that ts-loader will need to run before any other loader that deals with .js files.
            // All files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'.
            { test: /\.tsx?$/, loader: "ts-loader" },
            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            { test: /\.js$/, loader: "source-map-loader" },
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                    },
                },
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader',
                ],
            },
            {
                test: /\.(svg|gif|png|eot|woff|ttf)$/,
                use: [
                    'url-loader',
                ],
            },
            {
                test: /\.json$/i,
                exclude: /node_modules/,
                type: "asset/resource",
                use: [
                    'file-loader?name=[name].[ext]&outputPath=data'
                ]
            },
        
        ],
    },
};