'use strict';

const asyncify = require('../lib/asyncify');

function lessThan(n) {
  return async (value) => {
    return value < n;
  };
}

describe('.filter', () => {
  it('filters an array given a predicate', async () => {
    const arr = [10, 20, 50, 100, 200];
    const results = await asyncify.filter(arr, lessThan(50));
    expect(results).toEqual([10, 20]);
  });
});
