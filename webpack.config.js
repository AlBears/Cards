var path = require("path"),
	_ = require("lodash"),
	webpack = require("webpack"),
	ExtractTextPlugin = require("extract-text-webpack-plugin"),
	UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const vendor = [
		"lodash",
	],
	mode = process.env.NODE_ENV,
	isDebug = mode !== "production",
	devtool = isDebug ? 'source-map' : '',
	plugins = [
		new webpack.DefinePlugin({
			"process.env": {
				NODE_ENV: `"${process.env.NODE_ENV || "development"}"`
			},
			IS_PRODUCTION: !isDebug,
			IS_DEVELOPMENT: isDebug
		})
	], 
	loaders = {
		js:		{ test: /\.jsx?$/, use: "babel-loader", exclude: /node_modules/ },
		eslint:	{ test: /\.jsx?$/, use: "eslint-loader", exclude: /node_modules/ },
		json:	{ test: /\.json$/, use: "json-loader" },
		css:	{ test: /\.css$/, 
			use: [{
				loader:"style-loader"
			}, {
				loader:"css-loader", options: { 
					sourceMap: true 
				}
			}]},
		sass:	{ test: /\.scss$/, 
			use: [{
				loader:"style-loader"
			}, {
				loader:"css-loader", options: { 
					sourceMap: true 
				}
			},{
				loader:"sass-loader", options: { 
					sourceMap: true 
				}
			}]},
		files:	{ test: /\.(png|jpg|jpeg|gif|woff|ttf|eot|svg|woff2)/, 
			use: [{
				loader: "url-loader", options: {
					limit: 5000 
				}
			}]}
	},  
	clientEntry = ["babel-polyfill", "./src/client/client.js"];

let publicPath = "/build/";

if (isDebug) {
	//
} else {
	plugins.push(
		new ExtractTextPlugin("[name].css"),
		new UglifyJsPlugin()
	);

	loaders.css.use = ExtractTextPlugin.extract({
		fallback: "style-loader",
		use: "css-loader"
	});
	loaders.sass.use = ExtractTextPlugin.extract({
		fallback: "style-loader",
		use: ["css-loader", "sass-loader"]
	});
}
    
const config =  {
	name: "client",
	devtool,
	mode,
	entry: {
		app: clientEntry,
		vendor
	},
	output: {
		path: path.join(__dirname, "public", "build"),
		filename: "[name].js",
		publicPath
	},
	resolve: {
		extensions: [".js", ".jsx"],
		alias: {
			shared: path.join(__dirname, "src", "server", "shared")
		}
	},
	module: {
		rules: _.values(loaders)
	},
	plugins
		
};
module.exports = config;
