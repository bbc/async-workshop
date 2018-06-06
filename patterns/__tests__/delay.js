'use strict';

const asyncify = require('../lib/asyncify');

describe('.delay', () => {
  it('sleeps for a given number of milliseconds', async () => {
    const start = new Date();
    await asyncify.delay(100);
    const timeTaken = new Date() - start;
    expect(timeTaken).toBeGreaterThanOrEqual(100);
    expect(timeTaken).toBeLessThanOrEqual(115);
  });
});
