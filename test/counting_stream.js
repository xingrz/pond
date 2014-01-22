var Readable = require('stream').Readable
  , inherits = require('util').inherits

module.exports = CountingStream
inherits(CountingStream, Readable)

function CountingStream (count) {
  Readable.call(this)

  this.chunks = []
  for (var i = 0; i < count; i++) {
    this.chunks[i] = new Buffer(
        Math.floor(0x10 + Math.random() * 0xef).toString(16)
      , 'hex')
  }

  this.whole = Buffer.concat(this.chunks)
}

CountingStream.prototype._read = function () {
  var self = this

  process.nextTick(function () {
    self.push(self.chunks.shift())
  })
}
