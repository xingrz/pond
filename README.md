pond
====

[![][travis-img]][travis-url] [![][coveralls-img]][coveralls-url] [![][npm-version]][npm-url] [![][npm-downloads]][npm-url] [![][license-img]][license-url] [![][issues-img]][issues-url]

Collect a stream into a buffer.

Please aware that, because buffers came out from a stream are buffered into the memory, **DO NOT try to collect a stream that is large or with unknowable length!**


## Installation

```
$ npm install pond
```


## Usage

### Piping:

```js
fs.createReadStream('somefile')
  .pipe(pond())
  .spoon(function (buffer) {
    // ...
  })
```

### Or:

```js
pond(fs.createReadStream('anotherfile'), function (err, buffer) {
  // ...
})
```


## Test

```
$ npm test
```


## License

This project is released under the terms of [MIT License](LICENSE).


[travis-img]: https://img.shields.io/travis/xingrz/pond.svg?style=flat-square
[travis-url]: https://travis-ci.org/xingrz/pond
[coveralls-img]: https://img.shields.io/coveralls/xingrz/pond.svg?style=flat-square
[coveralls-url]: https://coveralls.io/r/xingrz/pond
[npm-version]: https://img.shields.io/npm/v/pond.svg?style=flat-square
[npm-downloads]: https://img.shields.io/npm/dm/pond.svg?style=flat-square
[npm-url]: https://www.npmjs.org/package/pond
[license-img]: https://img.shields.io/npm/l/pond.svg?style=flat-square
[license-url]: LICENSE
[issues-img]:	https://img.shields.io/github/issues/xingrz/pond.svg?style=flat-square
[issues-url]: https://github.com/xingrz/pond/issues
