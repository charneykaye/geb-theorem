/**
 * @typedef {Object} TheoremRule
 * @property {Function} produce new content
 * @property {Function} each iteration of possible variants
 *
 * @author Nick Kaye <nick.c.kaye@gmail.com>
 * @laboratory Outright Mental Inc.
 */

/**
 * @constructs TheoremRule
 * @param {Object} c configuration data
 */
function TheoremRule(c) {
  // rule has a name for traceability
  this.config('name', c);
  // ingest the function to produce new content
  this.config('produce', c);
  // ingest the function to iterate all possible variants
  this.config('each', c);
}

/**
 * Configure one key/value pair from data
 * @param key
 * @param data
 */
TheoremRule.prototype.config = function (key, data) {
  if (key in data)
    this[key] = data[key];
};

/* global module */
/**
 * @exports TheoremRule
 */
module.exports = TheoremRule;
