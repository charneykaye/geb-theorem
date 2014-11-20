/**
 * @author Nick Kaye <nick.c.kaye@gmail.com>
 * @laboratory Outright Mental Inc.
 */
var Node = require('./lib/node'),
    Log = require('./lib/log');

var
    // # of waves of mutations to simulate
    mutation_waves = 10,
    // stop mutating any strings past this length
    max_content_length = 10,
    INITIAL_CONTENT = 'MI',
    TARGET_CONTENT = 'MU';

// first, the root node
var r = new Node(INITIAL_CONTENT),
    id_set = [],
    found_target = {};

// log the start
r.save();

// each wave of mutations
for (var _i = 0; _i < mutation_waves; _i++) {
    id_set = Node.find_all();
    for (var _k in id_set) {
        if (id_set[_k].content === TARGET_CONTENT) {
            found_target[_k] = id_set[_k];
        } else if (id_set[_k].content.length < max_content_length) {
            id_set[_k].spawn_all_mutations();
        }
    }
}

// results
Log.info(['FOUND TARGETS', found_target]);