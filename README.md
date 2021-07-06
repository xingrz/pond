pond [![CI](https://github.com/xingrz/pond/actions/workflows/ci.yml/badge.svg)](https://github.com/xingrz/pond/actions/workflows/ci.yml)
====

[![][coveralls-img]][coveralls-url] [![][npm-version]][npm-url] [![][npm-downloads]][npm-url] [![][license-img]][license-url] [![][issues-img]][issues-url] [![commits][commits-img]][commits-url]

Collect a stream into a buffer.

Please aware that, because buffers came out from a stream are buffered into the memory, **DO NOT try to collect a stream that is large or with unknowable length!**

```js
import { createReadStream } from 'fs';
import { createHash } from 'crypto';
import pond from 'pond';

const digest = await createReadStream('/path/to/some/file')
  .pipe(createHash('sha256'))
  .pipe(pond())
  .spoon();

console.log(digest.toString('hex'));
```


## Requirements

Node >= 10, tested on latest Node and latest LTS Node.


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


[coveralls-img]: https://img.shields.io/coveralls/xingrz/pond/master.svg?style=flat-square
[coveralls-url]: https://coveralls.io/r/xingrz/pond
[npm-version]: https://img.shields.io/npm/v/pond.svg?style=flat-square
[npm-downloads]: https://img.shields.io/npm/dm/pond.svg?style=flat-square
[npm-url]: https://www.npmjs.org/package/pond
[license-img]: https://img.shields.io/npm/l/pond.svg?style=flat-square
[license-url]: LICENSE
[issues-img]:	https://img.shields.io/github/issues/xingrz/pond.svg?style=flat-square
[issues-url]: https://github.com/xingrz/pond/issues
[commits-img]: https://img.shields.io/github/last-commit/xingrz/pond?style=flat-square
[commits-url]: https://github.com/xingrz/pond/commits/master
