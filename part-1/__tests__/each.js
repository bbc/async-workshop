'use strict';

const asyncify = require('../lib/asyncify');

describe('.each', () => {
  it('call a given function for each element', async () => {
    let str = '';
    await asyncify.each(['a', 'b', 'c', 'd'], (char) => {
      str += char;
    });
    expect(str).toBe('abcd');
  });
});
