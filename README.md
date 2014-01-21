pond
====

Collect a stream into a buffer.


## Installation

```
$ npm install pond
```


## Usage

```js
var fs = require('fs')
  , pond = require('pond')

// with piping
fs.createReadStream('somefile').pipe(pond(function (err, buffer) {
  // ...
}))

// or
pond(fs.createReadStream('anotherfile'), function (err, buffer) {
  // ...
})
```
