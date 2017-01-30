var debug = require('debug')('pond')

var Promise = require('bluebird')

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

  var self = this

  self._buffers = []

  self._usePromise = false

  self._promise = new Promise(function (resolve, reject) {

    self.once('finish', function () {
      var buffer = Buffer.concat(self._buffers)
      debug('finished collecting %s bytes', buffer.length)

      if ('function' === typeof self._callback) {
        self._callback(null, buffer)
        debug('triggered callback without error')
      }

      if ('function' === typeof self._onspooned) {
        self._onspooned(buffer)
        debug('spooned')
      }

      if (self._usePromise) {
        resolve(buffer)
        debug('resolved')
      }
    })

    self.once('error', function (err) {
      if ('function' === typeof self._callback) {
        self._callback(err)
        debug('callback error emited by self')
      }

      if (self._usePromise) {
        reject(err)
        debug('rejected')
      }
    })

  })

  if (callback) {
    self._callback = callback
  }

  debug('setup finished')

  if (source) {
    source.pipe(self)
    debug('piped source')
  }
}

Pond.prototype._write = function (chunk, encoding, done) {
  this._buffers.push(chunk)
  debug('buffered chunk %s bytes', chunk.length)
  done()
}

Pond.prototype.spoon = function (handler) {
  if ('function' === typeof handler) {
    this._onspooned = handler
    debug('attached spoon handler')
  } else {
    this._usePromise = true
    debug('spoon as a Promise')
    return this._promise
  }
}
