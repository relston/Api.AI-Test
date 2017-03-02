const path = require('path');
const webpack = require('webpack');

module.exports = {
	context : path.resolve(__dirname, './app'),
	entry: './main.jsx',
	output: {
		path: path.resolve(__dirname, './public'),
		filename: 'bundle.js'
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: [/node_modules/],
				use: [{
					loader: 'babel-loader',
					options: { presets: ['es2015', 'react'] }
				}],
			},
		// Loaders for other file types can go here
		]
	}
}