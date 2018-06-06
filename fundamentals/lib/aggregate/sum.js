'use strict';

async function square(n) {
  return n * n;
}

module.exports.sumOfSquares = async (arr) => {
  // Fix the simple bug. `.reduce` must be used
  const acc = 0;
  return arr.reduce(async (acc, value) => {
    acc = acc + square(value);
    return acc;
  }, acc);
};

