/**
 * @typedef {Object} Theorem
 * @property {number} _id
 * @property {number} _level
 * @property {String} content
 * @property {String} rule_name
 * @property {Number} rule_variant
 *
 * @author Nick Kaye <nick.c.kaye@gmail.com>
 * @laboratory Outright Mental Inc.
 */

/**
 * @constructs Theorem
 * @param {Number} _level
 * @param {Theorem|String} content
 */
function Theorem(_level, content) {
  this._level = _level;
  this.content = content;
}

/**
 * Is this the root theorem?
 * @returns {boolean}
 */
Theorem.prototype.is_axiom = function () {
  return this._level === 0;
};

/**
 * @exports Theorem
 */
/* global module */
module.exports = Theorem;
