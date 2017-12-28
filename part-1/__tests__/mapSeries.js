'use strict';

const asyncify = require('../lib/asyncify');
const double = require('./utils/functions');

describe('.mapSeries', () => {
  it('map each element', async () => {
    const results = await asyncify.mapSeries([10, 20, 30], double);
    expect(results).toEqual([20, 40, 60]);
  });

  it('limits the numbers of invokes at a given time', async () => {
    const running = [];

    const results = await asyncify.mapSeries([10, 20, 30, 40, 50, 60], async (number) => {
      running.push(number);
      expect(running.length).toBe(1);
      const doubled = await double(number);
      running.pop();
      return doubled;
    });

    expect(results).toEqual([20, 40, 60, 80, 100, 120]);
  });
});
