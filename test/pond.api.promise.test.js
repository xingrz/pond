import pond from '../es/pond';
import CountingStream from './counting_stream';

import should from 'should';

describe('pond.api.promise.test.js', () => {

  it('should be a Promise', done => {
    const counting = new CountingStream(324);

    const spoon = pond(counting).spoon();

    should.exists(spoon);
    spoon.should.be.an.instanceof(Promise);
    spoon.then(buffer => {
      should.exists(buffer);
      buffer.should.be.an.instanceof(Buffer);
      buffer.toString('hex').should.equal(counting.whole.toString('hex'));
      done();
    });
  });

  it('should be a Promise (piping)', done => {
    const counting = new CountingStream(321);

    const spoon = counting.pipe(pond()).spoon();

    should.exists(spoon);
    spoon.should.be.an.instanceof(Promise);
    spoon.then(buffer => {
      should.exists(buffer);
      buffer.should.be.an.instanceof(Buffer);
      buffer.toString('hex').should.equal(counting.whole.toString('hex'));
      done();
    });
  });

  it('should throw error by self', done => {
    const counting = new CountingStream(532);
    const error = new Error('This is my fault');

    const stream = pond(counting);
    const spoon = stream.spoon();

    spoon.catch(err => {
      should.exists(err);
      err.should.equal(error);
      done();
    });

    stream.emit('error', error);
  });

  it('should throw error by self (piping)', done => {
    const counting = new CountingStream(242);
    const error = new Error('This is my fault');

    const stream = counting.pipe(pond());
    const spoon = stream.spoon();

    spoon.catch(err => {
      should.exists(err);
      err.should.equal(error);
      done();
    });

    stream.emit('error', error);
  });

})
