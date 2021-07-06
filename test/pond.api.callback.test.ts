import pond from '../src/pond';
import CountingStream from './counting_stream';

test('callback buffer', done => {
  const counting = new CountingStream(381);
  pond(counting, (err, buffer) => {
    expect(err).toBeFalsy();
    expect(buffer).toBeInstanceOf(Buffer);
    expect(buffer!.toString('hex')).toEqual(counting.whole.toString('hex'));
    done();
  });
});

test('callback error by self', done => {
  const counting = new CountingStream(221);
  const error = new Error('This is my fault');

  pond(counting, (err, buffer) => {
    expect(err).toBe(error);
    expect(buffer).toBeFalsy();
    done();
  }).emit('error', error);
});
