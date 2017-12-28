'use strict';

const asyncify = require('../lib/asyncify');
const double = require('./utils/functions');

describe('.map', async () => {
  it('map each element', async () => {
    const results = await asyncify.map([10, 20, 30], double);
    expect(results).toEqual([20, 40, 60]);
  });

  it('does not mutable input', async () => {
    const input = [10, 20, 30];
    const results = await asyncify.map(input, double);
    expect(input).toEqual(input);
  });

  it('returns an empty array when the input is undefined', async () => {
    const results = await asyncify.map(undefined, double);
    expect(results).toEqual([]);
  });

  it('map of value of an Object', async () => {
    const obj = {
      a: 10,
      b: 20,
      c: 30
    };
    const results = await asyncify.map(obj, double);
    expect(results).toEqual([20, 40, 60]);
  });

  it('map of element of an Map', async () => {
    const map = new Map([['a', 10], ['b', 20], ['c', 30]]);
    const results = await asyncify.map(map, double);

    expect(results).toEqual([20, 40, 60]);
  });

  it('map of element of an Set', async () => {
    const set = new Set([10, 20, 30]);
    const results = await asyncify.map(set, double);

    expect(results).toEqual([20, 40, 60]);
  });
});
