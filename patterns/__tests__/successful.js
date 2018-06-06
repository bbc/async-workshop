'use strict';

const asyncify = require('../lib/asyncify');

describe('.successful', () => {
  it('returns an array of successfully executions', async () => {
    const results = await asyncify.successful([
      Promise.resolve('a'),
      Promise.resolve('b'),
      Promise.resolve('c')
    ]);

    expect(results[0]).toBe('a');
    expect(results[1]).toBe('b');
    expect(results[2]).toBe('c');
  });

  it('returns errors in place of failures', async () => {
    const results = await asyncify.successful([
      Promise.resolve('a'),
      Promise.reject(new Error('b failed')),
      Promise.resolve('c'),
      Promise.reject(new Error('d failed'))
    ]);

    expect(results[0]).toBe('a');
    expect(results[1].message).toBe('b failed');
    expect(results[2]).toBe('c');
    expect(results[3].message).toBe('d failed');
  });
});
