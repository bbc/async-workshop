'use strict';

class Warmup {
  static async harmonic(n) {
    let sum = 0.0;
    for (let i = 1; i <= n; i++) {
      sum += 1.0 / i;
    }
    return sum;
  }

  // Helper method - returns a fn that creates a different char per call, starting with 'a'
  // NOTE - does not rotate.
  static generateChar() {
    let code = 'a'.charCodeAt(0) - 1;
    return async () => {
      return String.fromCharCode(++code);
    };
  }

  static usingConstructor(str) {
    throw new Error('Not implemented');
  }

  static errorOnConstruction(message) {
    throw new Error('Not implemented');
  }

  static immediately(str) {
    throw new Error('Not implemented');
  }

  // FIX THIS - intensionally commented out

  // static calculateHarmonic(pendingNth) {
  //   const nth = await pendingNth;
  //   return Warmup.harmonic(nth);
  // }

  static toNative(pending) {
    throw new Error('Not implemented');
  }

  static toPromise(fn) {
    throw new Error('Not implemented');
  }

  static async chain() {
    const next = Warmup.generateChar();
    return next()
      .then((a) => {
        return next().then((b) => {
          return a + b;
        });
      })
      .then((ab) => {
        return next().then((c) => {
          return ab + c;
        });
      })
      .then((abc) => {
        return next().then((d) => {
          return abc + d;
        });
      });
  }

  static async chainWithAsnyc() {
    throw new Error('Not implemented');
  }

  static async multipleSequentialCalls() {
    throw new Error('Not implemented');
  }

  static promiseOnError(flaky) {
    throw new Error('Not implemented');
  }

  static async asyncOnError(flaky) {
    throw new Error('Not implemented');
  }

  static aggregating(flaky) {
    throw new Error('Not implemented');
  }

  static first(flaky) {
    throw new Error('Not implemented');
  }
}

module.exports = Warmup;
