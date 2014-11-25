/**
 * @typedef {Object} TheoremProducer
 * @property {TheoremSet} _set
 * @property {TheoremRule[]} rules
 *
 * @author Nick Kaye <nick.c.kaye@gmail.com>
 * @laboratory Outright Mental Inc.
 */

// Vendor dependencies
var _ = require('lodash');

// Application components
var Theorem = require('./theorem.model')
  , TheoremSet = require('./theorem.set')
  , Log = require('./../etc/log')
  ;

/**
 * @constructs TheoremProducer
 */
function TheoremProducer(rules) {
  this._set = new TheoremSet();
  this.rules = rules;
}

/**
 * Setup one axiom, or an array of axiom.
 * @param {string|array} data
 */
TheoremProducer.prototype.setup_axiom = function (data) {
  var self = this;
  if (typeof data === 'string')
    this.save_in_set(new Theorem(0, data));
  else if (typeof data === 'object')
    _.each(data, function (one) {
      self.setup_axiom(one);
    });
};

/**
 * Run a function on all Theorem at a specific level
 * @param {Number} l
 * @param {Function} f
 */
TheoremProducer.prototype.each_at_level = function (l, f) {
  _.each(this._set.find_all_by_level(l), f);
};

/**
 * Spawn all available mutations of a particular theorem
 * @param {Theorem} parent_theorem
 */
TheoremProducer.prototype.spawn_mutations_of = function (parent_theorem) {
  var self = this;
  Log.info('Spawn mutations of (' + parent_theorem._id + ') ' + parent_theorem.content);
  /**
   * @param {TheoremRule} r
   */
  _.each(this.rules, function (r) {
    r.each(parent_theorem.content, function (content, variant) {
      var t = new Theorem(parent_theorem._level + 1, r.produce(content, variant));
      t.parent_id = parent_theorem._id;
      t.rule_name = r.name;
      t.rule_variant = variant;
      self.save_in_set(t);
    });
  });
};

/**
 * Save this Theorem into the production set
 * @param {Theorem|*} t
 * @returns {Theorem|Boolean}
 */
TheoremProducer.prototype.save_in_set = function (t) {
  var created = this._set.save(t);
  if (created)
    if (created.is_axiom())
      Log.info('Axiom (' + created._id + ') ' + created.content);
    else
      Log.info('(' + created.parent_id + ') > ' + created.rule_name + '/' + created.rule_variant + ' > (' + created._id + ') ' + created.content);
  return created;
};


/**
 * @exports TheoremProducer
 */
/* global module */
module.exports = TheoremProducer;
