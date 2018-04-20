var path = require("path"),
	_ = require("lodash"),
	webpack = require("webpack"),
	ExtractTextPlugin = require("extract-text-webpack-plugin"),
	UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const vendor = [
		"lodash",
		"react",
		"react-dom"
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
	plugins.push(new webpack.HotModuleReplacementPlugin());
	clientEntry.unshift(
		"react-hot-loader/patch",
		"webpack-dev-server/client?http://localhost:8080/", 
		"webpack/hot/only-dev-server");

	publicPath = "http://localhost:8080/build/";
} else {
	plugins.push(
		new ExtractTextPlugin("[name].css"),
		new UglifyJsPlugin()
	);

	loaders.css.use = ExtractTextPlugin.extract({
		fallback: "style-loader",
		use: [{ loader:"css-loader", options: { minimize:true } }]
	});
	loaders.sass.use = ExtractTextPlugin.extract({
		fallback: "style-loader",
		use: [{ loader:"css-loader", options: { minimize:true } },
			{ loader:"sass-loader", options: { minimize:true }} 
		]
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

