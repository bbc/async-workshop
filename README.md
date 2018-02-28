# Async workshop

## Objectives

By doing a workshop on asynchronous programming in Node 8, we aim to achieve:

* Gain familarity with async and await constructs
* Gain familarity with the Promise API
* Advantages/disadvantages of promises and async/await
* Recognising (or defining) when to use promises and async/await
* Asynchronous patters eg filter, map, reduce, retries, error handling
* Define consistent ways of writing async code in Node 8
* Increase knowledge via practical application
* Share ideas/views with other team members

We will not been focusing on callbacks and generators for this workshop.

## Agenda

* **Part 0 (Warmup)**: 9:15 - 10:30
* **Part 1 (Patterns)**: 10:30 - 12:30
* **Lunch**: - 12:30 - 13:30
* **Part 1 (Patterns continued)**: 13:30 - 15:00
* **Part 2 (Discussion)**: 15:00 - 16:00

## Part 0 - Warmup

This section is a refresher on the basics of promises and async/await. To
determine whether to use async functions (and await) or the promise API you need
to understand both. Furthermore, async/await is built on promises, so
understanding them is essential.

See [warmup](./part-0/brief.md)

## Part 1 - Implementing asynchronous patterns

This section involves writing a async utility library called `asyncify`. The
functions that need be implementated are based on common usecases. e.g `.map`

See [async patterns](./part-1/brief.md)

## Part 3 - Review

Finally, this section is concerned with knowledge sharing and how async/await/promises
should be used within your team. 

See [review](./part-3/review.md)

## Setup

* cd $workspace
* clone repo - `https://github.com/bbc/async-workshop`

To get started see [warmup](./part-0/brief.md)

## Sources

* [promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)
* [async functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function)
* [await](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await)
