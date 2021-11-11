import { Writable, Readable, WritableOptions } from 'stream';

const debug = require('debug')('pond');

type ICallback = (err?: Error | null, buffer?: Buffer) => void;

export default function pond(source: Readable | null = null, callback: ICallback | null = null, options?: WritableOptions) {
  return new Pond(source, callback, options);
}

class Pond extends Writable {

  private _buffers: Buffer[] = [];
  private _usePromise = false;
  private _promise: Promise<Buffer>;

  private _callback?: ICallback;
  private _onspooned?: (buffer: Buffer) => void;

  constructor(source: Readable | null, callback: ICallback | null, options?: WritableOptions) {
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

  _write(chunk: Buffer, encoding: string, callback: (error?: Error | null) => void): void {
    this._buffers.push(chunk);
    debug('buffered chunk %s bytes', chunk.length);
    callback();
  }

  spoon(): Promise<Buffer>;
  spoon(handler: (buffer: Buffer) => void): void;
  spoon(handler?: (buffer: Buffer) => void): Promise<Buffer> | void {
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

function postponeForError(callback: () => void) {
  process.nextTick(() => process.nextTick(callback));
}
