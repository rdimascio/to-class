# to-class

[![Build status](https://img.shields.io/travis/rdimascio/to-class/master?style=flat-square)](https://travis-ci.org/rdimascio/to-class)
[![Coverage](https://img.shields.io/coveralls/github/rdimascio/to-class/master?style=flat-square)](https://coveralls.io/github/rdimascio/to-class?branch=master)
[![npm version](https://img.shields.io/npm/v/to-class?style=flat-square)](https://www.npmjs.com/package/to-class)
[![CDNJS version](https://img.shields.io/cdnjs/v/to-class.svg?style=flat-square)](https://cdnjs.com/libraries/to-class)
[![Donate](https://img.shields.io/badge/donate-paypal-blue?style=flat-square)](https://www.paypal.me/rdimascio/5)

Builds a string of conditional, deduplicated classNames using whatever you can throw at it.

```ssh
# npm
npm install to-class

# yarn
yarn add to-class
```

## Usage

```js
import toClass from 'to-class';

toClass('foo', 'bar', 'foo'); // => 'foo bar'
toClass(['foo', 'bar', false]); // => 'foo bar'
toClass('foo', {bar: true}); // => 'foo bar'
toClass({foo: true}, {bar: true}); // => 'foo bar'
toClass({foo: true, bar: false}); // => 'foo'
toClass({foo: true, bar: true}, ['bar', 'baz', ['foo']], 'foo'); // => 'foo bar baz'
```

## Polyfill

If you need to support browsers <= IE11 you can import the polyfilled version.

```js
import toClass from 'to-class/polyfill';
```
