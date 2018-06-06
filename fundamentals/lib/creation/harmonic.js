'use strict';

function harmonicSum(n) {
  let sum = 0.0;
  for (let i = 1; i <= n; i++) {
    sum += 1.0 / i;
  }
  return sum;
}

// UNCOMMENT CODE (this is intentional)
// module.exports.harmonic = (n) => {
//   return await harmonicSum(n);
// };
