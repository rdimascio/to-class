/* eslint-disable import/no-anonymous-default-export */

/**
 * Copyright (c) 2018 Ryan DiMascio.
 * Licensed under the MIT License (MIT), see
 * https://ryan.dimasc.io/toClass
 *
 *
 * Inspired by classnames by Jed Watson:
 * https://github.com/JedWatson/classnames
 *
 * Builds a string of deduplicated class names
 * using whatever you can throw at it.
 *
 * @param  {...any} args - Class names.
 * @returns {string}
 *
 * @examples
 * toClass('foo', 'bar', 'foo'); // => 'foo bar'
 * toClass(['foo', 'bar', false]); // => 'foo bar'
 * toClass('foo', {bar: true}); // => 'foo bar'
 * toClass({foo: true}, {bar: true}); // => 'foo bar'
 * toClass({foo: true, bar: false}); // => 'foo'
 * toClass({foo: true, bar: true}, [baz, bar], 'foo'); // => 'foo bar baz'
 */
export default (...args) => {
	const CLASS_NAMES = new Set();

	/**
	 * Add a list of strings to `CLASS_NAMES`.
	 * @param {array} classes - A list of classes.
	 */
	const addClasses = classes => classes.forEach(name => CLASS_NAMES.add(name));

	args.forEach(arg => {
		if (!arg) {
			return;
		}

		const argType = typeof arg;

		if (argType === 'string') {
			addClasses(arg.split(' '));
		} else if (argType === 'number') {
			CLASS_NAMES.add(arg.toString());

		// Handle arrays with Array.isArray polyfill
		// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/isArray
		} else if (Object.prototype.toString.call(arg) === '[object Array]') {
			addClasses(arg.flat());

		// Handles objects with Object.keys polyfill
		// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys
		} else if (
			argType === 'object' &&
			arg === new Object(arg) /* eslint-disable-line no-new-object */
		) {
			const keys = [];

			for (const key in arg) {
				if (Object.prototype.hasOwnProperty.call(arg, key) && arg[key]) {
					keys.push(key);
				}
			}

			addClasses(keys);
		}
	});

	return Array.from(CLASS_NAMES).join(' ');
};
