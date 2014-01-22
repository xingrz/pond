var debug = require('debug')('pond')

var Writable = require('stream').Writable
  , Readable = require('stream').Readable
  , inherits = require('util').inherits

module.exports = Pond
inherits(Pond, Writable)

function Pond (source, callback, options) {
  if (!(this instanceof Pond)) {
    return new Pond(source, callback, options)
  }

  if (!(source instanceof Readable)) {
    options = callback
    callback = source
    source = null
    debug('skipped argument `source`')
  }

  if ('function' !== typeof callback) {
    options = callback
    callback = null
    debug('skipped argument `callback`')
  }

  Writable.call(this, options)

  this._buffers = []

  this.once('finish', function () {
    var buffer = Buffer.concat(this._buffers)
    debug('finished collecting %s bytes', buffer.length)

    if ('function' === typeof this._callback) {
      this._callback(null, buffer)
      debug('triggered callback without error')
    }

    if ('function' === typeof this._onspooned) {
      this._onspooned(buffer)
      debug('spooned')
    }
  })

  if (callback) {
    this._callback = callback
    this.once('error', function (err) {
      callback(err)
      debug('callback error emited by self')
    })
  }

  debug('setup finished')

  if (source) {
    source.pipe(this)
    debug('piped source')
  }
}

Pond.prototype._write = function (chunk, encoding, done) {
  this._buffers.push(chunk)
  debug('buffered chunk %s bytes', chunk.length)
  done()
}

Pond.prototype.spoon = function (handler) {
  this._onspooned = handler
  debug('attached spoon handler')
}
