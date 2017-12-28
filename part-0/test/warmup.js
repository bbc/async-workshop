'use strict';

const _ = require('lodash');

const assert = require('chai').assert;
const bluebird = require('bluebird');
const FlakyService = require('../lib/FlakyService');
const ServiceError = require('../lib/ServiceError');

const Warmup = require('../lib/warmup');

function legacyBy100(n, cb) {
  cb(null, n * 100);
}

describe('Warmup', () => {
  describe('Creation', () => {
    it('Question 1.', async () => {
      const str = await Warmup.usingConstructor('kempt');
      assert.equal(str, 'tpmek');
    });

    it('Question 2.', async () => {
      const message = 'successfully rejected';
      try {
        await Warmup.errorOnConstruction(message);
      } catch (err) {
        assert.equal(err.message, message);
      }
    });

    it('Question 3.', async () => {
      const str = 'dank';
      const actual = await Warmup.immediately(str);
      assert.equal(actual, str);
    });

    it('Question 4.', async () => {
      const str = await Warmup.reverse('kempt');
      assert.equal(str, 'tpmek');
    });

    it('Question 5.', async () => {
      // initially, no click through for `.calculateHarmonic`
      const harmonic = await Warmup.calculateHarmonic(Promise.resolve(5));
      assert.equal(harmonic, 2.283333333333333);
    });

    it('Question 6.', async () => {
      const pending = Warmup.toNative(bluebird.resolve(10));
      assert.instanceOf(pending, Promise);
    });

    it('Question 7.', async () => {
      const by100 = Warmup.toPromise(legacyBy100);
      const ans = await by100(10);
      assert.equal(ans, 1000);
    });
  });

  describe('Transfornation', () => {
    it('Question 1.', async () => {
      assert.equal(await Warmup.chainWithAsnyc(), await Warmup.chain());
    });

    it('Question 2.', async () => {
      assert.equal(await Warmup.multipleSequentialCalls(), 'abcdefghijklmnopqrstuvwxyz');
    });
  });

  describe('Error handling', () => {
    describe('with promises', () => {
      it('Question 1.', async () => {
        const flaky = new FlakyService(true);

        try {
          await Warmup.promiseOnError(flaky);
        } catch (err) {
          return assert.instanceOf(err, ServiceError);
        }
        assert.fail('test did not throw');
      });

      it('Question 2.', async () => {
        const flaky = new FlakyService(true);

        try {
          await Warmup.promiseOnError(flaky);
        } catch (err) {
          return assert.isTrue(flaky.isClosed(), 'shutdown not called');
        }

        assert.fail('test did not throw');
      });
    });

    describe('with async/await', () => {
      it('Question 3. ', async () => {
        const flaky = new FlakyService(true);

        try {
          await Warmup.asyncOnError(flaky);
        } catch (err) {
          return assert.instanceOf(err, ServiceError);
        }

        assert.fail('test did not throw');
      });

      it('Question 4. ', async () => {
        const flaky = new FlakyService(true);

        try {
          await Warmup.asyncOnError(flaky);
        } catch (err) {
          return assert.isTrue(flaky.isClosed(), 'shutdown not called');
        }

        assert.fail('test did not throw');
      });
    });
  });

  describe('Aggregating results', async () => {
    it('Question 1. ', async () => {
      const flaky = new FlakyService(false);
      const responses = await Warmup.aggregating(flaky);
      assert.deepEqual(_.map(responses, 'id'), _.range(1, 51));
    });

    it('Question 2. ', async () => {
      const flaky = new FlakyService(false);
      const first = await Warmup.first(flaky);
      assert.equal(first.id, flaky.getFatestRequest());
    });
  });
});
