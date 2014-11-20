/**
 * @author Nick Kaye <nick.c.kaye@gmail.com>
 * @laboratory Outright Mental Inc.
 */
var _node_id = 1,
  _node_set = {},
  Log = require('./etc/log'),
  Util = require('./etc/util');

/**
 * Mutation RULE ONE:
 * String whose last letter is I,
 * Add on a U at the end.
 * @type {number}
 */
var M_RULE_ONE = 1;

/**
 * Mutation RULE TWO
 * String is Mx,
 * Add Mxx at the end.
 * @type {number}
 */
var M_RULE_TWO = 2;

/**
 * Mutation RULE THREE
 * III occurs in the string,
 * Replace III with U.
 * @type {number}
 */
var M_RULE_THREE = 3;

/**
 * Mutation RULE FOUR
 * UU occurs in the string,
 * remove UU.
 * @type {number}
 */
var M_RULE_FOUR = 4;


/**
 * @returns {Number} unique id
 */
function get_unique_id() {
  return _node_id++;
}

/**
 *
 * @param _id
 * @returns {*}
 */
function get_one(_id) {
  return _id in _node_set ? _node_set[_id] : null;
}

/**
 *
 * @returns {Array}
 */
function get_all_id() {
  var keys = [];
  for (var _k in _node_set)
    if (_node_set.hasOwnProperty(_k))
      keys.push(_k);
  return keys;
}

/**
 *
 * @returns {*}
 */
function get_all() {
  return _node_set;
}

/**
 *
 * @param n
 */
function put_node(n) {
  _node_set[n._id] = n;
  Log.info('(' + n._id + ') ' + n.content);
}

/**
 * @constructs {Object} Node
 * @constructor
 * @param {number|String} from_data
 * @param m_rule
 * @param m_value
 * @property {number} _id
 * @property {String} content
 * @property {number} m_rule
 * @property {number} m_value
 */
function Node(from_data, m_rule, m_value) {
  if (typeof from_data === 'string' && typeof m_rule === 'undefined' && typeof m_value === 'undefined') {
    // parent is string (content); this is the root node
    this.content = from_data;
    this.parent_id = null;
    this.m_rule = null;
    this.m_value = null;
  } else if (typeof from_data === 'number') {
    // parent is _id; this is a child node
    this.parent_id = from_data;
    this.m_rule = m_rule;
    this.m_value = m_value;
  } else {
    // do nothing
  }
}

/**
 * Save the Node if it's valid, else do nothing.
 * @returns {boolean}
 */
Node.prototype.save = function () {
  if (this.is_root_node()) {
    this._id = get_unique_id();
    put_node(this);
    return true;
  } else if (this.validate() && this.mutate()) {
    this._id = get_unique_id();
    put_node(this);
    return true;
  } else {
    return false;
  }
};

/**
 * Spawn all possible mutations of this Node
 */
Node.prototype.spawn_all_mutations = function () {
  var self = this;
  for (var _i = 0; _i < this.valid_rules.length; _i++) {
    switch (this.valid_rules[_i]) {
      case M_RULE_ONE:
      case M_RULE_TWO:
        // only one way to interpret these, if they are applicable
        new Node(self._id, this.valid_rules[_i], 0).save(); // will skip itself if result cannot exist
        break;
      case M_RULE_THREE:
      case M_RULE_FOUR:
        // try every variation of these
        for (var _k = 0; _k < this.content.length; _k++) {
          new Node(self._id, this.valid_rules[_i], _k).save(); // will skip itself if result cannot exist
        }
        break;
    }
  }
};

/**
 * Set of valid rules
 * @type {Array}
 */
Node.prototype.valid_rules = [
  M_RULE_ONE,
  M_RULE_TWO,
  M_RULE_THREE,
  M_RULE_FOUR
];

/**
 * Is this a valid rule?
 * @param r
 * @returns {boolean}
 */
Node.prototype.is_valid_rule = function (r) {
  return this.valid_rules.indexOf(r) >= 0;
};

/**
 * Is this the root node?
 * @returns {boolean}
 */
Node.prototype.is_root_node = function () {
  return (this.parent_id === null && this.m_rule === null && this.m_value === null);
};

/**
 * Validate entire instance
 * @returns {boolean}
 */
Node.prototype.validate = function () {
  return this.is_valid_rule(this.m_rule);
};

/**
 * Validate entire instance
 * @returns {boolean}
 */
Node.prototype.mutate = function () {
  if (this._id) {
    Log.info(['Cannot mutate Node with _id', this]);
    return false;
  }
  if (this.parent_id) {
    var parent_content = get_one(this.parent_id).content;
  }
  switch (this.m_rule) {
    case M_RULE_ONE:
      /*
       * String whose last letter is I,
       * Add on a U at the end.
       */
      if (parent_content.charAt(parent_content.length - 1).toUpperCase() === 'I') {
        this.content = parent_content + 'U';
        return true;
      } else {
        return false;
      }
      break;
    case M_RULE_TWO:
      /*
       * String is Mx,
       * Now it's Mxx.
       */
      if (parent_content.charAt(0).toUpperCase() === 'M') {
        // first letter is an M, but what about the rest of it (not M)?
        var x = parent_content.substr(1);
        this.content = 'M' + x + x;
        return true;
      } else {
        return false;
      }
      break;
    case M_RULE_THREE:
      /*
       * III occurs in the string (at position m_value),
       * Replace III with U.
       */
      if (parent_content.substr(this.m_value, 3).toUpperCase() === 'III') {
        this.content = Util.replaceSubstring(parent_content, this.m_value, 3, 'U');
        return true;
      } else {
        return false;
      }
      break;
    case M_RULE_FOUR:
      // TODO: mutate according to rule four, else false
      /*
       * UU occurs in the string  (at position m_value),
       * remove UU.
       */
      if (parent_content.substr(this.m_value, 2).toUpperCase() === 'UU') {
        this.content = Util.replaceSubstring(parent_content, this.m_value, 2, '');
        return true;
      } else {
        return false;
      }
      break;
  }
  return false;
};

/* global module */
module.exports = Node;
module.exports.find_all = get_all;
module.exports.find_by_id = get_one;
module.exports.find_all_id = get_all_id;
