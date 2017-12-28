'use strict';

const _ = require('lodash');

// DO NOT MODIFY THIS FILE
class FlakyServiceError extends Error {}

class FlakyService {
  constructor(flakyMode) {
    this._delayMs = 20;
    this._closed = false;
    this._flakyMode = flakyMode;
    this._count = 0;
    this._fastestRequest = _.random(2, 50);
  }

  _getDelay() {
    return this._count === this._fastestRequest ? 5 : this._delayMs;
  }

  makeRequest() {
    this._count++;
    const curr = this._count;

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (this._flakyMode) {
          return reject(new FlakyServiceError());
        }
        resolve({ id: curr });
      }, this._getDelay());
    });
  }

  getFatestRequest() {
    return this._fastestRequest;
  }

  isClosed() {
    return this._closed;
  }

  shutdown() {
    this._closed = true;
  }
}

module.exports = FlakyService;
