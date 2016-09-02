# Portend

[![Build Status](https://travis-ci.org/nsand/portend.svg?branch=master)](https://travis-ci.org/nsand/portend)
[![Coverage Status](https://coveralls.io/repos/github/nsand/portend/badge.svg)](https://coveralls.io/github/nsand/portend)

Portend is a utility for expecting a particular event to be emitted a specific number of times.

It can be useful for writing tests in which a known number of events are expected to be emitted, and the test must wait before proceeding.

## Usage

Portend requires that it be called with an `EventEmitter`-like object (something with an `on` function) and an event name. By default, it will expect the event to be fired once, but this can be overridden with the third parameter.

### Generic Scenario

```javascript
const portend = require('portend');

// Wait for my.event to be emitted twice from the emitter
portend(emitter, 'my.event', 2).then(events => {
	// events will ['test', 'test 2']
});

emitter.emit('my.event', 'test');
emitter.emit('my.event', 'test 2');
```

### Shortcuts

There are a few shortcuts for setting up the expected number of emits. `once`, `twice`, and `thrice` can be used to expect 1, 2 and 3 emits respectively.

```javascript
const portend = require('portend');

// Wait for my.event to be emitted once
portend.once(emitter, 'my.event').then(events => {
	// events will be ['test']
});

emitter.emit('my.event', 'test');
```