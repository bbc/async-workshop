'use strict';

const asyncify = require('../lib/asyncify');

function createTask(name, arr, timeout) {
  return async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        arr.push(name);
        resolve(`done->${name}`);
      }, timeout);
    });
  };
}

describe('.parallel', () => {
  it('executes an array of async functions in parallel', async () => {
    const completionOrder = [];
    const results = await asyncify.parallel([
      createTask('a', completionOrder, 100),
      createTask('b', completionOrder, 250),
      createTask('c', completionOrder, 20)
    ]);
    expect(completionOrder).toEqual(['c', 'a', 'b']);
    expect(results).toEqual(['done->a', 'done->b', 'done->c']);
  });

  it('executes an object of async functions in parallel', async () => {
    const completionOrder = [];
    const results = await asyncify.parallel({
      a: createTask('a', completionOrder, 100),
      b: createTask('b', completionOrder, 250),
      c: createTask('c', completionOrder, 20)
    });

    expect(completionOrder).toEqual(['c', 'a', 'b']);
    expect(results).toEqual({
      a: 'done->a',
      b: 'done->b',
      c: 'done->c'
    });
  });
});
