'use strict';

const asyncify = require('../lib/asyncify');

describe('.reduce', () => {
  async function sum(acc, value) {
    return acc + value;
  }

  it('applies a given fn to each element of the array and an accumulator', async () => {
    const results = await asyncify.reduce([10, 20, 30], sum, 0);
    expect(results).toBe(60);
  });

  it('can reduce other iterable objects', async () => {
    const iterable = new Map([['a', 10], ['b', 20], ['c', 30]]);
    const results = await asyncify.reduce(iterable, sum, 0);
    expect(results).toBe(60);
  });

  it('reduces an object', async () => {
    const obj = {
      a: 10,
      b: 20,
      c: 30
    };
    const results = await asyncify.reduce(obj, sum, 0);
    expect(results).toBe(60);
  });
});
