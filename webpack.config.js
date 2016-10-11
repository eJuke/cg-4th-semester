var webpack = require("webpack"),
		path = require("path"),
		ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
	context: __dirname,
	//точки входа
	entry: {
		bundle: "./app/app.js",
	},
	resolve: {
		extensions: ['', '.js', '.jsx']
	},
	devtool: '#cheap-module-source-map',
	//вывод	
	output: {
		path: "./build",
		filename: "[name].js",
		chunkFilename: "[id].js"
	},
	module: {
		//загрузчики
		loaders: [
			{
				test: /\.jsx?$/,
				exclude: [/node_modules/],
				loader: "babel-loader",
				query: {
					presets: ['es2015', 'react', 'stage-0', 'stage-1']
				}
			},
			{
				test: /\.scss$/,
				loader: ExtractTextPlugin.extract('style-loader', 'css-loader!resolve-url!sass-loader?sourceMap')
			},
			{
				test: /\.css$/,
				loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
			},
			{
				test: /\.woff2?$|\.ttf$|\.eot$|\.svg$|\.png|\.jpe?g|\.gif$/,
				loader: 'file-loader'
			}
		]
	},
	sassLoader: {
		outputStyle: 'expanded'
	},
	plugins: [
		new ExtractTextPlugin('css/style.css', {
			allChunks: true
		})
	]
};