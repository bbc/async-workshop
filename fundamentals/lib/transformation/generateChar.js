'use strict';

// DONT MODIFY THIS FUNCTION
// Helper fn - returns a fn that creates a different char per call, starting with 'a'
// NOTE - does not rotate.
module.exports = () => {
  let code = 'a'.charCodeAt(0) - 1;
  return async () => {
    return String.fromCharCode(++code);
  };
};
