var webpack = require("webpack"),
		path = require("path"),
		ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
	context: path.join(__dirname, 'app'),
	//точки входа
	entry: "./index",
	resolve: {
		extensions: ['', '.js', '.jsx']
	},
	devtool: '#cheap-module-source-map',
	//вывод	
	output: {
		path: path.join(__dirname, 'build'),
		publicPath: "https://ejuke.github.io/cg-7th-semester/"
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
		outputStyle: 'compressed'
	},
	plugins: [
		new ExtractTextPlugin('css/style.css', {
			allChunks: true
		})
	]
};