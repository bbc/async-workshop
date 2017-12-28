# Review

## Considerations:

* What are the preferred ways of implementation a given pattern? e.g reduce,
  map, each?
* What asynchrouns behaviour is difficult to implement?
* Is there a need to write a utility library? Any reusable behaviour? What are
  the risks?
* If so, which behaviour should be defined in that library?
* Should we delegate to an existing lib? What trusted libraries are available?
* What are the side effects of using third party libs? Any concerns?
* What can we do directly without the need for abstraction? i.e no lib?
* Should be define when to use `promises vs async/await` for consistency?
* What scenarios will we have to use promises?
