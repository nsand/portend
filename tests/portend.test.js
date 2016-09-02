'use strict';

const EventEmitter = require('events');
const expect = require('chai').expect;

const portend = require('../index');

describe('Portend', function() {

	let emitter;
	beforeEach(function() {
		emitter = new EventEmitter();
	});

	it('should be a function with helpers', function() {
		expect(portend).to.be.a('function');
		expect(portend.once).to.be.a('function');
		expect(portend.twice).to.be.a('function');
		expect(portend.thrice).to.be.a('function');
	});

	it('should require an emitter-like argument', function() {
		expect(portend).to.throw(Error);
	});

	it('should require an event name', function() {
		expect(portend.bind(null, emitter)).to.throw(Error);
	});

	it('should return a Promise', function() {
		expect(portend(emitter, 'my.event')).to.be.a('promise');
	});

	it('should resolve after one emit by default', function() {
		const evt = 'lorem ipsum';
		const p = portend(emitter, 'my.event').then(events => {
			expect(events).to.be.length(1);
			expect(events[0]).to.equal(evt);
		});
		emitter.emit('my.event', evt);
		emitter.emit('my.event', 'Not Present');
		return p;
	});

	it('should resolve after after the specified number of emits', function() {
		const evts = ['a', 'b', 'c', 'd', 'e'];

		const p = portend(emitter, 'my.event', evts.length).then(events => {
			expect(events).to.be.length(evts.length);
			expect(events).to.eql(evts);
		});
		evts.forEach(evt => emitter.emit('my.event', evt));
		return p;
	});

	it('should support an alias for an event firing once', function() {
		const evt = 'lorem ipsum';
		const p = portend.once(emitter, 'my.event').then(events => {
			expect(events).to.be.length(1);
			expect(events[0]).to.equal(evt);
		});
		emitter.emit('my.event', evt);
		return p;
	});

	it('should support an alias for an event firing twice', function() {
		const evts = ['lorem ipsum', 'dolor'];
		const p = portend.twice(emitter, 'my.event').then(events => {
			expect(events).to.be.length(2);
			expect(events).to.eql(evts);
		});
		evts.forEach(evt => emitter.emit('my.event', evt));
		return p;
	});

	it('should support an alias for an event firing thrice', function() {
		const evts = ['lorem ipsum', 'dolor', 'sit amet'];
		const p = portend.thrice(emitter, 'my.event').then(events => {
			expect(events).to.be.length(3);
			expect(events).to.eql(evts);
		});
		evts.forEach(evt => emitter.emit('my.event', evt));
		return p;
	});

});
