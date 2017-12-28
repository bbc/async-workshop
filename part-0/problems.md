# Warmup

All the methods referred to in the following questions can be found in [warmup lib](lib/warmup.js)

## Creation

### 1. How do you create a promise directly?

Complete the following implementation to reverse a given string as the fulfilment value using the a promise constructor:

```js
const reversed = await Warmup.usingConstructor(str)
```

* What is the status of the promise on completion?

### 2. How do you create a promise directly with an error?

Complete the following implementation to reject the promise with an instance of Error using a promise constructor:

```js
await Warmup.errorOnConstruction(errMessage) // rejects with a given error
```

* What is the status of the promise on completion?

### 3. How can you immediately fulfil a promise with a value (without using the promise constructor)?

Complete the following implementation:

```js
await Warmup.immediately(str) // returns a promise that fulfils with the given str
```

### 4. **Without** using a promise directly, how can you asynchronously reverse a string?

Implement the following static method. **Note - this method does not currently exist**

```js
const reversed = await Warmup.reverse(str)
```

### 5. The following static method has an unexpected error. Why?

Fix the following method:

```js
const nthHarmonic = await Warmup.calculateHarmonic(Promise.resolve(5));
```

### 6. How do you convert a third party (or custom) promise to a native promise?

```js
const nativePromise = Warmup.convert(bluebird.resolve(5));
```

* Why is it important to do the above convertion?

### 7. How to you convert a function that supports callbacks?

Implement a callback conversion:

```js
function legacyBy100(n, cb) {
  cb(null, n * 100);
}
const nativePromise = Warmup.toPromise(legacyBy100);
```

## Transformation (chaining)

### 1. How would you refactor `.chain` to use async/await?

Implement a new function called `chainWithAsnyc` that tranlates the promise chain in `.chain` to async/await calls

```js
const nativePromise = Warmup.chainWithAsnyc(); // results === `.chain`
```

**DO NOT MODIFY** `.chain`

### 2. What if there are numerous async calls in the chain? In this case, the entire alphabet?

Implement a new function called `multipleSequentialCalls` that concatenates each letter in the alphabet

```js
const nativePromise = Warmup.multipleSequentialCalls(); // abcdefg...xyz
```

## Error handling

### 1. How do you handle an error from a given promise?

Complete `.promiseOnError` by:

* Calling `FlakyService.makeRequest()`
* Handling any error thrown by `FlakyService.makeRequest()` by converting it to an instance of `ServiceError` using the
  promise API.

```js
Warmup.promiseOnError(flaky) {
  flaky.makeRequest();
  // implement error handling using promise API
}
```

* What are the limitations of error handling on promises? Could this ever be useful?

### 2. How would you update `promiseOnError` to execute some logic even if an error is thrown?

Update `.promiseOnError` by:

* adding logic to ensure `flaky.shutdown()` is always called.

```js
Warmup.promiseOnError(flaky) {
  flaky.makeRequest();
  // always call flaky.shutdown() even if an error is thrown
}
```

* Would is a typical use case for implementing logic like this? Why is this imporant?

### 3. How do you handle an error using async/await?

Complete `.asyncOnError` to behave like `.promiseOnError` using async/await

```js
Warmup.asyncOnError(flaky) {
  flaky.makeRequest();
  // implement error handling usig async/await
}
```

### 4. How would you update `.asyncOnError` to execute some logic even if an error is thrown?

Update `.asyncOnError` by:

* adding logic to ensure `flaky.shutdown()` is always called.

```js
Warmup.asyncOnError(flaky) {
  flaky.makeRequest();
  // always call flaky.shutdown() even if an error is thrown
}
```

* How do you catch up unhandled promise exception?

## Aggregating results

### 1. How can you aggregate the results of multiple promises using the promise API?

Complete `.aggregate` by:

* make 50 requests to `flaky.makeRequest`
* return a promise of all the responses (fulfulment value is an array of responses)
* Forget about error handling for this exercise

**Note - no errors should be thrown - flaky mode is off :)**

### 2. Given mutliple promises, how can you get first promise that resolves using the promise API?

Complete `.first` by:

* make 50 requests to `flaky.makeRequest`
* return the first promise to resolve
* Forget about error handling for this exercise

**Note - no errors should be thrown - flaky mode is off :)**

### 3. Advanced: Refactor `.aggregate` to **NOT** use the promise API. Can you write this functionality from scratch?

### 4. Advanced: Refactor `.first` to **NOT** use the promise API. Can you write this functionality from scratch?
