'use strict';

const asyncify = require('../lib/asyncify');
const double = require('./utils/functions');

describe('.waterfall', async () => {
  it('executes an array of async functions asynchronously', async () => {
    const results = await asyncify.waterfall([double.bind(null, 10), double, double]);
    expect(results).toBe(80);
  });

  it('supports var args', async () => {
    const results = await asyncify.waterfall(double.bind(null, 10), double, double);
    expect(results).toBe(80);
  });
});
