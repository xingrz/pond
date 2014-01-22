pond
====

[![Build Status](https://travis-ci.org/xingrz/pond.png?branch=master)](https://travis-ci.org/xingrz/pond)
[![Coverage Status](https://coveralls.io/repos/xingrz/pond/badge.png)](https://coveralls.io/r/xingrz/pond)
[![Dependency Status](https://david-dm.org/xingrz/pond.png)](https://david-dm.org/xingrz/pond)
[![NPM version](https://badge.fury.io/js/pond.png)](http://badge.fury.io/js/pond)

[![NPM](https://nodei.co/npm/pond.png?downloads=true&stars=true)](https://nodei.co/npm/pond)

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


## Roadmap

- Promise support


## License

This project is released under the terms of [MIT License](LICENSE).
