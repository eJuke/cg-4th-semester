var path = require("path");
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
	context: path.join(__dirname, "app"),
	entry: "./index",
	resolve: {
		extensions: [".js"]
	},
	output: {
		path: path.join(__dirname, "build"),
		filename: "[name].js",
		publicPath: "https://ejuke.github.io/cg-7th-semester/"
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				loader: ExtractTextPlugin.extract({
					fallback: "style-loader",
					use: "css-loader",
				})
			},
			{
				test: /\.woff2?$|\.ttf$|\.eot$|\.svg$|\.png|\.jpe?g|\.gif$/,
				loader: "file-loader"
			}
		]
	},
	plugins: [
		new ExtractTextPlugin("css/style.css", {
			allChunks: true
		})
	],
};