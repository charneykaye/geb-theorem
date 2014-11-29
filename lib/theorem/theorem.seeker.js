/**
 * @typedef {Object} TheoremSeeker
 * @property {number} total_iterations
 * @property {number} max_content_length
 * @property {Array|String} start_with_axiom
 * @property {String} search_for_content:
 * @property {TheoremProducer} _producer
 * @property {Array} _found_targets

 * @author Nick Kaye <nick.c.kaye@gmail.com>
 * @laboratory Outright Mental Inc.
 */
'use strict';

// Application components
var Theorem = require('./theorem.model')
  , TheoremSet = require('./theorem.set')
  , TheoremProducer = require('./theorem.producer')
  , Log = require('./../etc/log')
  ;

/**
 * @constructs TheoremSeeker
 * @param {Object} c configuration data
 */
function TheoremSeeker(c) {
  // ingest the configuration
  this.config('total_iterations', c);
  this.config('max_content_length', c);
  this.config('start_with_axiom', c);
  this.config('search_for_content', c);
  // has a Producer to manage Theorem Rules & Set
  this._producer = new TheoremProducer(c.rules);
  // Begin with the "free" axiom.
  this._producer.setup_axiom(this.start_with_axiom);
  // keeps an array of found targets for output
  this._found_targets = [];
}

/**
 * Configure one key/value pair from data
 * @param key
 * @param data
 */
TheoremSeeker.prototype.config = function (key, data) {
  if (key in data)
    this[key] = data[key];
};

/**
 * Run the Theorem Producer until the conclusion of the experiment.
 * @returns {boolean}
 */
TheoremSeeker.prototype.run = function () {
  var self = this;
  Log.info('TheoremSeeker will run ' + this.total_iterations + ' total iterations.');
  // Iterate through all possible mutations, seeking target.
  for (var _i = 0; _i < this.total_iterations; _i++)
    self._producer.each_at_level(_i, function (t) {
      if (t.content === self.search_for_content)
        self._found_targets.push(t);
      else if (t.content.length < self.max_content_length)
        self._producer.spawn_mutations_of(t);
    });
};

/**
 * Run the Theorem Producer until the conclusion of the experiment.
 * @returns {boolean}
 */
TheoremSeeker.prototype.report = function () {
  // Report findings (or lack thereof)
  Log.info(['FOUND TARGETS', this._found_targets]);
};


/* global module */
module.exports = TheoremSeeker;
