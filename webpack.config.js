var webpack = require("webpack"),
		path = require("path"),
		ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
	context: path.join(__dirname, 'app'),
	//точки входа
	entry: "./index",
	resolve: {
		extensions: ['', '.js']
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