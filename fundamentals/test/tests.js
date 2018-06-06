'use strict';

const _ = require('lodash');

const assert = require('chai').assert;
const bluebird = require('bluebird');
const FlakyService = require('../lib/FlakyService');
const ServiceError = require('../lib/ServiceError');

const promiseReverse = require('../lib/creation/pRev').reverse;
const cbReverse = require('../lib/creation/cbRev').reverse;
const cbWithError = require('../lib/creation/cbError').createError;
const promiseWithError = require('../lib/creation/pError').withError;
const now = require('../lib/creation/now').now;
const isUnique = require('../lib/creation/unique').isUnique;
const { harmonic } = require('../lib/creation/harmonic');
const toNative = require('../lib/creation/convertWithNative').convert;
const toNative2 = require('../lib/creation/convertWithoutPromise').convert;
const toPromise = require('../lib/creation/toPromise').toPromise;
const toCallback = require('../lib/creation/toCallback').toCallback;
const { chain, chainWithAsync } = require('../lib/transformation/chain');
const multipleSequentialCalls = require('../lib/transformation/multiple').multple;
const handleError = require('../lib/errors/promise').handleError;
const { handleAsyncError } = require('../lib/errors/async');
const { aggregateWithPromises } = require('../lib/aggregate/aggregate');
const { sumOfSquares } = require('../lib/aggregate/sum');
const { first } = require('../lib/aggregate/first');
const { toAsync } = require('../lib/creation/toAsync');
const { compress } = require('../lib/advanced/compress');

function mulBy100(n, cb) {
  cb(null, n * 100);
}

function lessThan(n) {
  return (value) => {
    return value < n;
  };
}

async function divBy100(n) {
  return n / 100;
}

describe('Fundamentals', () => {
  describe('Construction', () => {
    it('Reverse string with a callback.', (done) => {
      cbReverse('abdnghnrnfnsdfnsdfghku896323ddghh233ffdsss', (err, value) => {
        assert.ifError(err);
        assert.equal(value, 'sssdff332hhgdd323698ukhgfdsnfdsnfnrnhgndba');
        done();
      });
    });

    it('Reverse string with promise.', async () => {
      const str = await promiseReverse('gotjrjdffpspdsgsdgsdfgfh45534e2gsdfsdfvbyu');
      assert.equal(str, 'uybvfdsfdsg2e43554hfgfdsgdsgsdpspffdjrjtog');
    });

    it('Callback yield error', (done) => {
      const message = 'successfully rejected';
      cbWithError(message, (err) => {
        assert.ok(err);
        assert.equal(err.message, message);
        done();
      });
    });

    it('Promise with error', async () => {
      const message = 'successfully rejected';
      try {
        await promiseWithError(message);
      } catch (err) {
        return assert.equal(err.message, message);
      }
      assert.fail('test did not throw');
    });

    it('return immediately', async () => {
      const str = 'dank';
      const actual = await now(str);
      assert.equal(actual, str);
    });

    it('is unique', async () => {
      const unqiue = 'abcdef';
      const notUnique = 'abbcdef';
      assert.isTrue(await isUnique(unqiue));
      assert.isFalse(await isUnique(notUnique));
    });

    // UNCOMMENT THIS TEST
    // it('calculates a harmonic numbers', async () => {
    //   const sum = await harmonic(5);
    //   assert.equal(sum, 2.283333333333333);
    // });

    it('converts with a native promise', async () => {
      const pending = toNative(bluebird.resolve(10));
      assert.instanceOf(pending, Promise);
    });

    it('converts without using promise directly', async () => {
      const pending = toNative2(bluebird.resolve(10));
      assert.instanceOf(pending, Promise);
    });

    it('converts from callback', async () => {
      const by100 = toPromise(mulBy100);
      const fn = await by100(10);
      assert.equal(fn, 1000);
    });

    it('converts to callback', (done) => {
      const fn = toCallback(divBy100);
      fn(1000, (err, value) => {
        assert.equal(value, 10);
        done();
      });
    });

    it('converts a function to an async function', async () => {
      const fn = toAsync(lessThan(10));
      const ans = await fn(5);
      assert.isTrue(ans);
      assert.equal(fn.constructor.name, 'AsyncFunction');
    });
  });

  describe('Transformation', () => {
    it('chains calls using async/await', async () => {
      assert.equal(await chainWithAsync(), await chain());
    });

    it('makes sequentials calls', async () => {
      assert.equal(await multipleSequentialCalls(), 'abcdefghijklmnopqrstuvwxyz');
    });
  });

  describe('Error handling', () => {
    describe('with promises', () => {
      it('handles a service error', async () => {
        const flaky = new FlakyService(true);

        try {
          await handleError(flaky);
        } catch (err) {
          return assert.instanceOf(err, ServiceError);
        }
        assert.fail('test did not throw');
      });

      it('always shutdowns', async () => {
        const flaky = new FlakyService(true);

        try {
          await handleError(flaky);
        } catch (err) {
          return assert.isTrue(flaky.isClosed(), 'shutdown not called');
        }

        assert.fail('test did not throw');
      });
    });

    describe('with async/await', () => {
      it('handles errors with async functions', async () => {
        const flaky = new FlakyService(true);

        try {
          await handleAsyncError(flaky);
        } catch (err) {
          return assert.instanceOf(err, ServiceError);
        }

        assert.fail('test did not throw');
      });

      it('always shutdowns using async', async () => {
        const service = new FlakyService(true);

        try {
          await handleAsyncError(service);
        } catch (err) {
          return assert.isTrue(service.isClosed(), 'shutdown not called');
        }

        assert.fail('test did not throw');
      });
    });
  });

  describe('Aggregating results', async () => {
    it('n^2 each number and returns sum', async () => {
      const s = await sumOfSquares([10, 20, 30, 40]);
      assert.equal(s, 3000);
    });

    it('aggregates multiple requests with promises', async () => {
      const flaky = new FlakyService(false);
      const responses = await aggregateWithPromises(flaky);
      assert.deepEqual(_.map(responses, 'id'), _.range(1, 51));
    });

    it('returns the first to complete', async () => {
      const flaky = new FlakyService(false);
      const res = await first(flaky);
      assert.equal(res.id, flaky.getFatestRequest());
    });
  });

  describe('advanced', () => {
    it('compress a string', async () => {
      const ans = await compress('aabccccczzzz');
      assert.equal(ans, 'a2b2c5z4');
    });
  });
});
