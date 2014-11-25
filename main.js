/**
 * @author Nick Kaye <nick.c.kaye@gmail.com>
 * @laboratory Outright Mental Inc.
 */
'use strict';
var Util = require('./lib/etc/util')
  , TheoremSeeker = require('./lib/theorem/theorem.seeker')
  , TheoremRule = require('./lib/theorem/theorem.rule')
  ;

/**
 * Configure the experiment.
 */
var seeker = new TheoremSeeker({

  // # of waves of mutations to simulate
  total_iterations: 15,

  // stop mutating any strings past this length
  max_content_length: 15,

  // initial content
  start_with_axiom: ['MI'],

  // target content (outcome of experiment)
  search_for_content: 'MU',

  // setup rules of production
  rules: [

    new TheoremRule({
      name: 'rule_one',
      // String whose last letter is I?  Add on a U at the end.
      produce: function (from /* , variant */) {
        if (from.charAt(from.length - 1).toUpperCase() === 'I')
          return from + 'U';
        else
          return null;
      },
      // Only one way to spin this.
      each: function (from, produce) {
        produce(from, 0);
      }
    }),

    new TheoremRule({
      name: 'rule_two',
      // String is Mx? Now it's Mxx.
      produce: function (from /* , variant */) {
        if (from.charAt(0).toUpperCase() === 'M') {
          // first letter is an M, but what about the rest of it (not M)?
          var x = from.substr(1);
          return 'M' + x + x;
        } else
          return null;
      },
      // Only one way to spin this.
      each: function (from, produce) {
        produce(from, 0);
      }
    }),

    new TheoremRule({
      name: 'rule_three',
      // III occurs in the string (at position rule_variant)? Replace III with U.
      produce: function (from, variant) {
        if (from.substr(variant, 3).toUpperCase() === 'III') {
          return Util.replaceSubstring(from, variant, 3, 'U');
        } else
          return null;
      },
      // try every variation of these
      each: function (from, produce) {
        for (var _k = 0; _k < from.length; _k++)
          produce(from, _k);
      }
    }),

    new TheoremRule({
      name: 'rule_four',
      // UU occurs in the string  (at position rule_variant)? Remove UU.
      produce: function (from) {
        if (from.substr(this.rule_variant, 2).toUpperCase() === 'UU') {
          return Util.replaceSubstring(from, this.rule_variant, 2, '');
        } else
          return null;
      },
      // try every variation of these
      each: function (from, produce) {
        for (var _k = 0; _k < from.length; _k++)
          produce(from, _k);
      }
    })
  ]
});

/**
 * Run the experiment.
 */
seeker.run();

/**
 * Report the findings.
 */
seeker.report();
