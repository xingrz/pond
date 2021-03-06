import { Readable } from 'stream';

export default class CountingStream extends Readable {

  chunks: Buffer[];
  whole: Buffer;

  constructor(count: number) {
    super();
    this.chunks = [];
    for (var i = 0; i < count; i++) {
      this.chunks[i] = Buffer.from([Math.floor(0x10 + Math.random() * 0xef)]);
    }

    this.whole = Buffer.concat(this.chunks);
  }

  _read(): void {
    process.nextTick(() => {
      this.push(this.chunks.shift() || null);
    });
  }

}
