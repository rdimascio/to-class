/* eslint-disable import/no-extraneous-dependencies */

const path = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

module.exports = {
	target: 'web',
	performance: {
		hints: false
	},
	entry: [
		'core-js/features/set',
		'core-js/features/array/flat',
		'core-js/features/array/from',
		path.resolve(__dirname, 'src/index.js')
	],
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'index.js',
		libraryTarget: 'umd',
		library: 'to-class',
		// Prevents webpack from referencing `window` in the UMD build
		// Source: https://git.io/vppgU
		globalObject: 'typeof self !== \'undefined\' ? self : this'
	},
	devtool: 'source-map',
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader'
			}
		]
	},
	plugins: [
		new CleanWebpackPlugin()
	]
};
