'use strict';

const generateChar = require('./generateChar');

// DONT MODIFY THIS FUNCTION
function chain() {
  const next = generateChar();
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

async function chainWithAsync() {
  // Write async/await version of `.chain` here
}

module.exports.chain = chain;
module.exports.chainWithAsync = chainWithAsync;
