/* eslint-disable import/no-anonymous-default-export */

import path from 'path';

import {uglify} from 'rollup-plugin-uglify';
import commonJS from '@rollup/plugin-commonjs';
import nodeResolve from '@rollup/plugin-node-resolve';
import {getBabelOutputPlugin} from '@rollup/plugin-babel';

const baseConfig = {
	plugins: [
		getBabelOutputPlugin({
			configFile: path.resolve(__dirname, '.babelrc'),
			allowAllFormats: true
		}),
		uglify({
			compress: {
				pure_getters: true, // eslint-disable-line camelcase
				unsafe: true,
				unsafe_comps: true // eslint-disable-line camelcase
			}
		})
	],
	output: {
		exports: 'default',
		format: 'umd',
		name: 'toClass'
	}
};

const libConfig = {
	...baseConfig,
	input: [
		path.resolve(__dirname, 'src/index.js')
	],
	output: {
		...baseConfig.output,
		file: 'dist/index.js'
	}
};

const polyfillConfig = {
	...baseConfig,
	input: [
		path.resolve(__dirname, 'src/polyfill.js')
	],
	output: {
		...baseConfig.output,
		file: 'dist/polyfill/index.js'
	},
	plugins: [
		nodeResolve(),
		commonJS({
			include: 'node_modules/**'
		}),
		...baseConfig.plugins
	]
};

export default [libConfig, polyfillConfig];
