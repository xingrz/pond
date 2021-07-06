import pond from '../src/pond';
import CountingStream from './counting_stream';

it('should be a Promise', done => {
  const counting = new CountingStream(324);

  const spoon = pond(counting).spoon();

  expect(spoon).toBeInstanceOf(Promise);
  spoon!.then(buffer => {
    expect(buffer).toBeInstanceOf(Buffer);
    expect(buffer.toString('hex')).toEqual(counting.whole.toString('hex'));
    done();
  });
});

it('should be a Promise (piping)', done => {
  const counting = new CountingStream(321);

  const spoon = counting.pipe(pond()).spoon();

  expect(spoon).toBeInstanceOf(Promise);
  spoon!.then(buffer => {
    expect(buffer).toBeInstanceOf(Buffer);
    expect(buffer.toString('hex')).toEqual(counting.whole.toString('hex'));
    done();
  });
});

it('should throw error by self', done => {
  const counting = new CountingStream(532);
  const error = new Error('This is my fault');

  const stream = pond(counting);
  const spoon = stream.spoon();

  spoon!.catch(err => {
    expect(err).toBe(error);
    done();
  });

  stream.emit('error', error);
});

it('should throw error by self (piping)', done => {
  const counting = new CountingStream(242);
  const error = new Error('This is my fault');

  const stream = counting.pipe(pond());
  const spoon = stream.spoon();

  spoon!.catch(err => {
    expect(err).toBe(error);
    done();
  });

  stream.emit('error', error);
});
