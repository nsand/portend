/**
 * For a given event emitter, watches a specified event for a specified
 * number of emits. When that number has been reached, the promise is resolved
 * with an array of the events in the order that they were received.
 * @param {Object} emitter an `EventEmitter`-like object that supports registering listeners with `on`
 * @param {String} event the event that will be listened for
 * @param {Number} [expected=1] the number of emits to watch for
 */
function portend(emitter, event, expected) {
	if (!emitter || typeof emitter.on !== 'function') {
		throw new Error('Expected an emitter');
	}
	if (typeof event === 'undefined') {
		throw new Error('Expected an event to watch for');
	}

	expected = typeof expected === 'number' ? expected : 1;
	const events = [];

	return new Promise((resolve) => {
		function listener(e) {
			events.push(e);
			if (events.length === expected) {
				if (typeof emitter.removeListener === 'function') {
					emitter.removeListener(event, listener);
				}
				resolve(events);
			}
		}
		emitter.on(event, listener);
	});
}

/**
 * For a given event emitter, watches a specified event for a single emit. When it is emitted,
 * the promise is resolved with an array of the containing a single event.
 * @param {Object} emitter an `EventEmitter`-like object that supports registering listeners with `on`
 * @param {String} event the event that will be listened for
 */
portend.once = (emitter, event) => {
	return portend(emitter, event, 1);
};

/**
 * For a given event emitter, watches a specified event for two emits. When two emits have occurred,
 * the promise is resolved with an array of the containing both events in the order they were emitted.
 * @param {Object} emitter an `EventEmitter`-like object that supports registering listeners with `on`
 * @param {String} event the event that will be listened for
 */
portend.twice = (emitter, event) => {
	return portend(emitter, event, 2);
}

/**
 * For a given event emitter, watches a specified event for two emits. When three emits have occurred,
 * the promise is resolved with an array of the containing the three events in the order they were emitted.
 * @param {Object} emitter an `EventEmitter`-like object that supports registering listeners with `on`
 * @param {String} event the event that will be listened for
 */
portend.thrice = (emitter, event) => {
	return portend(emitter, event, 3);
}

module.exports = portend;