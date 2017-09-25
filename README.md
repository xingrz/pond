pond
====

[![][travis-img]][travis-url] [![][coveralls-img]][coveralls-url] [![][npm-version]][npm-url] [![][npm-downloads]][npm-url] [![][license-img]][license-url] [![][issues-img]][issues-url]

Collect a stream into a buffer.

Please aware that, because buffers came out from a stream are buffered into the memory, **DO NOT try to collect a stream that is large or with unknowable length!**


## Requirements

Node >= 4, tested on latest Node and latest LTS Node.


## Installation

```sh
npm install --save pond
```


## Usage

### Promise, await

```js
const buffer = await stream.pipe(pond()).spoon();
```

```js
const buffer = await pond(stream).spoon();
```

### Stream API (piping):

```js
fs.createReadStream('somefile')
  .pipe(pond())
  .on('error', (err) => {
    // ...
  })
  .spoon((buffer) => {
    // ...
  });
```

### Or, old-fashioned callback:

```js
pond(fs.createReadStream('anotherfile'), function (err, buffer) {
  // ...
});
```


## Test

```sh
npm test
```


## License

This project is released under the terms of [MIT License](LICENSE).


[travis-img]: https://img.shields.io/travis/xingrz/pond/master.svg?style=flat-square
[travis-url]: https://travis-ci.org/xingrz/pond
[coveralls-img]: https://img.shields.io/coveralls/xingrz/pond/master.svg?style=flat-square
[coveralls-url]: https://coveralls.io/r/xingrz/pond
[npm-version]: https://img.shields.io/npm/v/pond.svg?style=flat-square
[npm-downloads]: https://img.shields.io/npm/dm/pond.svg?style=flat-square
[npm-url]: https://www.npmjs.org/package/pond
[license-img]: https://img.shields.io/npm/l/pond.svg?style=flat-square
[license-url]: LICENSE
[issues-img]:	https://img.shields.io/github/issues/xingrz/pond.svg?style=flat-square
[issues-url]: https://github.com/xingrz/pond/issues
