# to-class

[![Build status](https://img.shields.io/travis/rdimascio/to-class/master?style=flat-square)](https://travis-ci.org/rdimascio/to-class)
[![Coverage](https://img.shields.io/coveralls/github/rdimascio/to-class/master?style=flat-square)](https://coveralls.io/github/rdimascio/to-class?branch=master)
[![npm version](https://img.shields.io/npm/v/to-class?style=flat-square)](https://www.npmjs.com/package/to-class)
[![Donate](https://img.shields.io/badge/donate-paypal-blue?style=flat-square)](https://www.paypal.me/rdimascio/5)

Builds a string of deduplicated conditional classNames using whatever you can throw at it.

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
toClass({foo: true, bar: true}, [baz, bar], 'foo'); // => 'foo bar baz'
```
