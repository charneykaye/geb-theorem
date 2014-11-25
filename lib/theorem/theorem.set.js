/**
 * @typedef {Object} Theorem
 * @property {Object} contents
 *
 * @author Nick Kaye <nick.c.kaye@gmail.com>
 * @laboratory Outright Mental Inc.
 */
'use strict';

// Vendor dependencies
var _ = require('lodash');

/**
 * Global namespace so this will be unique across the application
 * @type {number}
 * @private
 */
var _next_id = 1;

/**
 * @constructs TheoremSet
 */
function TheoremSet() {
  this.contents = {};
}

/**
 * Save the Theorem (if exists) else add to set.
 * @returns {Theorem|Boolean} if successful|failed
 * @param {Theorem|*} t
 */
TheoremSet.prototype.save = function (t) {
  if (t && ( 'content' in t) && (typeof t.content === 'string') && t.content.length)
    if ('_id' in t)
      return this.update(t);
    else
      return this.add(t);
  return null;
};

/**
 * Save the Theorem (if exists) else add to set.
 * @returns {Theorem|Boolean} added record if successful, else false
 * @param {Theorem} t
 */
TheoremSet.prototype.add = function (t) {
  if ('_id' in t)
    return false;
  t._id = this.get_unique_id();
  return this.contents[t._id] = t;
};

/**
 * Save the Theorem (if exists) else add to set.
 * @returns {Theorem|Boolean} updated record if successful, else false
 * @param {Theorem} t
 */
TheoremSet.prototype.update = function (t) {
  if (!('_id' in t))
    return false;
  return this.contents[t._id] = t;
};

/**
 * @returns {Number} unique id
 */
TheoremSet.prototype.get_unique_id = function () {
  return _next_id++;
};

/*
 *
 * @param _id
 * @returns {*}
 *
TheoremSet.prototype.find_by_id = function (_id) {
  return _id in this.contents ? this.contents[_id] : null;
};
*/

/*
 *
 * @returns {Array}
 *
TheoremSet.prototype.get_all_id = function () {
  var keys = [];
  for (var _k in this.contents)
    if (this.contents.hasOwnProperty(_k))
      keys.push(_k);
  return keys;
};
*/

/**
 * @param {number} _level to search for
 * @returns {*}
 */
TheoremSet.prototype.find_all_by_level = function (_level) {
  var _out = [];
  _.each(this.contents, function (t) {
    if (t._level === _level)
      _out.push(t);
  });
  return _out;
};

/* global module */
/**
 * @exports TheoremSet
 */
module.exports = TheoremSet;
