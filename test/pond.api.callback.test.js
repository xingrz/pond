import pond from '../es/pond';
import CountingStream from './counting_stream';

import should from 'should';

describe('pond.api.callback.test.js', () => {

  it('should callback buffer', done => {
    const counting = new CountingStream(381);
    pond(counting, (err, buffer) => {
      should.not.exists(err);
      should.exists(buffer);
      buffer.should.be.an.instanceof(Buffer);
      buffer.toString('hex').should.equal(counting.whole.toString('hex'));
      done();
    });
  });

  it('should callback error by self', done => {
    const counting = new CountingStream(221);
    const error = new Error('This is my fault');

    pond(counting, (err, buffer) => {
      should.exists(err);
      should.not.exists(buffer);
      err.should.equal(error);
      done();
    }).emit('error', error);
  });

});
