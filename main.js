/**
 * @author Nick Kaye <nick.c.kaye@gmail.com>
 * @laboratory Outright Mental Inc.
 */
var TheoremProducer = require('./lib/theorem/theorem.producer.js');

/**
 * Configure the experiment.
 */
var producer = new TheoremProducer({

  // # of waves of mutations to simulate
  total_iterations: 10,

  // stop mutating any strings past this length
  max_content_length: 10,

  // initial content
  start_with_axiom: ['MI'],

  // target content (outcome of experiment)
  search_for_content: 'MU'

});

/**
 * Run the experiment.
 */
producer.run();

/**
 * Report the findings.
 */
producer.report();
