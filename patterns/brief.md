# Implementing asnychronous patterns

## Installation and setup 

⚠️ Before preceding, from the project `cd` to the `patterns` directory and run `npm it`. All tests should fail. ⚠️<br>
⚠️ Tests have been written using [Jest](https://facebook.github.io/jest/) ⚠️<br>

## Task

Implement an asynchrous util library called `asyncify` using Node 8. This library encapsulates
commonly used patterns.

**It is not expected that you implement all functionality or write code of production quality for
this task**

## Instructions

* **Fix the failing tests**. Each test has it's own file e.g `__tests__/map.js`. You'll to fix the tests by writing the implementation in the corresponding lib file. e.g `lib/map.js`
* **Do not** install additional dependencies unless explicity instructed
* `lib/async.js` loads your method implementations dynamically. DO NOT MODIFY. 
* If you create additional helper utils, **please create files in** `lib/private`.
* Tests **should not** require modifiction (please report bugs)

## Useful testing commands 
* Run all tests - `npm test`
* Run single test - `npm test __tests__/name-of-test.js`
