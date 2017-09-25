import pond from '../es/pond';
import CountingStream from './counting_stream';

import should from 'should';

describe('pond.api.piping.test.js', () => {

  it('should pipe and spoon', done => {
    const counting = new CountingStream(268);
    counting.pipe(pond()).spoon(buffer => {
      should.exists(buffer);
      buffer.should.be.an.instanceof(Buffer);
      buffer.toString('hex').should.equal(counting.whole.toString('hex'));
      done();
    });
  });

});
