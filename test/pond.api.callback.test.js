var pond = require('../')
  , CountingStream = require('./counting_stream')

var should = require('should')

describe('pond.api.callback.test.js', function () {

  it('should callback buffer', function (done) {
    var counting = new CountingStream(381)
    pond(counting, function (err, buffer) {
      should.not.exists(err)
      should.exists(buffer)
      buffer.should.be.an.instanceof(Buffer)
      buffer.toString('hex').should.equal(counting.whole.toString('hex'))
      done()
    })
  })

  it('should callback error by self', function (done) {
    var counting = new CountingStream(221)
      , error = new Error('This is my fault')

    pond(counting, function (err, buffer) {
      should.exists(err)
      should.not.exists(buffer)
      err.should.equal(error)
      done()
    }).emit('error', error)
  })

})
