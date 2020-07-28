/* eslint-disable import/no-anonymous-default-export */

import path from 'path';

import {uglify} from 'rollup-plugin-uglify';
import commonJS from '@rollup/plugin-commonjs';
import nodeResolve from '@rollup/plugin-node-resolve';
import {getBabelOutputPlugin} from '@rollup/plugin-babel';

import pkg from './package.json';

const baseConfig = {
	plugins: [],
	output: {
		exports: 'default',
		sourcemap: true
	}
};

const baseUmd = {
	...baseConfig,
	plugins: [
		...baseConfig.plugins,
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
		...baseConfig.output,
		format: 'umd',
		name: 'toClass'
	}
};

const baseWeb = {
	...baseConfig,
	output: [
		{
			...baseConfig.output,
			file: pkg.main,
			format: 'cjs'
		},
		{
			...baseConfig.output,
			file: pkg.module,
			format: 'es'
		}
	]
};

const libUmd = {
	...baseUmd,
	input: [path.resolve(__dirname, 'src/index.js')],
	output: {
		...baseUmd.output,
		file: pkg.unpkg
	}
};

const libWeb = {
	...baseWeb,
	input: [path.resolve(__dirname, 'src/index.js')]
};

const polyfill = {
	...baseConfig,
	input: [path.resolve(__dirname, 'src/polyfill.js')],
	output: {
		...baseUmd.output,
		file: 'dist/polyfill.min.js'
	},
	plugins: [
		nodeResolve(),
		commonJS({
			include: 'node_modules/**'
		}),
		...baseUmd.plugins
	]
};

export default [libUmd, libWeb, polyfill];
