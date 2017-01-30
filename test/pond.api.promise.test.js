var Promise = require('bluebird')

var pond = require('../')
  , CountingStream = require('./counting_stream')

var should = require('should')

describe('pond.api.promise.test.js', function () {

  it('should be a Promise', function (done) {
    var counting = new CountingStream(324)

    var spoon = pond(counting).spoon()

    should.exists(spoon)
    spoon.should.be.an.instanceof(Promise)
    spoon.then(function (buffer) {
      should.exists(buffer)
      buffer.should.be.an.instanceof(Buffer)
      buffer.toString('hex').should.equal(counting.whole.toString('hex'))
      done()
    })
  })

  it('should be a Promise (piping)', function (done) {
    var counting = new CountingStream(321)

    var spoon = counting.pipe(pond()).spoon()

    should.exists(spoon)
    spoon.should.be.an.instanceof(Promise)
    spoon.then(function (buffer) {
      should.exists(buffer)
      buffer.should.be.an.instanceof(Buffer)
      buffer.toString('hex').should.equal(counting.whole.toString('hex'))
      done()
    })
  })

  it('should throw error by self', function (done) {
    var counting = new CountingStream(532)
      , error = new Error('This is my fault')

    var stream = pond(counting)
      , spoon = stream.spoon()

    spoon.catch(function (err) {
      should.exists(err)
      err.should.equal(error)
      done()
    })

    stream.emit('error', error)
  })

  it('should throw error by self (piping)', function (done) {
    var counting = new CountingStream(242)
      , error = new Error('This is my fault')

    var stream = counting.pipe(pond())
      , spoon = stream.spoon()

    spoon.catch(function (err) {
      should.exists(err)
      err.should.equal(error)
      done()
    })

    stream.emit('error', error)
  })

})
