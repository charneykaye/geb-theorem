/**
 * @author Nick Kaye <nick.c.kaye@gmail.com>
 * @laboratory Outright Mental Inc.
 */
var
  _ = require('lodash'),
  Log = require('./../etc/log'),
  Theorem = require('./theorem.model');

/**
 * Setup one axiom, or an array of axiom.
 * @param {string|array} axiom
 */
function setup_axiom(axiom) {
  if (typeof axiom === 'string')
    new Theorem(axiom).save();
  else if (typeof axiom === 'array')
    _.each(axiom, function (one) {
      setup_axiom(one);
    });
}

/**
 * @constructs {Object} TheoremProducer
 * @constructor
 * @param {*} config
 * @property {number} total_iterations
 * @property {number} max_content_length
 * @property {Array|String} start_with_axiom
 * @property {string} search_for_content:
 * @property {Array} _id_set
 * @property {Array} _found_targets
 */
function TheoremProducer(config) {
  // ingest the configuration
  for (var key in config)
    if (config.hasOwnProperty(key))
      this[key] = config[key];
  // setup experiment
  this._id_set = [];
  this._found_targets = [];
  // Begin with the "free" axiom.
  setup_axiom(this.start_with_axiom);
}

/*

 // first, the root theorem
 var
 _config = {},
 */

/**
 * Run the Theorem Producer until the conclusion of the experiment.
 * @returns {boolean}
 */
TheoremProducer.prototype.run = function () {
  var self = this;
  // Iterate through all possible mutations, seeking target.
  for (var _i = 0; _i < this.total_iterations; _i++)
    _.each(Theorem.find_all(), function (t) {
      if (t.content === self.search_for_content)
        self._found_targets.push(t);
      else if (t.content.length < self.max_content_length)
        t.spawn_all_mutations();
    });
};

/**
 * Run the Theorem Producer until the conclusion of the experiment.
 * @returns {boolean}
 */
TheoremProducer.prototype.report = function () {
  // Report findings (or lack thereof)
  Log.info(['FOUND TARGETS', this._found_targets]);
};


/* global module */
module.exports = TheoremProducer;
