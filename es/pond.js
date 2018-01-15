import { Writable, Readable } from 'stream';

const debug = require('debug')('pond');

export default function pond(source, callback, options) {
  return new Pond(source, callback, options);
}

export class Pond extends Writable {

  _buffers = [];
  _usePromise = false;

  constructor(source, callback, options) {
    if (!(source instanceof Readable)) {
      options = callback;
      callback = source;
      source = null;
      debug('skipped argument `source`');
    }

    if ('function' !== typeof callback) {
      options = callback;
      callback = null;
      debug('skipped argument `callback`');
    }

    super(options);

    this._promise = new Promise((resolve, reject) => {

      let hasError = false;

      this.once('finish', () => postponeForError(() => {
        if (hasError) return;

        const buffer = Buffer.concat(this._buffers);
        debug('finished collecting %s bytes', buffer.length);

        if ('function' === typeof this._callback) {
          this._callback(null, buffer);
          debug('triggered callback without error');
        }

        if ('function' === typeof this._onspooned) {
          this._onspooned(buffer);
          debug('spooned');
        }

        if (this._usePromise) {
          resolve(buffer);
          debug('resolved');
        }
      }));

      this.once('error', (err) => {
        if ('function' === typeof this._callback) {
          this._callback(err);
          debug('callback error emited by self');
        }

        if (this._usePromise) {
          reject(err);
          debug('rejected');
        }
      });

      this.on('pipe', (source) => {
        source.once('error', (e) => {
          hasError = true;
          this.destroy(e);
        });
      });

    });

    if (callback) {
      this._callback = callback;
    }

    debug('setup finished');

    if (source) {
      source.pipe(this);
      debug('piped source');
    }
  }

  _write(chunk, encoding, done) {
    this._buffers.push(chunk);
    debug('buffered chunk %s bytes', chunk.length);
    done();
  }

  spoon(handler) {
    if ('function' === typeof handler) {
      this._onspooned = handler;
      debug('attached spoon handler');
    } else {
      this._usePromise = true;
      debug('spoon as a Promise');
      return this._promise;
    }
  }

}

function postponeForError(callback) {
  process.nextTick(() => process.nextTick(callback));
}
