var pond = require('../')
  , CountingStream = require('./counting_stream')

var should = require('should')

describe('pond.api.piping.test.js', function () {

  it('should pipe and spoon', function (done) {
    var counting = new CountingStream(268)
    counting.pipe(pond())
            .spoon(function (buffer) {
              should.exists(buffer)
              buffer.should.be.an.instanceof(Buffer)
              buffer.toString('hex').should.equal(counting.whole.toString('hex'))
              done()
            })
  })

})
