'use strict';

const asyncify = require('../lib/asyncify');
const double = require('./utils/functions');
const ExecutorError = require('./../lib/private/ExecutorError');

describe('.mapLimit', () => {
  it('map each element', async () => {
    const results = await asyncify.mapLimit([10, 20, 30], double, 2);
    expect(results).toEqual([20, 40, 60]);
  });

  it('returns an empty array when iter is undefined', async () => {
    const results = await asyncify.mapLimit(undefined, double, 2);
    expect(results).toEqual([]);
  });

  it('limit zero', async () => {
    const input = [10, 20, 30];
    const results = await asyncify.mapLimit(
      input,
      async () => {
        throw new Error('fn was called unexpectedly');
      },
      0
    );
    expect(results).toEqual([]);
  });

  it('limits the numbers of invokes at a given time', async () => {
    const limit = 2;
    const running = [];

    const results = await asyncify.mapLimit(
      [10, 20, 30, 40, 50, 60],
      async (number) => {
        running.push(number);
        expect(running.length).toBeLessThanOrEqual(limit);
        const doubled = await double(number);
        running.pop();
        return doubled;
      },
      limit
    );

    expect(results).toEqual([20, 40, 60, 80, 100, 120]);
  });

  it('does not make more invocations that arr length', async () => {
    const input = [10, 20, 30, 40, 50, 60];
    const limit = input.length + 10;
    const running = [];

    const results = await asyncify.mapLimit(
      input,
      async (number) => {
        running.push(number);
        expect(running.length).toBeLessThanOrEqual(limit);
        const doubled = await double(number);
        running.pop();
        return doubled;
      },
      limit
    );

    expect(results).toEqual([20, 40, 60, 80, 100, 120]);
  });

  it('has a default concurrency level of 1');

  it('returns an error if at least one invocation fails', async () => {
    let calls = 0;
    try {
      await asyncify.mapLimit(
        [10, 0, 30],
        async (n) => {
          calls++;
          if (n === 0) throw new Error('div by zero');
          return 10 / n;
        },
        1
      );
    } catch (err) {
      expect(err).toBeInstanceOf(ExecutorError);
      expect(calls).toBe(2);
    }
  });

  it('supports synchronous functions', async () => {
    const results = await asyncify.mapLimit(
      [10, 20, 30],
      async (n) => {
        return n * 2;
      },
      1
    );
    expect(results).toEqual([20, 40, 60]);
  });
});
