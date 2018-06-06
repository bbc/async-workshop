'use strict';

const asyncify = require('../lib/asyncify');

describe('.delayedReject', () => {
  it('rejects after a given number of milliseconds', async () => {
    const start = new Date();
    let timeTaken = 0;

    try {
      await asyncify.delayReject(100, new Error('bad!'));
    } catch (err) {
      timeTaken = new Date() - start;
    }

    expect(timeTaken).toBeGreaterThanOrEqual(100);
    expect(timeTaken).toBeLessThanOrEqual(115);
  });
});
