import pond from '../src/pond';
import CountingStream from './counting_stream';

test('should pipe and spoon', done => {
  const counting = new CountingStream(268);
  counting.pipe(pond()).spoon(buffer => {
    expect(buffer).toBeInstanceOf(Buffer);
    expect(buffer.toString('hex')).toEqual(counting.whole.toString('hex'));
    done();
  });
});
